import _ from 'lodash';
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
  [actions.showChannelCreateModal](state, { payload }) {
    return payload;
  },
}, false);

const channelRemoveModal = handleActions({
  [actions.showChannelRemoveModal](state, { payload: { id, name, show } }) {
    return { id, name, show };
  },
}, false);

const channelRenameModal = handleActions({
  [actions.showChannelRenameModal](state, { payload }) {
    return payload;
  },
}, false);

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