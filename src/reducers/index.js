import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import channels from './channels';
import messages from './messages';
import currentChannelId from './currentChannelId';
import * as actions from '../actions';

const channelRemovingState = handleActions({
  [actions.removeChannelRequest]() {
    return 'requested';
  },
  [actions.removeChannelFailure]() {
    return 'failed';
  },
  [actions.removeChannelSuccess]() {
    return 'finished';
  },
}, 'none');

const channelCreateModal = handleActions({
  [actions.channelCreateModal](state, { payload: { show } }) {
    return show;
  },
}, false);

const channelRemoveModal = handleActions({
  [actions.channelRemoveModal](state, { payload: { id, name, show } }) {
    return { id, name, show };
  },
}, {});

const channelRenameModal = handleActions({
  [actions.channelRenameModal](state, { payload: { id, name, show } }) {
    return { id, name, show };
  },
}, {});

export default combineReducers({
  channelRemovingState,
  currentChannelId,
  channels,
  messages,
  channelCreateModal,
  channelRemoveModal,
  channelRenameModal,
  form: formReducer,
});
