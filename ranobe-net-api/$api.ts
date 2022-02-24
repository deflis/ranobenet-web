/* eslint-disable */
// prettier-ignore
import type { AspidaClient, BasicHeaders } from 'aspida'
// prettier-ignore
import { dataToURLString } from 'aspida'
// prettier-ignore
import type { Methods as Methods0 } from '.'
// prettier-ignore
import type { Methods as Methods1 } from './api/v1/novels'
// prettier-ignore
import type { Methods as Methods2 } from './api/v1/novels/_id@number'
// prettier-ignore
import type { Methods as Methods3 } from './api/v1/novels/_id@number/episodes'
// prettier-ignore
import type { Methods as Methods4 } from './api/v1/novels/_id@number/episodes/_episodeId@number'
// prettier-ignore
import type { Methods as Methods5 } from './api/v1/novels/_id@number/me'
// prettier-ignore
import type { Methods as Methods6 } from './api/v1/users'
// prettier-ignore
import type { Methods as Methods7 } from './api/v1/users/_id@number'
// prettier-ignore
import type { Methods as Methods8 } from './api/v1/users/_id@number/novels'
// prettier-ignore
import type { Methods as Methods9 } from './api/v1/users/me'
// prettier-ignore
import type { Methods as Methods10 } from './api/v1/users/me/novels'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/novels'
  const PATH1 = '/episodes'
  const PATH2 = '/me'
  const PATH3 = '/api/v1/users'
  const PATH4 = '/novels'
  const PATH5 = '/api/v1/users/me'
  const PATH6 = '/api/v1/users/me/novels'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    api: {
      v1: {
        novels: {
          _id: (val3: number) => {
            const prefix3 = `${PATH0}/${val3}`

            return {
              episodes: {
                _episodeId: (val5: number) => {
                  const prefix5 = `${prefix3}${PATH1}/${val5}`

                  return {
                    /**
                     * @returns Success
                     */
                    get: (option?: { config?: T }) =>
                      fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, prefix5, GET, option).json(),
                    /**
                     * @returns Success
                     */
                    $get: (option?: { config?: T }) =>
                      fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, prefix5, GET, option).json().then(r => r.body),
                    /**
                     * @returns Success
                     */
                    put: (option: { body: Methods4['put']['reqBody'], config?: T }) =>
                      fetch<Methods4['put']['resBody'], BasicHeaders, Methods4['put']['status']>(prefix, prefix5, PUT, option).json(),
                    /**
                     * @returns Success
                     */
                    $put: (option: { body: Methods4['put']['reqBody'], config?: T }) =>
                      fetch<Methods4['put']['resBody'], BasicHeaders, Methods4['put']['status']>(prefix, prefix5, PUT, option).json().then(r => r.body),
                    delete: (option?: { config?: T }) =>
                      fetch<void, BasicHeaders, Methods4['delete']['status']>(prefix, prefix5, DELETE, option).send(),
                    $delete: (option?: { config?: T }) =>
                      fetch<void, BasicHeaders, Methods4['delete']['status']>(prefix, prefix5, DELETE, option).send().then(r => r.body),
                    $path: () => `${prefix}${prefix5}`
                  }
                },
                /**
                 * @returns Success
                 */
                post: (option: { body: Methods3['post']['reqBody'], config?: T }) =>
                  fetch<Methods3['post']['resBody'], BasicHeaders, Methods3['post']['status']>(prefix, `${prefix3}${PATH1}`, POST, option).json(),
                /**
                 * @returns Success
                 */
                $post: (option: { body: Methods3['post']['reqBody'], config?: T }) =>
                  fetch<Methods3['post']['resBody'], BasicHeaders, Methods3['post']['status']>(prefix, `${prefix3}${PATH1}`, POST, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH1}`
              },
              me: {
                /**
                 * @returns Success
                 */
                get: (option?: { config?: T }) =>
                  fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, `${prefix3}${PATH2}`, GET, option).json(),
                /**
                 * @returns Success
                 */
                $get: (option?: { config?: T }) =>
                  fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, `${prefix3}${PATH2}`, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH2}`
              },
              /**
               * @returns Success
               */
              get: (option?: { config?: T }) =>
                fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, prefix3, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option?: { config?: T }) =>
                fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
              /**
               * @returns Success
               */
              put: (option: { body: Methods2['put']['reqBody'], config?: T }) =>
                fetch<Methods2['put']['resBody'], BasicHeaders, Methods2['put']['status']>(prefix, prefix3, PUT, option).json(),
              /**
               * @returns Success
               */
              $put: (option: { body: Methods2['put']['reqBody'], config?: T }) =>
                fetch<Methods2['put']['resBody'], BasicHeaders, Methods2['put']['status']>(prefix, prefix3, PUT, option).json().then(r => r.body),
              delete: (option?: { config?: T }) =>
                fetch<void, BasicHeaders, Methods2['delete']['status']>(prefix, prefix3, DELETE, option).send(),
              $delete: (option?: { config?: T }) =>
                fetch<void, BasicHeaders, Methods2['delete']['status']>(prefix, prefix3, DELETE, option).send().then(r => r.body),
              $path: () => `${prefix}${prefix3}`
            }
          },
          /**
           * @returns Success
           */
          get: (option: { query: Methods1['get']['query'], config?: T }) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, PATH0, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option: { query: Methods1['get']['query'], config?: T }) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
          /**
           * @returns Success
           */
          post: (option: { body: Methods1['post']['reqBody'], config?: T }) =>
            fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH0, POST, option).json(),
          /**
           * @returns Success
           */
          $post: (option: { body: Methods1['post']['reqBody'], config?: T }) =>
            fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
          $path: (option?: { method?: 'get'; query: Methods1['get']['query'] }) =>
            `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        },
        users: {
          _id: (val3: number) => {
            const prefix3 = `${PATH3}/${val3}`

            return {
              novels: {
                /**
                 * @returns Success
                 */
                get: (option: { query: Methods8['get']['query'], config?: T }) =>
                  fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, `${prefix3}${PATH4}`, GET, option).json(),
                /**
                 * @returns Success
                 */
                $get: (option: { query: Methods8['get']['query'], config?: T }) =>
                  fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, `${prefix3}${PATH4}`, GET, option).json().then(r => r.body),
                $path: (option?: { method?: 'get'; query: Methods8['get']['query'] }) =>
                  `${prefix}${prefix3}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
              },
              /**
               * @returns Success
               */
              get: (option?: { config?: T }) =>
                fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, prefix3, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option?: { config?: T }) =>
                fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`
            }
          },
          me: {
            novels: {
              /**
               * @returns Success
               */
              get: (option: { query: Methods10['get']['query'], config?: T }) =>
                fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(prefix, PATH6, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option: { query: Methods10['get']['query'], config?: T }) =>
                fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(prefix, PATH6, GET, option).json().then(r => r.body),
              $path: (option?: { method?: 'get'; query: Methods10['get']['query'] }) =>
                `${prefix}${PATH6}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
            },
            /**
             * @returns Success
             */
            get: (option?: { config?: T }) =>
              fetch<Methods9['get']['resBody'], BasicHeaders, Methods9['get']['status']>(prefix, PATH5, GET, option).json(),
            /**
             * @returns Success
             */
            $get: (option?: { config?: T }) =>
              fetch<Methods9['get']['resBody'], BasicHeaders, Methods9['get']['status']>(prefix, PATH5, GET, option).json().then(r => r.body),
            /**
             * @returns Success
             */
            post: (option?: { config?: T }) =>
              fetch<Methods9['post']['resBody'], BasicHeaders, Methods9['post']['status']>(prefix, PATH5, POST, option).json(),
            /**
             * @returns Success
             */
            $post: (option?: { config?: T }) =>
              fetch<Methods9['post']['resBody'], BasicHeaders, Methods9['post']['status']>(prefix, PATH5, POST, option).json().then(r => r.body),
            /**
             * @returns Success
             */
            put: (option: { body: Methods9['put']['reqBody'], config?: T }) =>
              fetch<Methods9['put']['resBody'], BasicHeaders, Methods9['put']['status']>(prefix, PATH5, PUT, option).json(),
            /**
             * @returns Success
             */
            $put: (option: { body: Methods9['put']['reqBody'], config?: T }) =>
              fetch<Methods9['put']['resBody'], BasicHeaders, Methods9['put']['status']>(prefix, PATH5, PUT, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH5}`
          },
          /**
           * @returns Success
           */
          get: (option: { query: Methods6['get']['query'], config?: T }) =>
            fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, PATH3, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option: { query: Methods6['get']['query'], config?: T }) =>
            fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get'; query: Methods6['get']['query'] }) =>
            `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        }
      }
    },
    get: (option?: { config?: T }) =>
      fetch<void, BasicHeaders, Methods0['get']['status']>(prefix, '', GET, option).send(),
    $get: (option?: { config?: T }) =>
      fetch<void, BasicHeaders, Methods0['get']['status']>(prefix, '', GET, option).send().then(r => r.body),
    $path: () => `${prefix}`
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
