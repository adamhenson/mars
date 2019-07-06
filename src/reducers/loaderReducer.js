const defaultState = {
  isActive: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOADER_ACTIVE':
      return {
        isActive: action.payload,
      };
    default:
      return state;
  }
};
