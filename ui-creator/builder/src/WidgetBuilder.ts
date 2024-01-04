import { KV } from '@cloud-dragon/common-types';
import React, { ReactElement, Fragment } from 'react';
import {
  WidgetBuilder,
  Prop,
  Widget,
  isRemPropValue,
  PropValue,
  BuilderContext,
} from '@cloud-creator/common';
import mapValues from 'lodash-es/mapValues';
import { CloudBuilderContextInstance } from './BuilderContext';

const WIDGET_TYPE_RECORD: KV<number> = {};

function generateWidgetKey(type: string) {
  const count = WIDGET_TYPE_RECORD[type];
  const idSuffix = (count ?? -1) + 1;
  const id = `${type}-${idSuffix}`;
  WIDGET_TYPE_RECORD[type] = idSuffix;
  return id;
}

class CloudRnWidgetBuilder extends WidgetBuilder<ReactElement> {
  public context: BuilderContext = CloudBuilderContextInstance;

  private parsePropValue(value: PropValue) {
    if (isRemPropValue(value)) {
      const number = parseFloat(value.slice('$rem:'.length));
      const { baseFontSize } = this.context.configManager.config;
      if (Number.isNaN(number)) {
        console.error('Invalid rem value: ', value);
        return baseFontSize;
      }
      return number * baseFontSize;
    }
    return value;
  }

  private parseWidgetProps(type: string, props: Prop[]) {
    return props?.reduce(
      (prev, prop) => {
        const { name, value, valueType } = prop;
        let propValue = value;
        if (valueType === 'object') {
          propValue = mapValues(value, (v) => {
            return this.parsePropValue(v);
          });
        } else {
          propValue = this.parsePropValue(value);
        }
        prev[name] = propValue;
        return prev;
      },
      {
        key: generateWidgetKey(type),
      } as KV
    );
  }

  public build(widget: Widget): ReactElement {
    const { children, type, props } = widget;
    const instance = this.getWidgetInstance(type);
    return React.createElement(
      instance,
      this.parseWidgetProps(type, props),
      children?.map((child) => this.build(child))
    );
  }

  public getWidgetInstance(type: string) {
    let namespace = this.context.configManager.config.defaultWidgetNamespace;
    let specifier;
    const [first, second] = type.split(':');
    if (second) {
      namespace = first;
      specifier = second;
    } else {
      specifier = first;
    }
    return (
      this.context.widgetRegistry.getInstance({
        namespace: namespace!,
        type: specifier,
      }) ?? Fragment
    );
  }
}

export const CloudWidgetBuilderInstance = new CloudRnWidgetBuilder();
