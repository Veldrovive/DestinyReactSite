import {combineReducers} from 'redux'

import PlayerReducer from './PlayerReducer.js'
import ClanReducer from './ClanReducer'

const reducers = combineReducers({
  player: PlayerReducer,
  clan: ClanReducer

})

export default reducers;
