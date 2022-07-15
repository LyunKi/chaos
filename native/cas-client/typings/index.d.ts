declare module 'axios' {
  interface AxiosRequestConfig {
    $pathVariables?: Record<string, any>
  }
}
