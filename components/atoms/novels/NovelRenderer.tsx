import { NovelLineElement, NovelLines } from '~/modules/utils/parser';
import { isString } from 'class-validator';
import { Fragment } from 'react';
import styles from './NovelRenderer.module.css';

export const NovelRenderer: React.VFC<{
  story: NovelLines;
}> = ({ story }) => {
  return (
    <>
      {story.map((line, lineIndex) => (
        <p className={styles.container} key={lineIndex}>
          {line.map((element, elementIndex) => (
            <LineElementRender lineElement={element} key={`${lineIndex}-${elementIndex}`} />
          ))}
        </p>
      ))}
    </>
  );
};

export default NovelRenderer;

const LineElementRender: React.VFC<{
  lineElement: NovelLineElement;
}> = ({ lineElement }) => {
  if (isString(lineElement)) {
    return <>{spToNbsp(lineElement)}</>;
  }

  switch (lineElement.type) {
    case 'ruby':
      return (
        <ruby className={styles.ruby}>
          <rp>|</rp>
          {spToNbsp(lineElement.text)}
          <rp>《</rp>
          <rt>{spToNbsp(lineElement.yomi)}</rt>
          <rp>》</rp>
        </ruby>
      );
    case 'bouten':
      return (
        <ruby className={styles.ruby}>
          <rp>《《</rp>
          {Array.from(spToNbsp(lineElement.text)).map((char, i) => (
            <Fragment key={i}>
              {char}
              <rt>・</rt>
            </Fragment>
          ))}
          <rp>》》</rp>
        </ruby>
      );
  }
};

function spToNbsp(str: string): string {
  return str.replace(/ /g, '\u00A0');
}
