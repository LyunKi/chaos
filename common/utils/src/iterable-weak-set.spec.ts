import { IterableWeakSet } from './iterable-weak-set';

describe('IterableWeakSet', () => {
  it('should act like weakset but iterable', () => {
    const a: any = [{}, {}, {}];
    const set = new IterableWeakSet([a[0]]);
    set.add(a[1]);
    set.add(a[2]);
    expect(set.has(a[1])).toBe(true);
    let count = 0;
    for (const element of set) {
      expect(element).toBe(a[count]);
      count += 1;
    }
  });
});
