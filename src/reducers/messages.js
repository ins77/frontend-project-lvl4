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
}, { byId: {}, allIds: [] });
