import { NestedString, KV } from '@cloud-dragon/common-types';
import { reduce, isObject, get, isString, mapValues, merge } from 'lodash';
import { CloudDesignTheme, ThemeMode, ThemePack } from '../types';
import { CLOUD_THEME_PACK } from './cloud';
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

  private themePack: ThemePack = CLOUD_THEME_PACK;

  public getThemePack() {
    return this.themePack;
  }

  public setThemePack(themePack: ThemePack) {
    this.themePack = themePack;
  }

  private theme: CloudDesignTheme = {};

  public computeTheme() {
    this.theme = this.processTheme();
  }

  private mode: ThemeMode = 'light';

  public setMode(themeMode: ThemeMode) {
    this.mode = themeMode;
  }

  private processThemePresets = (theme: CloudDesignTheme): CloudDesignTheme => {
    return reduce(
      theme,
      (records, value, key) => {
        if (isObject(value)) {
          records[key] = this.processThemePresets(value);
        } else {
          records[key] = this.handlePresetThemeValue(value);
        }
        return records;
      },
      {} as CloudDesignTheme
    );
  };

  private processThemeReferences = (
    theme: CloudDesignTheme,
    fullTheme?: CloudDesignTheme
  ): CloudDesignTheme => {
    const fullRecords = fullTheme ?? theme;
    return reduce(
      theme,
      (records, value, key) => {
        if (isObject(value)) {
          records[key] = this.processThemeReferences(value, fullRecords);
        } else if (isReferenceValue(value)) {
          records[key] = get(fullRecords, value.slice(1));
        } else {
          records[key] = value;
        }
        return records;
      },
      {} as CloudDesignTheme
    );
  };

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

  private processTheme = (): CloudDesignTheme => {
    return this.processThemeReferences(
      this.processThemePresets(this.themePack[this.mode])
    );
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
