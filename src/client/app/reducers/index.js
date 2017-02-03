import {combineReducers} from 'redux'

import PlayerReducer from './PlayerReducer.js'
import ClanReducer from './ClanReducer'
import MeReducer from './MeReducer'
import NotificationsReducer from './NotificationsReducer'

const reducers = combineReducers({
  player: PlayerReducer,
  clan: ClanReducer,
  me: MeReducer,
  notifications: NotificationsReducer,
})

export default reducers;
