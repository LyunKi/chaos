import { ObjectKey } from '@cloud-dragon/common-types';
import { IterableWeakSet } from '@cloud-dragon/common-utils';
import { Observer } from './observers';

class DependenciesManagerClass {
  private isCollecting = false;
  private countChangingAction = 0;
  // 将要执行的任务集合
  private tasks: IterableWeakSet<Observer> | null = null;
  private observers: Observer[] = [];

  public dependenciesMap = new WeakMap<
    any,
    Record<ObjectKey, IterableWeakSet<Observer>>
  >();

  private get currentObserver() {
    return this.observers[this.observers.length - 1];
  }

  public startCollect(observer: Observer) {
    this.isCollecting = true;
    this.observers.push(observer);
  }

  public endCollect() {
    this.isCollecting = false;
    this.observers.pop();
  }

  public observe(target: any, propKey: ObjectKey) {
    if (!this.currentObserver || !this.isCollecting) {
      return;
    }
    const dependencies = this.dependenciesMap.get(target) ?? {};
    if (dependencies[propKey]) {
      dependencies[propKey].add(this.currentObserver);
    } else {
      dependencies[propKey] = new IterableWeakSet([this.currentObserver]);
    }
    this.dependenciesMap.set(target, dependencies);
  }

  public startAction() {
    if (this.countChangingAction === 0) {
      this.tasks = new IterableWeakSet();
    }
    this.countChangingAction += 1;
  }

  public notifyObservers(target: any, propKey: ObjectKey) {
    if (this.countChangingAction === 0) {
      console.warn(
        "You are changing observable state out of actions, observers won't be notified"
      );
      return;
    }
    const dependencies = this.dependenciesMap.get(target);
    const observers = dependencies?.[propKey] ?? [];
    for (const observer of observers) {
      this.tasks?.add(observer);
    }
  }

  public endAction() {
    this.countChangingAction -= 1;
    if (this.countChangingAction === 0) {
      // 确认所有action都执行完毕时通知 observers 执行
      for (const observer of this.tasks ?? []) {
        observer.call();
      }
      this.tasks = null;
    }
  }
}

export const DependenciesManager = new DependenciesManagerClass();
