import { KV } from '@cloud-dragon/common-types'

interface InterpolateOptions {
  template?: string
  context?: KV
  placeholder?: RegExp
}

export function interpolate({
  placeholder = /{([^}]+)}/g,
  template,
  context,
}: InterpolateOptions) {
  return context
    ? template?.replace(placeholder, (_match, paramKey: string) => {
        return context[paramKey]
      })
    : template
}
