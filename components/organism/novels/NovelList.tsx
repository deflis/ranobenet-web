import { NovelDtoForPublicListing } from '~/ranobe-net-api/@types';
import { list } from './NovelList.module.css';
import { NovelListItem } from './NovelListItem';

export const NovelList: React.FC<{ novels: NovelDtoForPublicListing[] }> = ({ novels }) => (
  <ul className={list}>
    {novels.map((novel) => (
      <NovelListItem key={novel.id} novel={novel} />
    ))}
  </ul>
);
