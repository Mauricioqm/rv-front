import { configureStore }from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import appApi from './services/appApi';

// Persistencia
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

// Reducers

const reducers = combineReducers({
  user: userSlice,
  [appApi.reducerPath]: appApi.reducer, 
});

const persisConfig = {
  key: 'root',
  storage,
  blackList: [appApi.reducerPath],
};

const persistedReducer = persistReducer(persisConfig, reducers);

// creando el store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, appApi.middleware]
});

export default store;