import {createStore, combineReducers, applyMiddleware} from 'redux'
import { routerReducer } from 'react-router-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {loadState, saveState} from './localStorage.js'
import throttle from 'lodash/throttle'

import reducers from './reducers/index.js'

const fullReducer = combineReducers({
  reducers,
  routing: routerReducer
})

const middleware = applyMiddleware(thunk, logger(), promise())

const persistedState = loadState();

const store = createStore(fullReducer, persistedState, middleware);

store.subscribe(throttle(() => {
  saveState({
    reducers: store.getState().reducers
  })
}, 1000))

export default store;

//Use this to manually save the state
export function storeState(){
  saveState({
    reducers: store.getState().reducers
  })
}
