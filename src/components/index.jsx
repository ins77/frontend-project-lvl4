import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';

export default (data) => {
  return ReactDOM.render(
    <App data={data}/>,
    document.getElementById('chat')
  );
};
