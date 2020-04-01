import React from 'react';
import { AutocompleteApi } from '../api/AutocompleteApi';
import styles from './Autocomplete.module.scss';
import { Suggestions } from '../Suggestions';

const api = new AutocompleteApi({
  baseURL: 'https://reqres.in/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const Autocomplete = () => {
  const [text, setText] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [active, setActive] = React.useState(0);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const handleChange = async (event) => {
    const textValue = event.target.value;

    try {
      const res = await api.getSuggestions(textValue);

      setText(textValue);
      setResults(res);
      setShowSuggestions(true);
    } catch (e) {
      console.log('error');
    }
  };

  const handleSelect = (value) => {
    setText(value);
    setShowSuggestions(false);
  };

  const handleArrowNavigation = (e) => {
    if (e.keyCode === 13) {
      setText(results[active]);
      setActive(0);
      setShowSuggestions(false);
      return;
    }

    if (e.keyCode === 38) {
      if (active === 0) {
        return;
      }

      return setActive(active - 1);
    }

    if (e.keyCode === 40) {
      if (active === results.length - 1) {
        return;
      }

      return setActive(active + 1);
    }
  };

  const renderSuggestions = () => {
    return (
      <div className={styles.suggestionsWrapper}>
        <Suggestions onClick={handleSelect} active={active} list={results} />
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        onChange={handleChange}
        onKeyDown={handleArrowNavigation}
        type="text"
        placeholder="start typing"
        value={text}
      />
      {showSuggestions && renderSuggestions()}
    </div>
  );
};
