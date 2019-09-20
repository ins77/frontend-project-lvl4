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
import ChannelCreateModal from './components/ChannelCreateModal';
import ChannelRemoveModal from './components/ChannelRemoveModal';
import ChannelRenameModal from './components/ChannelRenameModal';

export default (gon) => {
  const socket = io();
  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  const devToolMiddleware = ext && ext();
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      devToolMiddleware,
    ),
  );

  if (!cookies.get('userName')) {
    cookies.set('userName', faker.name.findName());
  }

  const userName = cookies.get('userName');
  const contextValue = { userName };

  socket.on('newChannel', ({ data: { attributes } }) => {
    store.dispatch(actions.addChannelSuccess({ channel: attributes }));
  });

  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(actions.removeChannelSuccess({ id }));
    store.dispatch(actions.changeChannel({ currentChannelId: 1 }));
  });

  socket.on('renameChannel', ({ data: { attributes } }) => {
    const { id, name } = attributes;

    store.dispatch(actions.renameChannelSuccess({ id, name }));
  });

  socket.on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(actions.addMessageSuccess({ message: attributes }));
  });

  store.dispatch(actions.init({ ...gon }));

  return render(
    <Provider store={store}>
      <EntityContext.Provider value={contextValue}>
        <App/>
        <ChannelCreateModal/>
        <ChannelRemoveModal/>
        <ChannelRenameModal/>
      </EntityContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
