import { ACTION_PHOTOS_RECEIVE } from '../identifiers';

const defaultState = {
  data: [],
  date: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_PHOTOS_RECEIVE:
      return {
        data: action.payload.photos,
        date: action.payload.date
      };
    default:
      return state;
  }
};
