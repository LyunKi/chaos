export type ObjectKey = string | symbol | number;

export type KV<T = any> = Record<ObjectKey, T>;

export type NestedString = {
  [key: string]: string | NestedString;
};

export type Prefix<K extends string, T extends string = string> = `${K}${T}`;

export type Fn<P extends Array<any> = any[], R = any, This = any> = (
  this: This,
  ...args: P
) => R;

export interface Constructor<T = any> {
  new (...args: any[]): T;
}
