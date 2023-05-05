// https://www.typescriptlang.org/play

function observable<T extends object>(
  { get, set }: ClassAccessorDecoratorTarget<T, any>,
  context: ClassAccessorDecoratorContext
): ClassAccessorDecoratorResult<T, any> {
  const { kind } = context;
  if (kind !== 'accessor') {
    throw new Error(
      `You can only declare observable decorator on accessor fields`
    );
  }
  return {
    get() {
      const value = get.call(this);
      console.log('get value', value);
      return get.call(this);
    },
    set(newValue) {
      const value = get.call(this);
      console.log('set value', value, newValue);
      set.call(this, newValue);
    },
  };
}

class A {
  @observable
  accessor a = 1;

  @observable
  accessor b = {
    c: 'c',
  };
}

const a = new A();
console.log('init, a', a.a);

const c = a.a;
a.a = 2;
console.log('current, a', a.a);
