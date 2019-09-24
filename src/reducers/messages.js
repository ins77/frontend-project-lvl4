import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions';

export default handleActions({
  [actions.init](state, { payload: { messages } }) {
    return {
      byId: _.keyBy(messages, 'id'),
      allIds: messages.map(({ id }) => id),
    };
  },
  [actions.addMessageSuccess](state, { payload: { message } }) {
    return {
      byId: { ...state.byId, [message.id]: { ...message } },
      allIds: [...state.allIds, message.id],
    };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const messagesToRemove = _.pickBy(state.byId, ({ channelId }) => channelId === id);
    const idsToRemove = Object.values(messagesToRemove).map(message => message.id);

    return {
      byId: _.omit(state.byId, idsToRemove),
      allIds: _.without(state.allIds, ...idsToRemove),
    };
  },
}, { byId: {}, allIds: [] });
