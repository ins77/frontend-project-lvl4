import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const init = createAction('INIT');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');

export const addMessage = ({ channelId, message, userName }) => async (dispatch) => {
  const url = routes.channelMessagesPath(channelId);
  await axios.post(url, { data: { attributes: { message, userName } } });
};

// export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
// export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
// export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

// export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
// export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
// export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

// export const updateChannelRequest = createAction('CHANNEL_UPDATE_REQUEST');
// export const updateChannelSuccess = createAction('CHANNEL_UPDATE_SUCCESS');
// export const updateChannelFailure = createAction('CHANNEL_UPDATE_FAILURE');

// export const addChannel = ({ channel }) => async (dispatch) => {
//   dispatch(addChannelRequest());
//   try {
//     const url = routes.channelsPath();
//     const response = await axios.post(url, { channel });
//     dispatch(addChannelSuccess({ channel: response.data }));
//   } catch (e) {
//     dispatch(addChannelFailure());
//     throw e;
//   }
// };

// export const removeChannel = ({ id }) => async (dispatch) => {
//   dispatch(removeChannelRequest());
//   try {
//     const url = routes.channelPath(id);
//     const response = await axios.delete(url);
//     dispatch(removeChannelSuccess({ id }));
//   } catch (e) {
//     dispatch(removeChannelFailure());
//     throw e;
//   }
// };

// export const updateChannel = ({ id }) => async (dispatch) => {
//   dispatch(updateChannelRequest());
//   try {
//     const url = routes.channelPath(id);
//     const response = await axios.delete(url);
//     dispatch(updateChannelSuccess({ id }));
//   } catch (e) {
//     dispatch(updateChannelFailure());
//     throw e;
//   }
// };
