import React, { Component } from 'react';
import Routes from './Components/Routes';
import './index.css';
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

class App extends Component {
  render() {
    return (
      <div className="container-fluid" style={{ padding: '0px' }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <Routes />
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default App;
