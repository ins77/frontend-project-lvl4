import _ from 'lodash';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import channels from './channels';
import messages from './messages';
import currentChannelId from './currentChannelId';

// const channelRemovingState = handleActions({
//   [actions.removeChannelRequest]() {
//     return 'requested';
//   },
//   [actions.removeChannelFailure]() {
//     return 'failed';
//   },
//   [actions.removeChannelSuccess]() {
//     return 'finished';
//   },
// }, 'none');

export default combineReducers({
  // channelRemovingState,
  currentChannelId,
  channels,
  messages,
  form: formReducer,
});