import { ACTION_PHOTOS_RECEIVE } from '../identifiers';

const defaultState = {
  data: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_PHOTOS_RECEIVE:
      return {
        data: action.payload.photos,
      };
    default:
      return state;
  }
};
