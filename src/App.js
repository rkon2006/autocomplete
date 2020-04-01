import React from 'react';
import styles from './App.module.scss';
import { Autocomplete } from './Autocomplete';

function App() {
  return (
    <div className={styles.app}>
      <Autocomplete />
    </div>
  );
}

export default App;
