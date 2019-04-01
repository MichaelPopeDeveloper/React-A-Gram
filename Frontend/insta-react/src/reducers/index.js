import { ADD_ARTICLE, LOGIN_USER, LOGOUT_USER } from "../constants/action-types";

const initialState = {
  user: false,
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload),
    //  eggs: state.eggs.concat(action.payload)
    });
  }
  if (action.type === LOGIN_USER) {
    return Object.assign({}, state, {
      user: state.user = action.payload,
    });
  }
  if (action.type === LOGOUT_USER) {
    return Object.assign({}, state, {
      user: state.user = action.payload,
    });
  }
  return state;
}

export default rootReducer;