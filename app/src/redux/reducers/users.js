
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        { ...action.user, registered: true }
      ]
    case 'TOGGLE_USER':
      return state.map(user =>
        (user.name === action.user.name)
          ? { ...user, registered: !user.registered }
          : user
      )
    default:
      return state
  }
}

export default usersReducer
