/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    query: {
      order: 'id' | 'title' | 'modified' | 'created' | null
      size: number
      page: number
      descending: boolean
    }

    status: 200
    /** Success */
    resBody: Types.NovelDtoForPublicListingPagedList
  }

  post: {
    status: 200
    /** Success */
    resBody: Types.NovelDtoForMe
    reqBody: Types.NovelDtoForSave
  }
}
