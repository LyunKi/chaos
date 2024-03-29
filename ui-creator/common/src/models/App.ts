import { Navigation } from './Navigation';
import { I18nPacks } from './I18n';
import { ThemePacks } from './Theme';
import { Config } from './Config';

export interface App {
  name: string;
  config?: Config;
  i18nPacks?: I18nPacks;
  themePacks?: ThemePacks;
  navigation: Navigation;
}
