import { ADD_ARTICLE, LOGIN_USER, LOGOUT_USER, UPDATE_USER, EDIT_POST, CLEAR_EDIT_POST, DISPLAY_POST, CLEAR_DISPLAY_POST, NAVIGATE_TO_EDIT_POST, NAVIGATE_TO_DISPLAY_POST } from "../constants/action-types";

const initialState = {
  navigation: {
    navigateToEdit: false,
    navigateToDisplay: false,
  },
  postToDisplay: false,
  postToEdit: false,
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
  if (action.type === UPDATE_USER) {
    return Object.assign({}, state, {
      user: state.user = action.payload,
    });
  }
  if (action.type === LOGOUT_USER) {
    return Object.assign({}, state, {
      user: state.user = action.payload,
      postToEdit: state.postToEdit = action.payload,
    });
  }
  if (action.type === EDIT_POST) {
    return Object.assign({}, state, {
      postToEdit: state.postToEdit = action.payload,
    });
  }
  if (action.type === CLEAR_EDIT_POST) {
    return Object.assign({}, state, {
      postToEdit: state.postToEdit = false,
    });
  }
  if (action.type === DISPLAY_POST) {
    return Object.assign({}, state, {
      postToDisplay: state.postToDisplay = action.payload,
    });
  }
  if (action.type === CLEAR_DISPLAY_POST) {
    return Object.assign({}, state, {
      postToDisplay: state.postToDisplay = false,
    });
  }
  if (action.type === NAVIGATE_TO_EDIT_POST) {
    return Object.assign({}, state, {
      navigation: { ...state.navigation,  navigateToEdit: action.payload},
    });
  }
  if (action.type === NAVIGATE_TO_DISPLAY_POST) {
    return Object.assign({}, state, {
      navigation: { ...state.navigation,  navigateToDisplay: action.payload},
    });
  }
  return state;
}

export default rootReducer;