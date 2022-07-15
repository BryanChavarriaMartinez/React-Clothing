import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// Wa have created a logger Middleware but we are using the redux one

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
    process.env.NODE_ENV === "development" && logger, 
    thunk,
].filter(Boolean);
// When we are in development it is going to console log the process, in production it doesn't

const composeEnhancer =
  (process.env.NODE_ENV === "development" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
// This compose enhancer is to habilitate a chrome extension called Redux dev tools on the browser which helps to see the timing of all the processes in the page

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);