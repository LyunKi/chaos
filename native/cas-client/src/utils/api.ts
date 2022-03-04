import axios from 'axios'
import { each, set } from 'lodash'
import humps from 'humps'
import qs from 'qs'

const defaults = axios.defaults

// const API_SERVER =

const instance = axios.create({
  baseURL: API_SERVER,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  transformResponse: [
    ...defaults.transformResponse,
    (data) => humps.camelizeKeys(data),
  ],
  transformRequest: [
    (data) => humps.decamelizeKeys(data),
    ...defaults.transformRequest,
  ],
})

instance.interceptors.request.use((config) => {
  if (config.url !== '/upload') {
    config.paramsSerializer = (params) => {
      return qs.stringify(humps.decamelizeKeys(params), {
        arrayFormat: 'indices',
        encode: false,
      })
    }
  }
  return config
})

const setTokenHeader = (token: string) => {
  set(
    instance,
    'defaults.headers.common.Authorization',
    generateAuthorizationHeader(token)
  )
}

const removeTokenHeader = () => {
  set(instance, 'defaults.headers.common.Authorization', undefined)
}

//try to get the token from storage , and set into axios instance
const token = Storage.getItem<string>('token')

if (token) {
  setTokenHeader(token)
}

// @ts-ignore
const api: IApi = {
  request<T>(options: IApiRequestOptions): Promise<T> {
    return instance(options)
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            //redirect to login page
            Navigator.goto('/auth/login')
          }
          if (error.response.status === 403) {
            message.warn('You are not allowed to visit current service')
          }
          return Promise.reject({
            code: error.response.status,
            message: error.response.statusText,
          })
        }
        const errMessage = error.request
          ? 'Cannot receive response from server'
          : error.message
        return Promise.reject({
          ...Immortal.UnknownError,
          message: errMessage,
        })
      })
      .then((axiosResponse) => {
        const response: IResponse<T> = axiosResponse.data
        //return the date we needed directly
        if (response.code === 401) {
          //redirect to login page
          Navigator.goto('/auth/login')
        }
        if (response.code === 403) {
          message.warn('You are not allowed to visit current service')
        }
        if (response.code >= 400) {
          //if it's a error
          return Promise.reject({
            code: response.code,
            message: response.message,
          })
        }
        return Promise.resolve(response.data)
      })
  },
}

// @ts-ignore
api.upload = function (files: FileList, config) {
  const formData = new FormData()
  each(files, (file) => {
    formData.append('files[]', file)
  })
  return api.request<string[]>({
    ...config,
    method: 'post',
    data: formData,
    url: '/upload',
    baseURL: SERVER,
    transformRequest: [
      //@ts-ignore
      ...axios.defaults.transformRequest,
    ],
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

function produceMethod<T>(method: string) {
  return function (
    beforeUrl: string,
    beforeParams: IObject,
    configs: IApiRequestOptions
  ) {
    const { url, data, params } = generateUrlParams(beforeUrl, beforeParams)
    return api.request<T>({
      ...configs,
      method,
      url,
      params,
      data,
    })
  }
}

each(Reflect.ownKeys(METHOD), (method) => {
  // @ts-ignore
  api[method] = produceMethod(method)
})

export { api, instance as apiInstance, removeTokenHeader, setTokenHeader }
