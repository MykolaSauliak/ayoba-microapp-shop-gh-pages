
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';

import rootReducer from '../features'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(
  persistedReducer, 
    compose(
      applyMiddleware(thunk),
    ),
  )
  let persistor = persistStore(store)
  return { store, persistor }
}