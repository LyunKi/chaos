import { Fn, Constructor } from '@cloud-dragon/common-types';
import { subscribe } from '@cloud-dragon/obx-core';
import { useForceUpdate } from '@cloud-dragon/react-utils';

export function observer<F extends Fn, C extends Constructor>(
  value: F | C,
  context?: ClassDecoratorContext
): typeof value extends F ? F : C {
  if (typeof value !== 'function' && context?.kind !== 'class') {
    throw new Error('You use observer in error cases');
  }
  let Inherit: any;
  if (context?.kind === 'class') {
    Inherit = class extends (value as any) {
      render() {
        return subscribe(super.render, {
          reaction: this.forceUpdate,
          thisArg: this,
        });
      }
    };
  } else if (typeof value === 'function') {
    Inherit = (...args: any[]) => {
      const forceUpdate = useForceUpdate();
      return subscribe((value as Fn).bind(null, ...args), {
        reaction: forceUpdate,
      });
    };
  }
  Inherit.contextTypes = (value as any).contextTypes;
  Inherit.displayName = (value as any).displayName ?? value.name;
  return Inherit;
}
