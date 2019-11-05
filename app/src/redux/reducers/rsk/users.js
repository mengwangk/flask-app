import { createSlice, createSelector } from 'redux-starter-kit'
import { visibilityFilter } from './visibilityFilter'
import { VisibilityFilters } from '../../actions'

const { getVisibilityFilter } = visibilityFilter.selectors

const addUser = (state, action) => [
  ...state,
  { ...action.user, registered: true }
]

const toggleUser = (state, action) => state.map(user =>
  (user.name === action.user.name)
    ? { ...user, registered: !user.registered }
    : user
)

const users = createSlice({
  slice: 'users',
  initialState: [],
  reducers: {
    add: addUser,
    toggle: toggleUser
  }
})

users.selectors.getVisibleUsers = createSelector(
  [getVisibilityFilter, users.selectors.getUsers],
  (visibilityFilter, users) => {
    switch (visibilityFilter) {
      case VisibilityFilters.SHOW_ALL:
        return users
      case VisibilityFilters.SHOW_COMPLETED:
        return users.filter(t => t.completed)
      case VisibilityFilters.SHOW_ACTIVE:
        return users.filter(t => !t.completed)
      default:
        throw new Error('Unknown filter: ' + visibilityFilter)
    }
  }
)

export { users }
