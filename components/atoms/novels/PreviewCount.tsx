import { length, lengthForParse } from '$/utils/parser';
import React from 'react';

export const PreviewCount: React.VFC<{ story: string }> = ({ story }) => <>{length(story)}</>;
export const PreviewCountForView: React.VFC<{ story: string }> = ({ story }) => <>{lengthForParse(story)}</>;
