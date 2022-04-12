import React from 'react';
import ReactDOM from' react-dom';
import styles from './App.css';

function App() {
  return (
    <div className={styles.root}>
      I'm app #1
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
