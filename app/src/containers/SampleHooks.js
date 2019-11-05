import React, { Component } from 'react'
import withStyles from '@material-ui/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Topbar from '../components/Topbar'
import Todos3 from '../components/hooks/Todos3'
import { ApplicationStyles } from '../themes'

const styles = theme => ({
  ...ApplicationStyles(theme),
  paper: {
    marginTop: theme.spacing(1),
    width: 'calc(100% - 20px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`
  }
})

class SampleHooks extends Component {
  state = {}

  componentDidMount () {}

  render () {
    const { classes } = this.props
    const currentPath = this.props.location.pathname
    return (
      <>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify='center'>
            <Paper elevation={1} className={classes.paper}>
              <Todos3 />
            </Paper>
          </Grid>
        </div>
      </>
    )
  }
}

export default withRouter(withStyles(styles)(SampleHooks))
