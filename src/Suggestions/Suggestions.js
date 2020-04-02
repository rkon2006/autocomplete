import React from 'react';
import cx from 'clsx';
import styles from './Suggestions.module.scss';
import { HighlightedText } from '../HighlightedText';

export const Suggestions = (props) => {
  const { active, list, onClick, text } = props;

  const handleClick = (e) => {
    onClick(e.currentTarget.innerText);
  };

  if (!list.length) {
    return <div className={styles.noResults}>No suggestions yet</div>;
  }
  return (
    <ul data-testid="suggestionsList" className={styles.wrapper}>
      {list.map((result, i) => (
        <li
          onClick={handleClick}
          className={cx(styles.listRow, {
            [styles.active]: i === active,
          })}
          key={result}
        >
          <HighlightedText fullString={result} piece={text} />
        </li>
      ))}
    </ul>
  );
};
