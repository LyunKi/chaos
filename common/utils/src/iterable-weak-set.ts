export class IterableWeakSet<V extends object> {
  private inner: Set<WeakRef<V>> = new Set();
  private records: WeakMap<V, WeakRef<V>> = new WeakMap();

  public constructor(iterables: Iterable<V> = []) {
    for (const element of iterables) {
      this.add(element);
    }
  }

  public add(element: V) {
    let record = this.records.get(element);
    if (!record) {
      record = new WeakRef(element);
      this.records.set(element, record);
    }
    this.inner.add(record);
  }

  public delete(element: V) {
    let record = this.records.get(element);
    if (!record) {
      return false;
    }
    return this.inner.delete(record);
  }

  public has(element: V) {
    let record = this.records.get(element);
    if (!record) {
      return false;
    }
    return this.inner.has(record);
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
