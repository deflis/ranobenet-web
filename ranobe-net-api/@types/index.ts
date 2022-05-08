/* eslint-disable */
export type Chapter = {
  id?: number | null | undefined
  type: 'nonChapter' | 'chapter'
  title?: string | null | undefined
  episodes: Episode[]
}

export type ChapterDtoForPublic = {
  type: 'nonChapter' | 'chapter'
  title?: string | null | undefined
  episodes: EpisodeDtoForPublic[]
}

export type ChaptersDto = {
  chapters: Chapter[]
}

export type Episode = {
  id: number
}

export type EpisodeDtoForMe = {
  id: number
  chapterId: number
  title: string
  story: string
  private: boolean
}

export type EpisodeDtoForPublic = {
  id: number
  title: string
  story: string
}

export type EpisodeDtoForPublicParsed = {
  id: number
  title: string
  story: string[][]
}

export type EpisodeDtoForSave = {
  title: string
  story: string
  private: boolean
}

export type NovelDtoForMe = {
  id: number
  title: string
  description: string
  author?: string | null | undefined
  links: NovelLinkDto[]
  tags: NovelTagDto[]
  private: boolean
}

export type NovelDtoForMePagedList = {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
  items: NovelDtoForMe[]
}

export type NovelDtoForPublic = {
  id: number
  title: string
  description: string
  author: string
  userId: number
  chapters: ChapterDtoForPublic[]
  links: NovelLinkDto[]
  tags: NovelTagDto[]
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
  author?: string | null | undefined
  links: NovelLinkDto[]
  tags: NovelTagDto[]
  private: boolean
}

export type NovelLinkDto = {
  link: string
  name: string
}

export type NovelTagDto = {
  tag: string
}

export type UserDtoForMe = {
  id: number
  name: string
}

export type UserDtoForPublic = {
  id: number
  name: string
  novels: NovelDtoForPublicListing[]
  links: UserLinkDto[]
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

export type UserLinkDto = {
  link: string
  name: string
}
