/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    status: 200
    /** Success */
    resBody: Types.NovelDtoForPublic
  }

  put: {
    status: 200
    /** Success */
    resBody: Types.NovelDtoForMe
    reqBody: Types.NovelDtoForSave
  }

  delete: {
    status: 200
  }
}
