/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from './novels'
// prettier-ignore
import { Methods as Methods1 } from './novels/_id@number'
// prettier-ignore
import { Methods as Methods2 } from './novels/_id@number/episodes'
// prettier-ignore
import { Methods as Methods3 } from './novels/_id@number/episodes/_episodeId@number'
// prettier-ignore
import { Methods as Methods4 } from './novels/_id@number/me'
// prettier-ignore
import { Methods as Methods5 } from './users'
// prettier-ignore
import { Methods as Methods6 } from './users/_id@number'
// prettier-ignore
import { Methods as Methods7 } from './users/_id@number/novels'
// prettier-ignore
import { Methods as Methods8 } from './users/me'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/novels'
  const PATH1 = '/episodes'
  const PATH2 = '/me'
  const PATH3 = '/api/v1/users'
  const PATH4 = '/novels'
  const PATH5 = '/api/v1/users/me'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    novels: {
      _id: (val1: number) => {
        const prefix1 = `${PATH0}/${val1}`

        return {
          episodes: {
            _episodeId: (val3: number) => {
              const prefix3 = `${prefix1}${PATH1}/${val3}`

              return {
                /**
                 * @returns Success
                 */
                get: (option?: { config?: T }) =>
                  fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix3, GET, option).json(),
                /**
                 * @returns Success
                 */
                $get: (option?: { config?: T }) =>
                  fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
                /**
                 * @returns Success
                 */
                put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
                  fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, prefix3, PUT, option).json(),
                /**
                 * @returns Success
                 */
                $put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
                  fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, prefix3, PUT, option).json().then(r => r.body),
                delete: (option?: { config?: T }) =>
                  fetch<void, BasicHeaders, Methods3['delete']['status']>(prefix, prefix3, DELETE, option).send(),
                $delete: (option?: { config?: T }) =>
                  fetch<void, BasicHeaders, Methods3['delete']['status']>(prefix, prefix3, DELETE, option).send().then(r => r.body),
                $path: () => `${prefix}${prefix3}`
              }
            },
            /**
             * @returns Success
             */
            post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
              fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, `${prefix1}${PATH1}`, POST, option).json(),
            /**
             * @returns Success
             */
            $post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
              fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, `${prefix1}${PATH1}`, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH1}`
          },
          me: {
            /**
             * @returns Success
             */
            get: (option?: { config?: T }) =>
              fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, `${prefix1}${PATH2}`, GET, option).json(),
            /**
             * @returns Success
             */
            $get: (option?: { config?: T }) =>
              fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, `${prefix1}${PATH2}`, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH2}`
          },
          /**
           * @returns Success
           */
          get: (option?: { config?: T }) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option?: { config?: T }) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          /**
           * @returns Success
           */
          put: (option: { body: Methods1['put']['reqBody'], config?: T }) =>
            fetch<Methods1['put']['resBody'], BasicHeaders, Methods1['put']['status']>(prefix, prefix1, PUT, option).json(),
          /**
           * @returns Success
           */
          $put: (option: { body: Methods1['put']['reqBody'], config?: T }) =>
            fetch<Methods1['put']['resBody'], BasicHeaders, Methods1['put']['status']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
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
    },
    users: {
      _id: (val1: number) => {
        const prefix1 = `${PATH3}/${val1}`

        return {
          novels: {
            /**
             * @returns Success
             */
            get: (option: { query: Methods7['get']['query'], config?: T }) =>
              fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, `${prefix1}${PATH4}`, GET, option).json(),
            /**
             * @returns Success
             */
            $get: (option: { query: Methods7['get']['query'], config?: T }) =>
              fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, `${prefix1}${PATH4}`, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get'; query: Methods7['get']['query'] }) =>
              `${prefix}${prefix1}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          },
          /**
           * @returns Success
           */
          get: (option?: { config?: T }) =>
            fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option?: { config?: T }) =>
            fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      me: {
        /**
         * @returns Success
         */
        get: (option?: { config?: T }) =>
          fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, PATH5, GET, option).json(),
        /**
         * @returns Success
         */
        $get: (option?: { config?: T }) =>
          fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, PATH5, GET, option).json().then(r => r.body),
        /**
         * @returns Success
         */
        post: (option?: { config?: T }) =>
          fetch<Methods8['post']['resBody'], BasicHeaders, Methods8['post']['status']>(prefix, PATH5, POST, option).json(),
        /**
         * @returns Success
         */
        $post: (option?: { config?: T }) =>
          fetch<Methods8['post']['resBody'], BasicHeaders, Methods8['post']['status']>(prefix, PATH5, POST, option).json().then(r => r.body),
        /**
         * @returns Success
         */
        put: (option: { body: Methods8['put']['reqBody'], config?: T }) =>
          fetch<Methods8['put']['resBody'], BasicHeaders, Methods8['put']['status']>(prefix, PATH5, PUT, option).json(),
        /**
         * @returns Success
         */
        $put: (option: { body: Methods8['put']['reqBody'], config?: T }) =>
          fetch<Methods8['put']['resBody'], BasicHeaders, Methods8['put']['status']>(prefix, PATH5, PUT, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH5}`
      },
      /**
       * @returns Success
       */
      get: (option: { query: Methods5['get']['query'], config?: T }) =>
        fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH3, GET, option).json(),
      /**
       * @returns Success
       */
      $get: (option: { query: Methods5['get']['query'], config?: T }) =>
        fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods5['get']['query'] }) =>
        `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
