import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export default handleActions({
  [actions.init](state, { payload: { channels } }) {
    // TODO: remove
    const newChannels = channels.filter(channel => !!channel.name);
    return {
      byId: _.keyBy(newChannels, 'id'),
      allIds: newChannels.map(({ id }) => id),
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
  [actions.renameChannelSuccess](state, { payload: { channel } }) {
    return state;
  },
}, { byId: {}, allIds: [] });