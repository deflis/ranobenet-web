/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from '.'
// prettier-ignore
import { Methods as Methods1 } from './_id@number'
// prettier-ignore
import { Methods as Methods2 } from './_id@number/episodes'
// prettier-ignore
import { Methods as Methods3 } from './_id@number/episodes/_episodeId@number'
// prettier-ignore
import { Methods as Methods4 } from './_id@number/me'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/novels'
  const PATH1 = '/episodes'
  const PATH2 = '/me'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    _id: (val0: number) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        episodes: {
          _episodeId: (val2: number) => {
            const prefix2 = `${prefix0}${PATH1}/${val2}`

            return {
              /**
               * @returns Success
               */
              get: (option?: { config?: T }) =>
                fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix2, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option?: { config?: T }) =>
                fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
              /**
               * @returns Success
               */
              put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
                fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, prefix2, PUT, option).json(),
              /**
               * @returns Success
               */
              $put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
                fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, prefix2, PUT, option).json().then(r => r.body),
              delete: (option?: { config?: T }) =>
                fetch<void, BasicHeaders, Methods3['delete']['status']>(prefix, prefix2, DELETE, option).send(),
              $delete: (option?: { config?: T }) =>
                fetch<void, BasicHeaders, Methods3['delete']['status']>(prefix, prefix2, DELETE, option).send().then(r => r.body),
              $path: () => `${prefix}${prefix2}`
            }
          },
          /**
           * @returns Success
           */
          post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
            fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, `${prefix0}${PATH1}`, POST, option).json(),
          /**
           * @returns Success
           */
          $post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
            fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, `${prefix0}${PATH1}`, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix0}${PATH1}`
        },
        me: {
          /**
           * @returns Success
           */
          get: (option?: { config?: T }) =>
            fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, `${prefix0}${PATH2}`, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option?: { config?: T }) =>
            fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, `${prefix0}${PATH2}`, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix0}${PATH2}`
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
        /**
         * @returns Success
         */
        put: (option: { body: Methods1['put']['reqBody'], config?: T }) =>
          fetch<Methods1['put']['resBody'], BasicHeaders, Methods1['put']['status']>(prefix, prefix0, PUT, option).json(),
        /**
         * @returns Success
         */
        $put: (option: { body: Methods1['put']['reqBody'], config?: T }) =>
          fetch<Methods1['put']['resBody'], BasicHeaders, Methods1['put']['status']>(prefix, prefix0, PUT, option).json().then(r => r.body),
        delete: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix0, DELETE, option).send(),
        $delete: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix0, DELETE, option).send().then(r => r.body),
        $path: () => `${prefix}${prefix0}`
      }
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
    /**
     * @returns Success
     */
    post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
      fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json(),
    /**
     * @returns Success
     */
    $post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
      fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
    $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
      `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
