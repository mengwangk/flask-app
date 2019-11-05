import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import User from './User'
import { toggleUser, VisibilityFilters } from '../redux/actions'

class UserList extends Component {
  render () {
    const { users, toggleUser } = this.props
    // console.log(users)
    console.log(this.props.state)
    return (
      <ul>
        {users.map(user =>
          <User
            key={user.name}
            user={user}
            onClick={() => toggleUser(user)}
          />
        )}
      </ul>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    registered: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  toggleUser: PropTypes.func.isRequired
}

// UserList.defaultProps = {
//  users: [{ name: 'test', password: '123', email: 'test@abc.com', registered: true }]
// }

const getVisibleUsers = (users, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return users
    case VisibilityFilters.SHOW_COMPLETED:
      return users.filter(t => t.registered)
    case VisibilityFilters.SHOW_ACTIVE:
      return users.filter(t => !t.registered)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  users: getVisibleUsers(state.users, state.visibilityFilter),
  state: state // For development testing purpose
})

const mapDispatchToProps = (dispatch) => ({
  toggleUser: (user) => dispatch(toggleUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)
