/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from '.'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/users/me'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'

  return {
    /**
     * @returns Success
     */
    get: (option?: { config?: T }) =>
      fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
    /**
     * @returns Success
     */
    $get: (option?: { config?: T }) =>
      fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
    /**
     * @returns Success
     */
    post: (option?: { config?: T }) =>
      fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json(),
    /**
     * @returns Success
     */
    $post: (option?: { config?: T }) =>
      fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
    /**
     * @returns Success
     */
    put: (option: { body: Methods0['put']['reqBody'], config?: T }) =>
      fetch<Methods0['put']['resBody'], BasicHeaders, Methods0['put']['status']>(prefix, PATH0, PUT, option).json(),
    /**
     * @returns Success
     */
    $put: (option: { body: Methods0['put']['reqBody'], config?: T }) =>
      fetch<Methods0['put']['resBody'], BasicHeaders, Methods0['put']['status']>(prefix, PATH0, PUT, option).json().then(r => r.body),
    $path: () => `${prefix}${PATH0}`
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
