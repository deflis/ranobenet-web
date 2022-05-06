import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './api/v1/novels'
import type { Methods as Methods2 } from './api/v1/novels/_id@number'
import type { Methods as Methods3 } from './api/v1/novels/_id@number/chapters'
import type { Methods as Methods4 } from './api/v1/novels/_id@number/episodes'
import type { Methods as Methods5 } from './api/v1/novels/_id@number/episodes/_episodeId@number'
import type { Methods as Methods6 } from './api/v1/novels/_id@number/episodes/_episodeId@number/me'
import type { Methods as Methods7 } from './api/v1/novels/_id@number/me'
import type { Methods as Methods8 } from './api/v1/users'
import type { Methods as Methods9 } from './api/v1/users/_id@number'
import type { Methods as Methods10 } from './api/v1/users/_id@number/novels'
import type { Methods as Methods11 } from './api/v1/users/me'
import type { Methods as Methods12 } from './api/v1/users/me/novels'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/novels'
  const PATH1 = '/chapters'
  const PATH2 = '/episodes'
  const PATH3 = '/me'
  const PATH4 = '/api/v1/users'
  const PATH5 = '/novels'
  const PATH6 = '/api/v1/users/me'
  const PATH7 = '/api/v1/users/me/novels'
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
              chapters: {
                /**
                 * @returns Success
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, `${prefix3}${PATH1}`, GET, option).json(),
                /**
                 * @returns Success
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, `${prefix3}${PATH1}`, GET, option).json().then(r => r.body),
                post: (option: { body: Methods3['post']['reqBody'], config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods3['post']['status']>(prefix, `${prefix3}${PATH1}`, POST, option).send(),
                $post: (option: { body: Methods3['post']['reqBody'], config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods3['post']['status']>(prefix, `${prefix3}${PATH1}`, POST, option).send().then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH1}`
              },
              episodes: {
                _episodeId: (val5: number) => {
                  const prefix5 = `${prefix3}${PATH2}/${val5}`

                  return {
                    me: {
                      /**
                       * @returns Success
                       */
                      get: (option?: { config?: T | undefined } | undefined) =>
                        fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, `${prefix5}${PATH3}`, GET, option).json(),
                      /**
                       * @returns Success
                       */
                      $get: (option?: { config?: T | undefined } | undefined) =>
                        fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, `${prefix5}${PATH3}`, GET, option).json().then(r => r.body),
                      $path: () => `${prefix}${prefix5}${PATH3}`
                    },
                    /**
                     * @returns Success
                     */
                    get: (option?: { config?: T | undefined } | undefined) =>
                      fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, prefix5, GET, option).json(),
                    /**
                     * @returns Success
                     */
                    $get: (option?: { config?: T | undefined } | undefined) =>
                      fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, prefix5, GET, option).json().then(r => r.body),
                    /**
                     * @returns Success
                     */
                    put: (option: { body: Methods5['put']['reqBody'], config?: T | undefined }) =>
                      fetch<Methods5['put']['resBody'], BasicHeaders, Methods5['put']['status']>(prefix, prefix5, PUT, option).json(),
                    /**
                     * @returns Success
                     */
                    $put: (option: { body: Methods5['put']['reqBody'], config?: T | undefined }) =>
                      fetch<Methods5['put']['resBody'], BasicHeaders, Methods5['put']['status']>(prefix, prefix5, PUT, option).json().then(r => r.body),
                    delete: (option?: { config?: T | undefined } | undefined) =>
                      fetch<void, BasicHeaders, Methods5['delete']['status']>(prefix, prefix5, DELETE, option).send(),
                    $delete: (option?: { config?: T | undefined } | undefined) =>
                      fetch<void, BasicHeaders, Methods5['delete']['status']>(prefix, prefix5, DELETE, option).send().then(r => r.body),
                    $path: () => `${prefix}${prefix5}`
                  }
                },
                /**
                 * @returns Success
                 */
                post: (option: { body: Methods4['post']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, `${prefix3}${PATH2}`, POST, option).json(),
                /**
                 * @returns Success
                 */
                $post: (option: { body: Methods4['post']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, `${prefix3}${PATH2}`, POST, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH2}`
              },
              me: {
                /**
                 * @returns Success
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, `${prefix3}${PATH3}`, GET, option).json(),
                /**
                 * @returns Success
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, `${prefix3}${PATH3}`, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH3}`
              },
              /**
               * @returns Success
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, prefix3, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
              /**
               * @returns Success
               */
              put: (option: { body: Methods2['put']['reqBody'], config?: T | undefined }) =>
                fetch<Methods2['put']['resBody'], BasicHeaders, Methods2['put']['status']>(prefix, prefix3, PUT, option).json(),
              /**
               * @returns Success
               */
              $put: (option: { body: Methods2['put']['reqBody'], config?: T | undefined }) =>
                fetch<Methods2['put']['resBody'], BasicHeaders, Methods2['put']['status']>(prefix, prefix3, PUT, option).json().then(r => r.body),
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods2['delete']['status']>(prefix, prefix3, DELETE, option).send(),
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods2['delete']['status']>(prefix, prefix3, DELETE, option).send().then(r => r.body),
              $path: () => `${prefix}${prefix3}`
            }
          },
          /**
           * @returns Success
           */
          get: (option?: { query?: Methods1['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, PATH0, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option?: { query?: Methods1['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
          /**
           * @returns Success
           */
          post: (option: { body: Methods1['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH0, POST, option).json(),
          /**
           * @returns Success
           */
          $post: (option: { body: Methods1['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods1['get']['query'] } | undefined) =>
            `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        },
        users: {
          _id: (val3: number) => {
            const prefix3 = `${PATH4}/${val3}`

            return {
              novels: {
                /**
                 * @returns Success
                 */
                get: (option?: { query?: Methods10['get']['query'] | undefined, config?: T | undefined } | undefined) =>
                  fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(prefix, `${prefix3}${PATH5}`, GET, option).json(),
                /**
                 * @returns Success
                 */
                $get: (option?: { query?: Methods10['get']['query'] | undefined, config?: T | undefined } | undefined) =>
                  fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(prefix, `${prefix3}${PATH5}`, GET, option).json().then(r => r.body),
                $path: (option?: { method?: 'get' | undefined; query: Methods10['get']['query'] } | undefined) =>
                  `${prefix}${prefix3}${PATH5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
              },
              /**
               * @returns Success
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods9['get']['resBody'], BasicHeaders, Methods9['get']['status']>(prefix, prefix3, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods9['get']['resBody'], BasicHeaders, Methods9['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`
            }
          },
          me: {
            novels: {
              /**
               * @returns Success
               */
              get: (option?: { query?: Methods12['get']['query'] | undefined, config?: T | undefined } | undefined) =>
                fetch<Methods12['get']['resBody'], BasicHeaders, Methods12['get']['status']>(prefix, PATH7, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option?: { query?: Methods12['get']['query'] | undefined, config?: T | undefined } | undefined) =>
                fetch<Methods12['get']['resBody'], BasicHeaders, Methods12['get']['status']>(prefix, PATH7, GET, option).json().then(r => r.body),
              $path: (option?: { method?: 'get' | undefined; query: Methods12['get']['query'] } | undefined) =>
                `${prefix}${PATH7}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
            },
            /**
             * @returns Success
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(prefix, PATH6, GET, option).json(),
            /**
             * @returns Success
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(prefix, PATH6, GET, option).json().then(r => r.body),
            /**
             * @returns Success
             */
            post: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods11['post']['resBody'], BasicHeaders, Methods11['post']['status']>(prefix, PATH6, POST, option).json(),
            /**
             * @returns Success
             */
            $post: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods11['post']['resBody'], BasicHeaders, Methods11['post']['status']>(prefix, PATH6, POST, option).json().then(r => r.body),
            /**
             * @returns Success
             */
            put: (option: { body: Methods11['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods11['put']['resBody'], BasicHeaders, Methods11['put']['status']>(prefix, PATH6, PUT, option).json(),
            /**
             * @returns Success
             */
            $put: (option: { body: Methods11['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods11['put']['resBody'], BasicHeaders, Methods11['put']['status']>(prefix, PATH6, PUT, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH6}`
          },
          /**
           * @returns Success
           */
          get: (option?: { query?: Methods8['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, PATH4, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option?: { query?: Methods8['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, PATH4, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods8['get']['query'] } | undefined) =>
            `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        }
      }
    },
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<void, BasicHeaders, Methods0['get']['status']>(prefix, '', GET, option).send(),
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<void, BasicHeaders, Methods0['get']['status']>(prefix, '', GET, option).send().then(r => r.body),
    $path: () => `${prefix}`
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
