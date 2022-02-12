import { isString } from 'class-validator';
import { parse } from './novel';
import { NovelLineElement } from './types';

export function length(text: string): number {
  return Array.from(text).length;
}
export function lengthForParse(text: string): number {
  return parse(text).reduce((length, line) => length + line.reduce((length, element) => length + count(element), 0), 0);
}

function count(element: NovelLineElement): number {
  if (isString(element)) {
    return length(element);
  } else {
    return length(element.text);
  }
}
