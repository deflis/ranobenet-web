import { IoBookmarkOutline } from 'react-icons/io5';
import { pageNovelEpisode } from '~/modules/utils/path';
import { ChapterDtoForPublic } from '~/ranobe-net-api/@types';
import NextLink from 'next/link';

export const EpisodeList: React.FC<{ chapters: ChapterDtoForPublic[]; novelId: number }> = ({ chapters, novelId }) => (
  <div className='w-full flex flex-col bg-white border border-gray-300 rounded mt-2'>
    {chapters.map((chapter) => (
      <>
        {chapter.type === 'Chapter' && <header className='font-semibold p-3'>{chapter.title}</header>}
        {chapter.episodes.map((episode) => (
          <NextLink href={pageNovelEpisode(novelId, episode.id)} key={episode.id}>
            <a className=' hover:bg-gray-200 cursor-pointer grid-cols-6 border-t first:border-none border-gray-300 p-3 text-black hover:text-black'>
              <div className='col-span-5 flex flex-row'>
                <IoBookmarkOutline className='h-5 w-5 mr-2 rounded bg-gray-300 text-gray-00' />
                <div className=''>{episode.title}</div>
              </div>
            </a>
          </NextLink>
        ))}
      </>
    ))}
  </div>
);
