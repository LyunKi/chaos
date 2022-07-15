import type { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    $pathVariables?: Record<string, any>
  }
}
