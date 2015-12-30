const match = (expression, matchers, defaultState) => {
  for (const key of Object.keys(matchers)) {
    if (expression === key) {
      return matchers[key]();
    }
  }

  return defaultState;
};

export const INITIAL_STATE = {
  fetching: false,
  user: null,
  error: null
};

export default (state = INITIAL_STATE, action) => match(action.type, {
  FETCH_USER:         () => ({ ...state, fetching: true, error: null }),
  RECEIVE_USER:       () => ({ ...state, fetching: false, user: action.payload }),
  ERR_RECEIVE_USER:   () => ({ ...state, fetching: false, error: action.payload }),
  ADD_USER:           () => ({ ...state, adding: true, error: null }),
  ADDED_USER:         () => ({ ...state, adding: false, user: action.payload }),
  ERR_ADDING_USER:    () => ({ ...state, adding: false, error: action.payload })
}, state);
