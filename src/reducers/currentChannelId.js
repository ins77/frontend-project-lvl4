import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export default handleActions({
  [actions.init](state, { payload: { currentChannelId } }) {
    return currentChannelId;
  },
  [actions.changeChannel](state, { payload: { currentChannelId } }) {
    return currentChannelId;
  }
}, 1);
