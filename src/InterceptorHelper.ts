import { toast } from 'vue3-toastify'

export default class InterceptorHelper {
  private static baseUrl = import.meta.env.VITE_APP_API_URL

  // intercept request
  static async interceptRequest(options: RequestInit = {}): Promise<RequestInit> {
    // get token
    const token = localStorage.getItem('token')
    const lang = localStorage.getItem('locale')

    options.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'lang': lang ? lang.toLowerCase() : 'en' ,
      ...options.headers
    }
    if (token) {
      options.headers = {
        Authorization: `Bearer ${token}`,
        ...options.headers
      }
    }

    // delete content type if the body is an object (eg. FormData)
    if (typeof options.body === 'object') {
      if (options.headers?.['Content-Type' as keyof HeadersInit]) {
        delete options.headers['Content-Type' as keyof HeadersInit]
      }
    }

    return options
  }

  static async interceptXHR<T>(
      url: string,
      payload: any,
      onProgress: (e: ProgressEvent<XMLHttpRequestEventTarget>) => void
  ) {
    const token = localStorage.getItem('token')

    const response = await new Promise<T>((resolve) => {
      const req = new XMLHttpRequest()

      req.open('POST', `${InterceptorHelper.baseUrl}${url}`)

      if (token) {
        req.setRequestHeader('Authorization', `Token ${token}`)
      }

      req.upload.addEventListener('progress', onProgress)

      req.addEventListener('load', () => {
        resolve(JSON.parse(req.response))
      })

      req.send(payload)
    })

    return response
  }

  // intercept response
  static async interceptResponse<T>(response: Response, method: string | undefined): Promise<TypeResponse> {
    if (response.headers.get('Content-Type') !== 'application/json') {
      return await response.blob()
    }

    const responseJson = await response.json()
    // handle response error
    if (!response.ok) {
      if (responseJson?.data) {
        if (responseJson.data?.length) {
          for (const [key, value] of Object.entries(responseJson.data)) {
            toast.error(value)
          }
        }
        else {
          for (const [key, value] of Object.entries(responseJson.errors)) {
            toast.error(value)
          }
        }
      }
      else if (responseJson.message || responseJson.error) {
        toast.error(responseJson.message || responseJson.error)
      } else {
        for (const [key, value] of Object.entries(responseJson)) {
          toast.error(value)
        }
      }
      return Promise.reject(responseJson)
    }

    // handle response success
    if (method && method.toLowerCase() !== 'get') {
      // toast.success(message);
    }

    return responseJson
  }

  // intercept function
  static async intercept<T>(
      url: string,
      options: RequestInit = {},
      queryParams: Record<string, string | number> = {}
  ): Promise<TypeResponse> {
    // Construct query string from queryParams object
    const queryString = Object.keys(queryParams)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&')

    // Append query string to the URL
    const fullUrl = Object.keys(queryParams).length
        ? `${InterceptorHelper.baseUrl}${url}?${queryString}`
        : `${InterceptorHelper.baseUrl}${url}${queryString}`

    // handle request
    const requestOptions = await InterceptorHelper.interceptRequest(options)

    const response = await fetch(fullUrl, requestOptions)

    // handle response
    const responsOption = await InterceptorHelper.interceptResponse<T>(response, options.method)

    return responsOption
  }
}
