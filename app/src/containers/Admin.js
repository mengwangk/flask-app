import React, { Component } from 'react'
import clsx from 'clsx'
import withStyles from '@material-ui/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import List from '@material-ui/core/List'
import Container from '@material-ui/core/Container'

import Topbar from '../components/Topbar'
import AdminDashboard from '../components/AdminDashboard'
import { mainListItems, secondaryListItems } from '../components/SideMenu'
import { ApplicationStyles } from '../themes'

const drawerWidth = 240

const styles = theme => ({
  ...ApplicationStyles(theme),
  rootContainer: {
    display: 'flex'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
})

class Admin extends Component {
  state = {
    drawerOpen: false
  }

  handleDrawerMenuOpen = (event) => {
    this.setState({ drawerOpen: true })
  }

  handleDrawerMenuClose = (event) => {
    this.setState({ drawerOpen: false })
  }

  componentDidMount () { }

  render () {
    const { classes } = this.props
    const currentPath = this.props.location.pathname
    let drawerButton

    if (this.state.drawerOpen) {
      drawerButton =
        <IconButton onClick={this.handleDrawerMenuClose}>
          <ChevronLeftIcon />
        </IconButton>
    } else {
      drawerButton =
        <IconButton onClick={this.handleDrawerMenuOpen}>
          <ChevronRightIcon />
        </IconButton>
    }
    return (
      <>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.rootContainer}>
          <Drawer
            variant='permanent'
            classes={{
              paper: clsx(classes.drawerPaper, !this.state.drawerOpen && classes.drawerPaperClose)
            }}
            open={this.state.drawerOpen}
          >
            <div className={classes.toolbarIcon}>
              {drawerButton}
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Drawer>

          <Container maxWidth='lg' className={classes.container}>
            <AdminDashboard />
          </Container>

        </div>
      </>
    )
  }
}

export default withRouter(withStyles(styles)(Admin))
