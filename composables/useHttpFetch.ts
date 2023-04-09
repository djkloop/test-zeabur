/* eslint-disable no-console */
interface IHttpFetchOptions {
  headers?: Record<string, string>
  [key: string]: any
}

export function useHttpFetch(url: string, options: IHttpFetchOptions) {
  // token
  const token = useCookie('token')
  // headers
  const _headers = {
    ...options.headers,
    ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
  }
  options.headers = _headers

  return useFetch(url, {
    ...options,
    baseURL: '',
    onRequest({ request, options }) {
      console.log('request', request)
    },
    onRequestError({ request, options, error }) {
      console.log('request', request)
    },
    onResponse({ request, response, options }) {
      console.log('request', response)
    },
    onResponseError({ request, response, options }) {
    },
  })
}

// 定义接口
export function useInfoFetch(option: IHttpFetchOptions) {
  console.log('-->')
  return useHttpFetch('/user/info', option)
}
