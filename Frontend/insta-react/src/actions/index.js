import { ADD_ARTICLE, LOGIN_USER, LOGOUT_USER, UPDATE_USER } from '../constants/action-types';

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