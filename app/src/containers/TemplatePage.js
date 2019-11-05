import React, { Component } from 'react'
import withStyles from '@material-ui/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Topbar from '../components/Topbar'

const backgroundShape = require('../images/shape.svg')

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'auto',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing(2)}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  actionButton: {
    textTransform: 'uppercase',
    margin: theme.spacing(1),
    width: 152
  },
  box: {
    marginBottom: 40,
    height: 65
  }
})

class TemplatePage extends Component {
  state = {};

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
            <Grid
              spacing={4}
              alignItems='center'
              justify='center'
              container
              className={classes.grid}
            >

              <Grid item xs={12} md={12}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography
                      style={{
                        textTransform: 'uppercase'
                      }}
                      color='secondary'
                      gutterBottom
                    >
                      Template page
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      Line 1
                      <br />
                      Line 2
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Button color='primary' variant='contained' className={classes.actionButton}>
                      Learn more
                    </Button>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </>
    )
  }
}

export default withRouter(withStyles(styles)(TemplatePage))
