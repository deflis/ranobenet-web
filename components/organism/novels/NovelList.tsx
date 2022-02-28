import { NovelListItem } from '~/components/molecules/novels/NovelListtem';
import { NovelDtoForPublicListing } from '~/ranobe-net-api/@types';
import { list } from './NovelList.module.css';

export const NovelList: React.FC<{ novels: NovelDtoForPublicListing[] }> = ({ novels }) => (
  <ul className={list}>
    {novels.map((novel) => (
      <NovelListItem key={novel.id} novel={novel} />
    ))}
  </ul>
);
