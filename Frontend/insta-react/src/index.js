import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './store/index';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
// import store from './store/index';
import rootReducer from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist'
import { createStore, combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from 'redux-persist/integration/react'

const persistedReducer = persistReducer({
  key: 'root',
  storage
}, rootReducer);
const store = createStore(persistedReducer);

ReactDOM.render(
  <App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
