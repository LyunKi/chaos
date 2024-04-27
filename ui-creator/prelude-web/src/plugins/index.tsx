import { DecoratorPlugin, NavigationPlugin } from '@cloud-creator/common';
import { ReactElement } from 'react';

export class TanStackNavigationPlugin extends NavigationPlugin<
  ReactElement,
  ReactElement,
  ReactElement
> {}

export class AntDesignDecoratorPlugin extends DecoratorPlugin<
  ReactElement,
  ReactElement,
  ReactElement
> {
  protected buildDecorator(children: ReactElement): ReactElement {
    return null;
  }
}
