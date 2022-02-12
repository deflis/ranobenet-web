import { NovelLineElement, NovelLines } from './types';

export function parse(novel: string): NovelLines {
  return novel.split('\n').map((line) => Array.from(parseLine(line)));
}

// https://regexper.com/#%2F%28%5B%5C%7C%EF%BD%9C%5D%28%3F%3A%E3%80%8A.%2B%3F%E3%80%8B%7C%E3%80%8A%E3%80%8A.%2B%3F%E3%80%8B%E3%80%8B%7C%EF%BC%88%5B%E3%81%82-%E3%82%93%E3%82%A2-%E3%83%B3%5D%2B%3F%EF%BC%89%29%7C%28%3F%3A%28%3F%3A%5B%E3%80%85%E3%80%87%E3%80%BB%5Cu3400-%5Cu9FFF%5CuF900-%5CuFAFF%5D%7C%5B%5CuD840-%5CuD87F%5D%5B%5CuDC00-%5CuDFFF%5D%29%2B%3F%7C%5B%5C%7C%EF%BD%9C%5D.%2B%3F%29%E3%80%8A.%2B%3F%E3%80%8B%7C%E3%80%8A%E3%80%8A.%2B%3F%E3%80%8B%E3%80%8B%7C%28%3F%3A%28%3F%3A%5B%E3%80%85%E3%80%87%E3%80%BB%5Cu3400-%5Cu9FFF%5CuF900-%5CuFAFF%5D%7C%5B%5CuD840-%5CuD87F%5D%5B%5CuDC00-%5CuDFFF%5D%29%2B%3F%7C%5B%5C%7C%EF%BD%9C%5D.%2B%3F%29%EF%BC%88%5B%E3%81%82-%E3%82%93%E3%82%A2-%E3%83%B3%5D%2B%3F%EF%BC%89%29%2F
const regexpForSplit =
  /([|｜](?:《.+?》|《《.+?》》|（[あ-んア-ン]+?）)|(?:(?:[々〇〻\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF])+?|[|｜].+?)《.+?》|《《.+?》》|(?:(?:[々〇〻\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF])+?|[|｜].+?)（[あ-んア-ン]+?）)/;

const regexpForParseRuby = /^[|｜]?(.+)[《（](.+)[》）]$/;
const regexpForParseNotRuby = /^[|｜]([《（].+[》）]|《《(.+)》》)$/;
const regexpForParseBouten = /^《《(.+)》》$/;

function* parseLine(line: string): Generator<NovelLineElement> {
  for (const element of line.split(regexpForSplit)) {
    if (element === '') continue;
    const notRuby = regexpForParseNotRuby.exec(element);
    if (notRuby) {
      yield notRuby[1];
      continue;
    }
    const bouten = regexpForParseBouten.exec(element);
    if (bouten) {
      yield {
        type: 'bouten',
        text: bouten[1],
      };
      continue;
    }
    const ruby = regexpForParseRuby.exec(element);
    if (ruby) {
      yield {
        type: 'ruby',
        yomi: ruby[2],
        text: ruby[1],
      };
      continue;
    }
    yield element;
  }
}
