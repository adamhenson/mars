import { ACTION_PHOTOS_RECEIVE } from '../identifiers';
import { API_URL_ROVERS } from '../config';
import { loaderAction } from './loaderAction';

const API_URL = `${API_URL_ROVERS}?api_key=${process.env.REACT_APP_API_KEY}`

export const receivePhotosAction = payload => ({
  type: ACTION_PHOTOS_RECEIVE,
  payload,
});

export const fetchPhotosAction = () => (async (dispatch) => {
  // activate loader
  dispatch(loaderAction(true));

  // fetch photo data
  const photosResponse = await fetch(`${API_URL}&earth_date=2019-7-6`);
  const photosData = await photosResponse.json();

  // if we have data - dispatch the action to send it to the store.
  if (photosData && photosData) {
    dispatch(receivePhotosAction(photosData));
  }

  // deactivate loader
  dispatch(loaderAction(false));
});
