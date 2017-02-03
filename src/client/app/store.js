import {createStore, combineReducers, applyMiddleware} from 'redux'
import { routerReducer } from 'react-router-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducers from './reducers/index.js'

const fullReducer = combineReducers({
  reducers,
  routing: routerReducer
})

const middleware = applyMiddleware(thunk, logger(), promise())

const store = createStore(fullReducer, middleware);

export default store;
