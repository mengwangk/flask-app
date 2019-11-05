import React, { Component } from 'react'

class SampleApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: true
    }
  }

    toggleShow = () => {
      this.setState(state => ({ isShow: !state.isShow }))
    };

    render () {
      const greeting = 'Welcome to React'
      return (
        <div>
          {this.state.isShow ? <Greeting greeting={greeting} /> : null}
          <Button onClick={this.toggleShow} />
        </div>
      )
    }
}
const Button = ({ onClick }) => (
  <button onClick={onClick} type='button'>
        Toggle Show
  </button>
)
const Greeting = ({ greeting }) => <h1>{greeting}</h1>

export default SampleApp
