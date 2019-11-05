
import { combineReducers } from 'redux'
import users from './users'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  users,
  visibilityFilter
})
