/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from '.'
// prettier-ignore
import { Methods as Methods1 } from './_id@number'
// prettier-ignore
import { Methods as Methods2 } from './_id@number/novels'
// prettier-ignore
import { Methods as Methods3 } from './me'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/users'
  const PATH1 = '/novels'
  const PATH2 = '/api/v1/users/me'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'

  return {
    _id: (val0: number) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        novels: {
          /**
           * @returns Success
           */
          get: (option: { query: Methods2['get']['query'], config?: T }) =>
            fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, `${prefix0}${PATH1}`, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option: { query: Methods2['get']['query'], config?: T }) =>
            fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, `${prefix0}${PATH1}`, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get'; query: Methods2['get']['query'] }) =>
            `${prefix}${prefix0}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        },
        /**
         * @returns Success
         */
        get: (option?: { config?: T }) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix0, GET, option).json(),
        /**
         * @returns Success
         */
        $get: (option?: { config?: T }) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix0, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${prefix0}`
      }
    },
    me: {
      /**
       * @returns Success
       */
      get: (option?: { config?: T }) =>
        fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH2, GET, option).json(),
      /**
       * @returns Success
       */
      $get: (option?: { config?: T }) =>
        fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
      /**
       * @returns Success
       */
      post: (option?: { config?: T }) =>
        fetch<Methods3['post']['resBody'], BasicHeaders, Methods3['post']['status']>(prefix, PATH2, POST, option).json(),
      /**
       * @returns Success
       */
      $post: (option?: { config?: T }) =>
        fetch<Methods3['post']['resBody'], BasicHeaders, Methods3['post']['status']>(prefix, PATH2, POST, option).json().then(r => r.body),
      /**
       * @returns Success
       */
      put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
        fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, PATH2, PUT, option).json(),
      /**
       * @returns Success
       */
      $put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
        fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, PATH2, PUT, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`
    },
    /**
     * @returns Success
     */
    get: (option: { query: Methods0['get']['query'], config?: T }) =>
      fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
    /**
     * @returns Success
     */
    $get: (option: { query: Methods0['get']['query'], config?: T }) =>
      fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
    $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
      `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
