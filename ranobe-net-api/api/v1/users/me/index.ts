/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    status: 200
    /** Success */
    resBody: Types.UserDtoForMe
  }

  post: {
    status: 200
    /** Success */
    resBody: Types.UserDtoForMe
  }

  put: {
    status: 200
    /** Success */
    resBody: Types.UserDtoForMe
    reqBody: Types.UserDtoForSave
  }
}
