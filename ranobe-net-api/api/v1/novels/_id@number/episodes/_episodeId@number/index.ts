/* eslint-disable */
import type * as Types from '../../../../../../@types'

export type Methods = {
  get: {
    status: 200
    /** Success */
    resBody: Types.EpisodeDtoForPublicParsed
  }

  put: {
    status: 200
    /** Success */
    resBody: Types.EpisodeDtoForMe
    reqBody: Types.EpisodeDtoForSave
  }

  delete: {
    status: 200
  }
}
