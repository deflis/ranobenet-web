/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    query: {
      order: 'id' | 'name' | 'modified' | 'created' | null
      size: number
      page: number
      descending: boolean
    }

    status: 200
    /** Success */
    resBody: Types.UserDtoForPublicListingPagedList
  }
}
