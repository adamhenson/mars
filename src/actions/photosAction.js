import { ACTION_PHOTOS_RECEIVE } from '../identifiers';
import { API_URL_ROVERS } from '../config';
import { loaderAction } from './loaderAction';

const API_URL = `${API_URL_ROVERS}?api_key=${process.env.REACT_APP_API_KEY}`;

export const receivePhotosAction = payload => ({
  type: ACTION_PHOTOS_RECEIVE,
  payload
});

export const fetchPhotosAction = (date = new Date()) => async dispatch => {
  // activate loader
  dispatch(loaderAction(true));

  // fetch photo data
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const earthDate = `${year}-${month}-${day}`;
  const photosResponse = await fetch(`${API_URL}&earth_date=${earthDate}`);
  const photosData = await photosResponse.json();

  // if we have data - prepare UI and dispatch the action to send it to the store.
  if (photosData && photosData.photos) {
    window.scrollTo(0, 0);
    dispatch(
      receivePhotosAction({
        ...photosData,
        date: earthDate
      })
    );
  }

  // deactivate loader
  dispatch(loaderAction(false));
};
