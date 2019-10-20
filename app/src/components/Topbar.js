import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link as MaterialLink } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import TopMenu from './TopMenu';

const logo = require('../images/logo.svg');

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',
  },
  inline: {
    display: 'inline'
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  productLogo: {
    display: 'inline-block',
    borderLeft: `1px solid ${theme.palette.grey['A100']}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up('md')]: {
      paddingTop: '1.5em'
    }
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 10,
    [theme.breakpoints.up('md')]: {
      paddingTop: '0.8em'
    }
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  iconButton: {
    float: 'right'
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: 'auto'
  }
})

class Topbar extends Component {

  state = {
    value: 0,
    menuDrawer: false,
    menuProfile: false
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  mobileMenuOpen = (event) => {
    this.setState({ menuDrawer: true });
  }

  mobileMenuClose = (event) => {
    this.setState({ menuDrawer: false });
  }

  profileMenuOpen = (event) => {
    this.setState({ menuProfile: true });
  }

  profileMenuClose = (event) => {
    this.setState({ menuProfile: false });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  current = () => {
    if(this.props.currentPath === '/') {
      return 0
    }
    if(this.props.currentPath === '/admin') {
      return 1
    }
    if(this.props.currentPath === '/template') {
      return 2
    }
    if(this.props.currentPath === '/wizard') {
      return 3
    }
    if(this.props.currentPath === '/cards') {
      return 4
    }
  }

  menuId = 'primary-search-account-menu';

  renderMenu = (
    <Menu
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={this.menuId}
      keepMounted
      open={this.state.menuProfile}
      onClose={this.profileMenuClose}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={this.profileMenuClose}>Profile</MenuItem>
      <MenuItem onClick={this.profileMenuClose}>My account</MenuItem>
    </Menu>
  );

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
            <Grid container spacing={10} alignItems="baseline">
              <Grid item xs={12} className={classes.flex}>
                  <div className={classes.inline}>
                    <Typography variant="h6" color="inherit" noWrap>
                      <Link to='/' className={classes.link}>
                        <img width={20} src={logo} alt="" />
                        <span className={classes.tagline}>Flask React App</span>
                      </Link>
                    </Typography>
                  </div>
                  { !this.props.noTabs && (
                    <React.Fragment>
                      {/*
                      <div className={classes.productLogo}>
                        <Typography>
                          A sample web app
                        </Typography>
                      </div>
                      */}
                      <div className={classes.iconContainer}>
                        <IconButton onClick={this.mobileMenuOpen} className={classes.iconButton} color="inherit" aria-label="Menu">
                          <MenuIcon />
                        </IconButton>
                      </div>
                      <div className={classes.tabContainer}>
                        <SwipeableDrawer anchor="right" open={this.state.menuDrawer} onClose={this.mobileMenuClose} onOpen={this.mobileMenuOpen}>
                          <AppBar title="Menu" />
                          <List>
                            {TopMenu.map((item, index) => (
                              <ListItem component={item.external ? MaterialLink : Link} href={item.external ? item.pathname : null} to={item.external ? null : {pathname: item.pathname, search: this.props.location.search}} button key={item.label}>
                                <ListItemText primary={item.label} />
                              </ListItem>
                            ))}
                          </List>
                        </SwipeableDrawer>
                        <Tabs
                          value={this.current() || this.state.value}
                          indicatorColor="primary"
                          textColor="primary"
                          onChange={this.handleChange}
                        >
                          {TopMenu.map((item, index) => (
                            <Tab key={index} component={item.external ? MaterialLink : Link} href={item.external ? item.pathname : null} to={item.external ? null : {pathname: item.pathname, search: this.props.location.search}} classes={{root: classes.tabItem}} label={item.label} />
                          ))}
                        </Tabs>
                      </div>
                    </React.Fragment>
                  )}
                  
              </Grid>
            </Grid>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="user profile"
                aria-controls={this.menuId}
                aria-haspopup="true"
                color="inherit"
                onClick={this.profileMenuOpen}
                >
                <AccountCircle />
              </IconButton>
            </div>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(withStyles(styles)(Topbar))
