/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  edit: {
    novels: {
      _novelId: (novelId: string | number) => ({
        episodes: {
          _episodeId: (episodeId: string | number) => ({
            $url: (url?: { hash?: string }) => ({ pathname: '/edit/novels/[novelId]/episodes/[episodeId]' as const, query: { novelId, episodeId }, hash: url?.hash })
          }),
          $url: (url?: { hash?: string }) => ({ pathname: '/edit/novels/[novelId]/episodes' as const, query: { novelId }, hash: url?.hash })
        },
        $url: (url?: { hash?: string }) => ({ pathname: '/edit/novels/[novelId]' as const, query: { novelId }, hash: url?.hash })
      }),
      new: {
        $url: (url?: { hash?: string }) => ({ pathname: '/edit/novels/new' as const, hash: url?.hash })
      }
    },
    users: {
      me: {
        $url: (url?: { hash?: string }) => ({ pathname: '/edit/users/me' as const, hash: url?.hash })
      }
    }
  },
  novels: {
    _novelId: (novelId: string | number) => ({
      _episodeId: (episodeId: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/novels/[novelId]/[episodeId]' as const, query: { novelId, episodeId }, hash: url?.hash })
      }),
      $url: (url?: { hash?: string }) => ({ pathname: '/novels/[novelId]' as const, query: { novelId }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/novels' as const, hash: url?.hash })
  },
  users: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/users/[id]' as const, query: { id }, hash: url?.hash })
    }),
    login: {
      $url: (url?: { hash?: string }) => ({ pathname: '/users/login' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/users' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
