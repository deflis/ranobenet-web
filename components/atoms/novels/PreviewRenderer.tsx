import NovelRenderer from './NovelRenderer';
import { parse } from '$/utils/parser';

export const PreviewRenderer: React.VFC<{ story: string }> = ({ story }) => <NovelRenderer story={parse(story)} />;
