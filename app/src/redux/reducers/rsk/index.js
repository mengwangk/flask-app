// export * from './visibilityFilter'
// export * from './todos'

import { combineReducers } from 'redux'
import users from './users'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  users: users.reducer,
  visibilityFilter: visibilityFilter.reducer
})
