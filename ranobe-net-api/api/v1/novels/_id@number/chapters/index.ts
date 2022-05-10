/* eslint-disable */
import type * as Types from '../../../../../@types'

export type Methods = {
  get: {
    status: 200
    /** Success */
    resBody: Types.ChaptersDtoForMe
  }

  post: {
    status: 200
    reqBody: Types.ChaptersDtoForSave
  }
}
