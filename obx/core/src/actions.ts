import { Fn } from '@harmony/common-types';
import { DependenciesManager } from './dependencies-manager';

export function runInAction(change: Fn) {
  DependenciesManager.startAction();
  const result = change();
  DependenciesManager.endAction();
  return result;
}

export const action = <This>(
  value: Fn,
  context: ClassMethodDecoratorContext<This>
) => {
  const { kind, addInitializer } = context;
  if (kind !== 'method') {
    throw new Error(`You can only declare action decorator on method`);
  }
  let bound: Fn;
  addInitializer(function () {
    // auto bind this
    bound = value.bind(this);
  });
  return function (this: This, ...args: any[]) {
    return runInAction(bound.bind(this, ...args));
  };
};
