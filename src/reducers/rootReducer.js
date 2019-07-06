import { combineReducers } from 'redux';
import loader from './loaderReducer';
import photos from './photosReducer';

export default combineReducers({
  loader,
  photos,
});
