import { createStore, combineReducers } from 'redux';
import rootReducer from '../reducers/index';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { __esModule } from 'react-redux/lib/connect/connect';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

    export let store = createStore(persistedReducer);
    export let persistor = persistStore(store);
  


