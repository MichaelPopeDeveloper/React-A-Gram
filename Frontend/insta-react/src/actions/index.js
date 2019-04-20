import { ADD_ARTICLE, LOGIN_USER, LOGOUT_USER, UPDATE_USER, EDIT_POST, CLEAR_EDIT_POST, DISPLAY_POST, CLEAR_DISPLAY_POST, NAVIGATE_TO_EDIT_POST, NAVIGATE_TO_DISPLAY_POST } from '../constants/action-types';

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
};

export function loginUser(payload) {
  return { type: LOGIN_USER, payload }
};

export function logoutUser(payload) {
  return { type: LOGOUT_USER, payload }
};

export function updateUser(payload) {
  return { type: UPDATE_USER, payload }
};

export function editPost(payload) {
  return { type: EDIT_POST, payload }
};

export function clearEditPost(payload) {
  return { type: CLEAR_EDIT_POST, payload }
};

export function displayPost(payload) {
  return { type: DISPLAY_POST, payload }
};

export function clearDisplayPost(payload) {
  return { type: CLEAR_DISPLAY_POST, payload }
};

export function navigateToEdit(payload) {
  return { type: NAVIGATE_TO_EDIT_POST, payload }
};

export function navigateToDisplay(payload) {
  return { type: NAVIGATE_TO_DISPLAY_POST, payload }
};