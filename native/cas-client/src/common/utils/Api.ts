import axios, { AxiosRequestConfig } from 'axios'
import Constants from 'expo-constants'
import humps from 'humps'
import qs from 'qs'

export const PATH_VARIABLES = '$pathVariables'

const defaults = axios.defaults

enum Method {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const instance = axios.create({
  baseURL: Constants.manifest?.extra?.baseUrl,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  transformResponse: [
    ...(defaults.transformResponse as any),
    (data) => humps.camelizeKeys(data),
  ],
  transformRequest: [
    (data) => humps.decamelizeKeys(data),
    ...(defaults.transformRequest as any),
  ],
})

instance.interceptors.request.use((config) => {
  if (!config.url) {
    return config
  }
  let url = config.url
  Object.entries(config[PATH_VARIABLES] ?? {}).forEach(([k, v]) => {
    url = url.replace(`/:${k}`, v ? `/${encodeURIComponent(v)}` : '')
  })
  config.paramsSerializer = (params) => {
    return qs.stringify(params, {
      arrayFormat: 'indices',
      encode: false,
    })
  }
  return {
    ...config,
    url,
  }
})

const INTERNAL_SERVER_ERROR = '500'

class Api {
  public async request(config: AxiosRequestConfig) {
    const { [PATH_VARIABLES]: pathVariables, ...rest } = config
    try {
      const result = await instance({
        [PATH_VARIABLES]: pathVariables,
        ...rest,
      })
      return result
    } catch (e) {
      console.log(JSON.parse(JSON.stringify(e)))
      throw {
        code: INTERNAL_SERVER_ERROR,
        msg: e.message,
        errors: [],
      }
    }
  }

  public async get(url: string, config: AxiosRequestConfig = {}) {
    return this.request({
      method: Method.GET,
      url,
      ...config,
    })
  }

  public async delete(url: string, config: AxiosRequestConfig = {}) {
    return this.request({
      method: Method.DELETE,
      url,
      ...config,
    })
  }

  public async put(url: string, data?: any, config: AxiosRequestConfig = {}) {
    return this.request({
      method: Method.PUT,
      url,
      data,
      ...config,
    })
  }

  public async post(url: string, data?: any, config: AxiosRequestConfig = {}) {
    return this.request({
      method: Method.POST,
      url,
      data,
      ...config,
    })
  }

  public async upload(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ) {
    return this.request({
      ...config,
      method: Method.POST,
      data: formData,
      url,
      transformRequest: [...(defaults.transformRequest as any)],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

const singleton = new Api()

export default singleton
