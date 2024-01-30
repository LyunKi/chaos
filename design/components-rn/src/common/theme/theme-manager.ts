import { VariableManager, VariablePacks } from '@cloud-dragon/common-utils';
import isString from 'lodash-es/isString';
import { ConfigManager, DEFAULT_THEME_MODE } from '../constants';
import { CHAKRA_THEME_PACK } from './chakra';
import { KV } from '@cloud-dragon/common-types';

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

class ThemeManagerClass extends VariableManager {
  public get mode(): string {
    return (this.packKey as any) ?? DEFAULT_THEME_MODE;
  }

  public get theme() {
    return this.variables;
  }

  public setMode(mode: string) {
    this.setPackKey(mode);
  }

  public setThemePacks(themePacks: VariablePacks) {
    this.setPacks(themePacks);
  }

  public themed(theme?: KV) {
    return this.processed(theme);
  }

  public themedValue(value: any) {
    return this.processedValue(value);
  }

  public handlePresetVariableValue(value: any) {
    const { baseFontSize, windowHeight, windowWidth } = ConfigManager.configs;
    if (isRemValue(value)) {
      return handleRemValue(value, baseFontSize);
    }
    if (isVwValue(value)) {
      return handleVwValue(value, windowWidth);
    }
    if (isVhValue(value)) {
      return handleVhValue(value, windowHeight);
    }
    return super.handlePresetVariableValue(value);
  }
}

export const ThemeManager = new ThemeManagerClass(
  CHAKRA_THEME_PACK,
  DEFAULT_THEME_MODE
);
