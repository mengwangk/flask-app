import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Topbar from '../components/Topbar'
import DataTable from '../components/DataTable'
import { ApplicationStyles } from '../themes'

const styles = theme => ({
  ...ApplicationStyles(theme),
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`
  }
})

class SampleTable extends Component {
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
              <h1>Data Table</h1>
              <DataTable />
            </Paper>
          </Grid>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SampleTable)))
