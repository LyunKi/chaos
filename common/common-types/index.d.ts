export type KV<T = any> = Record<string, T>

export type NestedString = {
  [key: string]: string | NestedString
}
