import { Fn } from '@cloud-dragon/common-types';
import { DependenciesManager } from './dependencies-manager';
import { runInAction } from './actions';
import { subscribe } from './observers';

/**
 * computed 是 rxjs 概念中的 subject,既是 observer 又是 observable
 *
 * @param value
 * @param context
 * @returns
 */
export function computed<
  This = any,
  F extends Fn<[], any, This> = Fn<[], any, This>
>(value: F, context: ClassGetterDecoratorContext<This>): F {
  const { kind, name } = context;
  if (kind !== 'getter') {
    throw new Error(`You can only declare computed decorator on getter`);
  }
  let initialized = false;
  let result: any;
  return function (this: This) {
    DependenciesManager.observe(this, name);
    if (!initialized) {
      const update = function (this: This) {
        runInAction(() => {
          const newValue = value.call(this);
          const needNotifyFlag = initialized && result !== newValue;
          result = newValue;
          if (needNotifyFlag) {
            DependenciesManager.notifyObservers(this, name);
          }
          if (!initialized) {
            initialized = true;
          }
        });
      };
      subscribe(update, { thisArg: this });
    }
    return result;
  } as F;
}
