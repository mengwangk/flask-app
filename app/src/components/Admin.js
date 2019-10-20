import React,  { Component } from 'react';
import clsx from 'clsx';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';

import Topbar from './Topbar';
import { mainListItems, secondaryListItems } from './SideMenu';

const backgroundShape = require('../images/shape.svg');

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  }
});

class Admin extends Component {

  state = {
    drawerOpen: false
  };

  drawerMenuOpen = (event) => {
    this.setState({ drawerOpen: true });
  }

  drawerMenuClose = (event) => {
    this.setState({ drawerOpen: false });
  }


  componentDidMount() { }

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname
    let drawerButton;

    if (this.state.drawerOpen) {
      drawerButton = <IconButton onClick={this.drawerMenuClose} >
                        <ChevronLeftIcon />
                      </IconButton>
    } else {
      drawerButton = <IconButton onClick={this.drawerMenuOpen} >
                        <ChevronRightIcon />
                     </IconButton>
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center"> 

          </Grid>

          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !this.state.drawerOpen && classes.drawerPaperClose),
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

        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Admin));
