import NextLink from 'next/link';
import { pageNovelDetail } from '~/modules/utils/path';
import { NovelDtoForPublicListing } from '~/ranobe-net-api/@types';
import { card, title_container, author } from './NovelListItem.module.css';

export const NovelListItem: React.FC<{ novel: NovelDtoForPublicListing }> = ({ novel }) => (
  <li className={card}>
    <div className={title_container}>
      <h3>
        <NextLink href={pageNovelDetail(novel.id)}>
          <a>{novel.title}</a>
        </NextLink>
      </h3>
    </div>
    <div className={author}>作者: {novel.author}</div>
    <div>{novel.description}</div>
  </li>
);
