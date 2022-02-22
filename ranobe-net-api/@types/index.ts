/* eslint-disable */
export type ChapterDtoForPublic = {
  type: 0 | 1
  title?: string | null
  episodes: EpisodeDtoForPublic[]
}

export type EpisodeDtoForMe = {
  id: number
  chapterId: number
  title: string
  story: string
}

export type EpisodeDtoForPublic = {
  id: number
  title: string
  story: string
}

export type EpisodeDtoForSave = {
  title: string
  story: string
}

export type NovelDtoForMe = {
  id: number
  title: string
  description: string
  author?: string | null
}

export type NovelDtoForPublic = {
  id: number
  title: string
  description: string
  author: string
  chapters: ChapterDtoForPublic[]
}

export type NovelDtoForPublicListing = {
  id: number
  title: string
  description: string
  author: string
}

export type NovelDtoForPublicListingPagedList = {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
  items: NovelDtoForPublicListing[]
}

export type NovelDtoForSave = {
  title: string
  description: string
  author?: string | null
}

export type UserDtoForMe = {
  id: number
  name: string
}

export type UserDtoForPublic = {
  id: number
  name: string
  novels: NovelDtoForPublicListing[]
}

export type UserDtoForPublicListing = {
  id: number
  name: string
}

export type UserDtoForPublicListingPagedList = {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
  items: UserDtoForPublicListing[]
}

export type UserDtoForSave = {
  name: string
}
