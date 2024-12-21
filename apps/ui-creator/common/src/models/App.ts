import { ConfigPacks } from './Config';
import { I18nPacks } from './I18n';
import { Navigation } from './Navigation';
import { ThemePacks } from './Theme';

export interface App {
  name: string;
  configPacks?: ConfigPacks;
  i18nPacks?: I18nPacks;
  themePacks?: ThemePacks;
  navigation: Navigation;
}
