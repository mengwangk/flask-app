import React, { Component, Suspense } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { blue, indigo } from '@material-ui/core/colors'
import './App.css'
import Routes from './routes'
import { Images } from './themes'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
})

// loading component for suspense fallback
const Loader = () => (
  <div className='App'>
    <img src={Images.logo} className='App-logo' alt='logo' />
    <div>Loading...</div>
  </div>
)

class App extends Component {
  render () {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<Loader />}>
            <Routes />
          </Suspense>
        </ThemeProvider>
      </div>
    )
  }
}

export default App
