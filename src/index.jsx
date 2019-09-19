import '@babel/polyfill';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';
import * as actions from './actions';
import EntityContext from './EntityContext';

// TODO: бейджики
export default (gon) => {
  const socket = io();
  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  const devToolMiddleware = ext && ext();
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      devToolMiddleware
    )
  );

  if (!cookies.get('userName')) {
    cookies.set('userName', faker.name.findName());
  }

  const userName = cookies.get('userName');
  const contextValue = { userName };

  // TODO: использовать вебсокеты
  // socket.on('newChannel', (channels) => {
  //   console.log('newChannel');
  // });

  // socket.on('removeChannel', (channels) => {
  //   console.log('removeChannel');
  // });

  // socket.on('renameChannel', (channels) => {
  //   console.log('renameChannel');
  // });

  socket.on('newMessage', ({ data: { attributes } } ) => {
    store.dispatch(actions.addMessageSuccess({ message: attributes }));
  });

  store.dispatch(actions.init({ ...gon }));

  return render(
    <Provider store={store}>
      <EntityContext.Provider value={contextValue}>
        <App/>
      </EntityContext.Provider>
    </Provider>,
    document.getElementById('chat')
  );
};
