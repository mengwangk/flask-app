import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../redux/actions'
import Button from '@material-ui/core/Button'

class UserButton extends Component {
  render () {
    const { active, children, onClick } = this.props
    return (
      <Button
        color='primary'
        variant='contained'
        onClick={onClick}
        disabled={active}
        style={{
          marginLeft: '4px'
        }}
      >
        {children}
      </Button>
    )
  }
}

UserButton.propTypes = {
  filter: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
  active: props.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, props) => ({
  onClick: () => dispatch(setVisibilityFilter(props.filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserButton)
