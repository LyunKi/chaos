import { NestedString, KV } from '@cloud-dragon/common-types';
import {
  isObject,
  get,
  isString,
  mapValues,
  merge,
  forEach,
  isEmpty,
  setWith,
} from 'lodash';
import { CloudDesignTheme, ThemeMode, ThemePack } from '../types';
import { CHAKRA_THEME_PACK } from './chakra';
import { ThemeContext, DEFAULT_THEME_CONTEXT } from './config';

function isReferenceValue(value: string | NestedString): value is string {
  return isString(value) && value.startsWith('$') && !value.includes(':');
}

function isRemValue(value: any) {
  return isString(value) && value.startsWith('$rem:');
}

function handleRemValue(value: string, baseFontSize: number) {
  const multiple = Number(value.slice(5));
  return baseFontSize * multiple;
}

function isVwValue(value: any) {
  return isString(value) && value.startsWith('$vw:');
}

function handleVwValue(value: string, windowWidth: number) {
  const multiple = Number(value.slice(4));
  return (windowWidth / 100) * multiple;
}

function isVhValue(value: any) {
  return isString(value) && value.startsWith('$vh:');
}

function handleVhValue(value: string, windowHeight: number) {
  const multiple = Number(value.slice(4));
  return (windowHeight / 100) * multiple;
}

class ThemeManagerClass {
  private themeContext: ThemeContext = DEFAULT_THEME_CONTEXT;

  public setThemeContext(themeContext?: Partial<ThemeContext>) {
    this.themeContext = merge({}, DEFAULT_THEME_CONTEXT, themeContext);
  }

  public updateThemeContext(themeContext?: Partial<ThemeContext>) {
    merge(this.themeContext, themeContext);
  }

  private pack: ThemePack = CHAKRA_THEME_PACK;

  public getThemePack() {
    return this.pack;
  }

  public setThemePack(themePack: ThemePack) {
    this.pack = themePack;
  }

  private theme: CloudDesignTheme = {};

  public computeTheme() {
    this.processTheme();
  }

  private mode: ThemeMode = 'light';

  public setMode(themeMode: ThemeMode) {
    this.mode = themeMode;
  }

  private handlePresetThemeValue(value: any) {
    const { baseFontSize, windowHeight, windowWidth } = this.themeContext;
    if (isRemValue(value)) {
      return handleRemValue(value, baseFontSize);
    }
    if (isVwValue(value)) {
      return handleVwValue(value, windowWidth);
    }
    if (isVhValue(value)) {
      return handleVhValue(value, windowHeight);
    }
    return value;
  }

  private flatTheme(
    flatTheme: CloudDesignTheme,
    theme: CloudDesignTheme,
    path?: string
  ) {
    forEach(theme, (value, key) => {
      const currentPath = path ? `${path}.${key}` : key;
      const firstProcessed = this.handlePresetThemeValue(value);
      if (isObject(firstProcessed)) {
        this.flatTheme(flatTheme, firstProcessed, currentPath);
        return;
      }
      flatTheme[currentPath] = firstProcessed;
    });
  }

  private maxReferrenceDepth = 10;

  public setMaxReferrenceDepth(themeMaxReferrenceDepth: number) {
    this.maxReferrenceDepth = themeMaxReferrenceDepth;
  }

  private reduceReferences(flatTheme: CloudDesignTheme) {
    const references: CloudDesignTheme = {};
    forEach(flatTheme, (value, key) => {
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
      if (depth > this.maxReferrenceDepth) {
        throw new Error('Your reference theme value is too deep');
      }
      for (const key of Reflect.ownKeys(references)) {
        const value = references[key];
        let referenceValue = get(flatTheme, value.slice(1));
        if (!referenceValue) {
          continue;
        }
        if (isReferenceValue(referenceValue)) {
          references[key] = referenceValue;
          continue;
        }
        delete references[key];
        flatTheme[key] = referenceValue;
      }
    }
  }

  private calcTheme(flatTheme: CloudDesignTheme) {
    forEach(flatTheme, (value, key) => {
      setWith(this.theme, key, value, Object);
    });
  }

  private processTheme = () => {
    const flatTheme = {};
    this.flatTheme(flatTheme, this.pack[this.mode]);
    this.reduceReferences(flatTheme);
    this.calcTheme(flatTheme);
  };

  public get isDark() {
    return this.mode === 'dark';
  }

  public themedValue(value: any) {
    if (isReferenceValue(value)) {
      const path = value.slice(1);
      return get(this.theme, path);
    }
    return this.handlePresetThemeValue(value);
  }

  public themed(style?: KV) {
    return mapValues(style, (value) => {
      return this.themedValue(value);
    });
  }
}

export const ThemeManager = new ThemeManagerClass();
