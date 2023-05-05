import { ORIGIN_TARGET } from './constants';
import { DependenciesManager } from './dependencies-manager';

export const enum ObservablePropertyType {
  STATE,
  ACTION,
  COMPUTED,
}

function createObservableObjectProxy<T extends object>(target: T) {
  if (OBSERVABLE_PROXY_MAP.get(target)) {
    return OBSERVABLE_PROXY_MAP.get(target);
  }
  const proxy = new Proxy(target, createObservableObjectHandler());
  OBSERVABLE_PROXY_MAP.set(target, proxy);
  return proxy;
}

function registerObservers<T extends object>(
  target: T,
  key: string | symbol,
  value: any
) {
  DependenciesManager.observe(target, key);
  if (typeof value === 'object') {
    return createObservableObjectProxy(value);
  }
  return value;
}

function createObservableObjectHandler<T extends object>(): ProxyHandler<T> {
  return {
    get(target, propKey) {
      if (propKey === ORIGIN_TARGET) {
        return target;
      }
      const originValue = target?.[propKey as keyof T];
      return registerObservers(target, propKey, originValue);
    },
    set(target, propKey, newValue) {
      const originValue = target[propKey as keyof T];
      if (originValue !== newValue) {
        target[propKey as keyof T] = newValue;
        DependenciesManager.notifyObservers(target, propKey);
      }
      return true;
    },
    deleteProperty(target, propKey) {
      if (!(propKey in target)) {
        console.warn(`Property not found: ${String(propKey)}`);
        return false;
      }
      console.log('propKey', propKey);
      delete target[propKey as keyof T];
      DependenciesManager.notifyObservers(target, propKey);
      return true;
    },
  };
}

const OBSERVABLE_PROXY_MAP = new WeakMap();

export function observable<T extends object>(
  accessors: ClassAccessorDecoratorTarget<T, any>,
  context: ClassAccessorDecoratorContext
): ClassAccessorDecoratorResult<T, any> {
  const { kind, name } = context;
  if (kind !== 'accessor') {
    throw new Error(
      `You can only declare observable decorator on accessor fields`
    );
  }
  return {
    get() {
      const value = accessors.get.call(this);
      return registerObservers(this, name, value);
    },
    set(newValue) {
      const value = accessors.get.call(this);
      if (value !== newValue) {
        accessors.set.call(this, newValue);
        DependenciesManager.notifyObservers(this, name);
      }
    },
  };
}
