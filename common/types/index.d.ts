export type KV<T = any> = Record<string, T>

export type NestedString = {
  [key: string]: string | NestedString
}

export type Prefix<K extends string, T extends string = string> = `${K}${T}`

export type Fn<P = any[], R = any> = (...args: P) => R
