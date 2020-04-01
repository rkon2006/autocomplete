import React from 'react';
import cx from 'clsx';
import styles from './Suggestions.module.scss';

export const Suggestions = (props) => {
  const { active, list, onClick } = props;

  const handleClick = (e) => {
    onClick(e.currentTarget.innerText);
  };

  if (!list.length) {
    return <div className={styles.noResults}>No suggestions yet</div>
  }
  return (
    <ul className={styles.wrapper}>
      {list.map((result, i) => (
        <li onClick={handleClick} className={cx(styles.listRow, {
          [styles.active]: i === active,
        })} key={result}>
          {result}
        </li>
      ))}
    </ul>
  );
};
