import React from 'react';
import { AutocompleteApi } from '../api/AutocompleteApi';

const api = new AutocompleteApi({
  baseURL: 'https://reqres.in/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const Autocomplete = () => {
  const [text, setText] = React.useState('');
  const [results, setResults] = React.useState([]);

  const handleChange = async (event) => {
    setText(event.target.value);

    try {
      const res = await api.getSuggestions(text);

      setResults(res);
    } catch (e) {
      console.log('error');
    }
  };

  const renderSuggestions = () => {
    if (text.length > 0 && !results.length) {
      return <div>No suggestions yet</div>;
    }

    return (
      <>
        {results.map((result) => <div key={result}>{result}</div>)}
      </>
    );
  };

  return (
    <div>
      <input onChange={handleChange} type="text" placeholder="start typing" value={text} />
      {renderSuggestions()}
    </div>
  );
};
