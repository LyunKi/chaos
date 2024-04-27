import { KV, NestedString } from '@cloud-dragon/common-types';
import { merge } from 'lodash-es';
import forEach from 'lodash-es/forEach';
import get from 'lodash-es/get';
import isEmpty from 'lodash-es/isEmpty';
import isObject from 'lodash-es/isObject';
import isString from 'lodash-es/isString';
import mapValues from 'lodash-es/mapValues';
import setWith from 'lodash-es/setWith';

function isReferenceValue(value: string | NestedString): value is string {
  return isString(value) && value.startsWith('$') && !value.includes(':');
}

export type VariablePack = KV<any>;
export type VariablePacks = KV<VariablePack>;

export type VariableManagerOptions = {
  packKey: string;
  packs: VariablePacks;
};

export class VariableManager {
  public constructor(packs: VariablePacks = {}, packKey?: string) {
    this.packs = packs;
    this.packKey = packKey;
  }

  /**
   * 获取完整的变量,包括静态变量和动态变量
   */
  public get variables() {
    return {
      ...this.staticVariables,
      ...this.dynamicVariables,
    };
  }

  public setMaxReferenceDepth(maxReferenceDepth: number) {
    this.maxReferenceDepth = maxReferenceDepth;
  }

  /**
   * 静态的变量，永远会生效
   */
  protected staticVariables = {};

  /**
   * 更新变量
   * @param variables
   */
  public updateVariables(variables: KV<any>) {
    merge(this.staticVariables, variables);
  }

  /**
   * 设置新变量
   *
   * @param variables
   */
  public setVariables(variables: KV<any>) {
    this.staticVariables = variables;
  }

  /**
   * 动态变量，根据场景决定是否生效
   */
  protected dynamicVariables = {};

  /**
   * 变量包
   */
  protected packs: VariablePacks;

  protected setPacks(packs: VariablePacks) {
    this.packs = packs;
  }

  protected packKey: string | undefined;

  protected setPackKey(packKey: string) {
    this.packKey = packKey;
  }

  protected get pack() {
    if (!this.packKey) {
      return {};
    }
    return this.packs[this.packKey] ?? {};
  }

  /**
   * 初始化管理器
   */
  protected initManager() {
    this.dynamicVariables = {};
    this.processVariables();
  }

  protected handlePresetVariableValue(value: any) {
    return value;
  }

  private maxReferenceDepth = 10;

  private calcVariables(flatVariables: KV) {
    forEach(flatVariables, (value, key) => {
      setWith(this.dynamicVariables, key, value, Object);
    });
  }
  private flatVariables(flatVariables: KV, variables: KV, path?: string) {
    forEach(variables, (value, key) => {
      const currentPath = path ? `${path}.${key}` : key;
      const firstProcessed = this.handlePresetVariableValue(value);
      if (isObject(firstProcessed)) {
        this.flatVariables(flatVariables, firstProcessed, currentPath);
        return;
      }
      flatVariables[currentPath] = firstProcessed;
    });
  }
  private reduceReferences(flatVariables: KV) {
    const references: KV = {};
    forEach(flatVariables, (value, key) => {
      if (!isReferenceValue(value)) {
        return;
      }
      references[key] = value;
    });
    // Handle reference values recursively
    let recursiveFlag = true;
    let depth = 0;
    while (!isEmpty(references) && recursiveFlag) {
      recursiveFlag = false;
      depth += 1;
      if (depth > this.maxReferenceDepth) {
        throw new Error('Your reference variable value is too deep');
      }
      for (const key of Reflect.ownKeys(references)) {
        const value = references[key];
        const referenceValue = get(flatVariables, value.slice(1));
        if (!referenceValue) {
          continue;
        }
        if (isReferenceValue(referenceValue)) {
          references[key] = referenceValue;
          continue;
        }
        delete references[key];
        flatVariables[key] = referenceValue;
      }
    }
  }

  private processVariables = () => {
    const flatVariables = {};
    this.flatVariables(flatVariables, this.pack);
    this.reduceReferences(flatVariables);
    this.calcVariables(flatVariables);
  };

  protected processedValue(value: any) {
    if (isReferenceValue(value)) {
      const path = value.slice(1);
      return get(this.variables, path);
    }
    return this.handlePresetVariableValue(value);
  }

  protected processed(references?: KV) {
    return mapValues(references, (value) => {
      return this.processedValue(value);
    });
  }
}
