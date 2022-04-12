import React from 'react';
import ReactDOM from 'react-dom';
import {root} from './App.css';

function App() {
  return (
    <div className={root}>
      I'm app #1
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
