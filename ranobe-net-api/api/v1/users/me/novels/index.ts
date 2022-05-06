/* eslint-disable */
import type * as Types from '../../../../../@types'

export type Methods = {
  get: {
    query?: {
      order?: 'id' | 'title' | 'modified' | 'created' | null | undefined
      size?: number | undefined
      page?: number | undefined
      descending?: boolean | undefined
    } | undefined

    status: 200
    /** Success */
    resBody: Types.NovelDtoForMePagedList
  }
}
