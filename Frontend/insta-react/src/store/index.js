import { createStore, combineReducers } from 'redux';
import rootReducer from '../reducers/index';

const store = createStore(rootReducer);
store.subscribe(() => console.log('state', store.getState()));

export default store;
  


