import { Fn } from '@harmony/common-types';
import { DependenciesManager } from './dependencies-manager';

export class Observer {
  private observer: Fn;

  private thisArg: any;

  private constructor(observer: Fn, thisArg: any) {
    this.observer = observer;
    this.thisArg = thisArg;
  }

  public get realThis() {
    if (this.thisArg === Observer.EMPTY_THIS) {
      return null;
    }
    return this.thisArg;
  }

  public call(...args: any[]) {
    return this.observer.apply(this.realThis, args);
  }

  private static EMPTY_THIS = {};

  private static instances: WeakMap<Fn, WeakMap<object, Observer>> =
    new WeakMap();

  public static getInstance(
    observer: Fn,
    thisArg: any = Observer.EMPTY_THIS
  ): Observer {
    let instances = Observer.instances.get(observer);
    let instance = instances?.get(thisArg);
    if (!instance) {
      instance = new Observer(observer, thisArg);
    }
    if (!instances) {
      instances = new WeakMap();
      instances.set(thisArg, instance);
      Observer.instances.set(observer, instances);
    }
    return instance;
  }
}

export interface SubscribeOptions {
  reaction?: Fn;
  thisArg?: any;
}

/**
 * 观察者开始监听 observables ，如果 observables 发生变化，调用 reaction, 默认为 observer 自己
 *
 * @param observer
 * @returns
 */
export function subscribe(observer: Fn, options: SubscribeOptions = {}) {
  const observerInstance = Observer.getInstance(
    options.reaction ?? observer,
    options.thisArg
  );
  DependenciesManager.startCollect(observerInstance);
  const result = observer.call(observerInstance.realThis);
  DependenciesManager.endCollect();
  return result;
}
