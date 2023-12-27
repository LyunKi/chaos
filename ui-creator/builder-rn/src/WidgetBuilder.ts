import { KV } from '@cloud-dragon/common-types';
import React, { ReactElement, Fragment } from 'react';
import {
  WidgetBuilder,
  WidgetRegistry,
  Prop,
  Widget,
  ConfigManager,
  isRemPropValue,
  I18nManager,
  Navigator,
  ThemeManager,
  PropValue,
  BuilderContext,
} from '@cloud-design/creator-common';
import mapValues from 'lodash-es/mapValues';
import { CloudRnBuilderContextInstance } from './BuilderContext';

const WIDGET_TYPE_RECORD: KV<number> = {};

function generateWidgetKey(type: string) {
  const count = WIDGET_TYPE_RECORD[type];
  const idSuffix = (count ?? -1) + 1;
  const id = `${type}-${idSuffix}`;
  WIDGET_TYPE_RECORD[type] = idSuffix;
  return id;
}

class CloudRnWidgetBuilder extends WidgetBuilder<ReactElement> {
  public context: BuilderContext = CloudRnBuilderContextInstance;

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
    const [namespace, specifier] = type.split(':');
    return (
      this.context.widgetRegistry.getInstance({
        namespace: namespace,
        type: specifier,
      }) ?? Fragment
    );
  }
}

export const CloudRnWidgetBuilderInstance = new CloudRnWidgetBuilder();
