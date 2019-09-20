import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export default handleActions({
  [actions.init](state, { payload: { channels } }) {
    return {
      byId: _.keyBy(channels, 'id'),
      allIds: channels.map(({ id }) => id),
    };
  },
  [actions.addChannelSuccess](state, { payload: { channel } }) {
    return {
      byId: { ...state.byId, [channel.id]: { ...channel } },
      allIds: [...state.allIds, channel.id],
    };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    return {
      byId: _.omit(state.byId, id),
      allIds: state.allIds.filter(currentId => currentId !== id),
    };
  },
  [actions.renameChannelSuccess](state, { payload: { id, name } }) {
    console.log(id, name);
    return {
      byId: { ...state.byId, [id]: { ...state.byId[id], name } },
      allIds: state.allIds,
    };
  },
}, { byId: {}, allIds: [] });