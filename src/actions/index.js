import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const init = createAction('INIT');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const changeChannel = createAction('CHANNEL_CHANGE');
export const channelCreateModal = createAction('CHANNEL_CREATE_MODAL');
export const channelRemoveModal = createAction('CHANNEL_REMOVE_MODAL');
export const channelRenameModal = createAction('CHANNEL_RENAME_MODAL');

export const addMessage = ({ channelId, message, userName }) => async () => {
  const url = routes.channelMessagesPath(channelId);
  await axios.post(url, { data: { attributes: { message, userName } } });
};

export const addChannel = ({ name }) => async () => {
  const url = routes.channelsPath();
  await axios.post(url, { data: { attributes: { name } } });
};

export const renameChannel = ({ id, name }) => async () => {
  const url = routes.channelPath(id);
  await axios.patch(url, { data: { attributes: { name } } });
};

export const removeChannel = ({ id }) => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    const url = routes.channelPath(id);
    await axios.delete(url);
    dispatch(removeChannelSuccess({ id }));
  } catch (e) {
    dispatch(removeChannelFailure());
    throw e;
  }
};
