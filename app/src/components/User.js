import React, { Component } from 'react'
import PropTypes from 'prop-types'

class User extends Component {
  render () {
    const { onClick, user } = this.props
    return (
      <li
        onClick={onClick}
        style={{
          textDecoration: user.registered ? 'line-through' : 'none'
        }}
      >
        {user.name}, {user.email}
      </li>
    )
  }
}

User.propTypes = {
  onClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    registered: PropTypes.bool.isRequired
  }).isRequired
}

// User.defaultProps = {
//  user: { name: '', password: '', email: '', registered: false }
// }

export default User
