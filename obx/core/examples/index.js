class A {
  @observable
  accessor a = 'a';

  @action
  changeA(newA) {
    this.a = newA;
  }

  @action
  async asyncChangeA() {
    this.a = 'changing';
    await Promise.resolve('action');
    runInAction(() => {
      this.a = complete;
    });
  }
}

const ai = new A();

subscribe(() => {
  console.log('console ai.a:', ai).a;
});

// console ai.a: newA
ai.changeA('newA');

// warning,won't console
ai.a = 'test';
