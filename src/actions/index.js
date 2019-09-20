import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const init = createAction('INIT');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const changeChannel = createAction('CHANNEL_CHANGE');
export const showChannelCreateModal = createAction('CHANNEL_CREATE_MODAL_SHOW');
export const showChannelRemoveModal = createAction('CHANNEL_REMOVE_MODAL_SHOW');
export const showChannelRenameModal = createAction('CHANNEL_RENAME_MODAL_SHOW');

export const addMessage = ({ channelId, message, userName }) => async () => {
  const url = routes.channelMessagesPath(channelId);
  await axios.post(url, { data: { attributes: { message, userName } } });
};

export const addChannel = ({ name }) => async () => {
  const url = routes.channelsPath();
  await axios.post(url, { data: { attributes: { name } } });
};
