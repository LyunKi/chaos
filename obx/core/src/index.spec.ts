import { observable } from './observables';
import { subscribe } from './observers';
import { runInAction, action } from './actions';
import { computed } from './subjects';

class Store {
  @observable
  accessor num1 = 1;

  @action
  changeNum1(newNum: number) {
    this.num1 = newNum;
  }

  @observable
  accessor object1 = {
    a: {
      b: 'b',
    },
  };

  @observable
  accessor array1 = [
    {
      a: {
        b: 'b',
        c: 1,
      },
    },
  ];

  @computed
  public get c() {
    return this.array1[0].a.c - this.array1[0].a.c;
  }

  public get c1() {
    return this.array1[0].a.c - this.array1[0].a.c;
  }

  @action
  changeC(newC: number) {
    this.array1[0].a.c = newC;
  }

  @observable
  accessor array2 = [
    {
      a: {
        b: 'b',
      },
    },
  ];
}

describe('observable', () => {
  it('should notify observers while changed', () => {
    const observer1 = jest.fn();
    const store = new Store();
    subscribe(() => {
      observer1(store.num1);
    });
    runInAction(() => {
      store.num1 = 2;
    });
    expect(observer1).toBeCalledTimes(2);
    expect(observer1).lastCalledWith(2);
  });

  it('should reduce the called times of observers', () => {
    const observer1 = jest.fn();
    const store = new Store();
    subscribe(() => {
      observer1(store.num1);
    });
    runInAction(() => {
      store.num1 = 2;
      runInAction(() => {
        store.num1 = 3;
      });
    });
    expect(observer1).toBeCalledTimes(2);
    expect(observer1).lastCalledWith(3);
  });

  it('should observe observable object as expect', () => {
    const store = new Store();

    const observer1 = jest.fn();
    subscribe(() => {
      observer1(store.object1);
    });
    const newObject1 = { a: { b: 'newB' } };
    runInAction(() => {
      store.object1 = { a: { b: 'newB' } };
    });
    expect(observer1).toBeCalledTimes(2);
    expect(observer1).toHaveBeenCalledWith(newObject1);
  });

  it('should observe observable array as expect', () => {
    const store: any = new Store();
    const observer1 = jest.fn();
    subscribe(() => {
      observer1(store.array1[0].a.b);
    });
    runInAction(() => {
      store.array1[0].a.b = 'newB';
    });
    expect(observer1).toBeCalledTimes(2);
    expect(observer1).lastCalledWith('newB');
  });

  it('support observe uninitialized array elements', () => {
    const store: any = new Store();
    const observer1 = jest.fn();
    subscribe(() => {
      // 此时 array1[1] 其实是空的
      observer1(store.array1[1]);
    });
    runInAction(() => {
      store.array1.push('element1');
    });
    expect(observer1).toBeCalledTimes(2);
    expect(observer1).lastCalledWith('element1');
  });

  it('support observe uninitialized object elements', () => {
    const store: any = new Store();
    const observer1 = jest.fn();
    subscribe(() => {
      // 此时 array2[0].a.c 其实是空的
      observer1(store.array2[0].a.c);
    });
    runInAction(() => {
      store.array2[0].a.c = 'newC';
    });
    expect(observer1).toBeCalledTimes(2);
    expect(observer1).lastCalledWith('newC');
  });

  it("should notify observers when observable's properties is deleted", () => {
    const store: any = new Store();
    const observer1 = jest.fn();
    subscribe(() => {
      // 此时 array2[0].a.c 其实是空的
      observer1(store.array1[0].a.c);
    });
    runInAction(() => {
      delete store.array1[0].a.c;
    });
    expect(observer1).toBeCalledTimes(2);
    expect(observer1).lastCalledWith(undefined);
  });

  it('will not react if target observables had been deleted', () => {
    const store: any = new Store();
    const observer1 = jest.fn();
    subscribe(() => {
      // observer1会观察 store、store.array2、store.array2[0]、store.array2[0].a 、store.array2[0].a.c
      observer1(store.array2[0].a.c);
    });
    runInAction(() => {
      // 重建了对象,因此 observer1 对 store.array2[0].a 、store.array2[0].a.c 的观察都丢失了
      store.array2[0] = {
        a: {
          c: 'newC',
        },
      };
    });
    // 这里 observer1 能监听到 store.array2[0] 的变化
    expect(observer1).toBeCalledTimes(2);
    expect(observer1).lastCalledWith('newC');

    const observer2 = jest.fn();
    subscribe(() => {
      observer2(store.array2[0].a.c);
    });

    runInAction(() => {
      store.array2[0].a.c = 'newCC';
    });

    expect(observer1).toBeCalledTimes(2);
    expect(observer2).toBeCalledTimes(2);
    expect(observer2).lastCalledWith('newCC');
  });
});

describe('action', () => {
  it('should notify observers while action triggered', () => {
    const observer1 = jest.fn();
    const store = new Store();
    subscribe(() => {
      observer1(store.num1);
    });
    const changeNum1 = store.changeNum1;
    // auto bind
    changeNum1(2);
    expect(observer1).toBeCalledTimes(2);
    expect(observer1).lastCalledWith(2);
  });
});

describe('computed', () => {
  it('should notify observers only if it changed', () => {
    const observer1 = jest.fn();
    const store = new Store();
    subscribe(() => {
      observer1(store.c);
    });
    store.changeC(2);
    // 因为computed最后的值不变，所以不会通知观察者
    expect(observer1).toBeCalledTimes(1);
  });

  it('should auto notify observers by indirect dependency for getters', () => {
    const observer1 = jest.fn();
    const store = new Store();
    subscribe(() => {
      observer1(store.c1);
    });
    expect(observer1).toBeCalledTimes(1);
    expect(observer1).lastCalledWith(0);
    store.changeC(2);
    // 因为这里其实间接依赖了 store.array1[0].a.c ,所以虽然 getter 的值没有变化，但仍会由于 store.array1[0].a.c 的变化而变化
    expect(observer1).toBeCalledTimes(2);
    expect(observer1).lastCalledWith(0);
  });
});
