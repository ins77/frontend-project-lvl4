import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export default handleActions({
  [actions.init](state, { payload: { channels } }) {
    return {
      byId: _.keyBy(channels, 'id'),
      allIds: channels.map(({ id }) => id),
    };
  },
  // [actions.addChannelSuccess](state, { payload: { channel } }) {
  //   return state;
  // },
  // [actions.removeChannelSuccess](state, { payload: { id } }) {
  //   return state;
  // },
  // [actions.updateChannelSuccess](state, { payload: { channel } }) {
  //   return state;
  // },
}, { byId: {}, allIds: [] });