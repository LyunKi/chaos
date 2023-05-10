export class IterableWeakSet<V extends object> {
  private inner: Set<WeakRef<V>> = new Set();

  public constructor(iterables: Iterable<V> = []) {
    for (const element of iterables) {
      this.add(element);
    }
  }

  public add(element: V) {
    this.inner.add(new WeakRef(element));
  }

  private find(element: V) {
    for (const wrap of this.inner) {
      const innerObject = wrap.deref();
      if (!innerObject) {
        this.deleteWeakRef(wrap);
        continue;
      }
      if (innerObject === element) {
        return wrap;
      }
    }
    return null;
  }

  public delete(element: V) {
    const target = this.find(element);
    if (target) {
      return this.inner.delete(target);
    }
    return false;
  }

  public has(element: V) {
    const target = this.find(element);
    return !!target;
  }

  private deleteWeakRef(element: WeakRef<V>) {
    return this.inner.delete(element);
  }

  *[Symbol.iterator]() {
    for (const element of this.inner) {
      const innerObject = element.deref();
      if (!innerObject) {
        this.deleteWeakRef(element);
      } else {
        yield innerObject;
      }
    }
  }
}
