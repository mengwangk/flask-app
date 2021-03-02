import { Link as MaterialLink } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ExitToApp from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
import withStyles from '@material-ui/styles/withStyles'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { Link, withRouter } from 'react-router-dom'
import { Images } from '../themes'
import TopMenu from './TopMenu'


const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white'
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
    borderLeft: `1px solid ${theme.palette.grey.A100}`,
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
  },
  dropDownMenu: {
    flexDirection: 'row-reverse'
  }
})

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles(theme => ({

}))(MenuItem)

class Topbar extends Component {
  state = {
    value: 0,
    menuDrawer: false,
    anchorElProfile: null,
    anchorElDropdown: null
  };

  handleChange = (event, value) => {
    this.setState({ value })
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ menuDrawer: true })
  }

  handleMobileMenuClose = (event) => {
    this.setState({ menuDrawer: false })
  }

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorElProfile: event.currentTarget })
  }

  handleProfileMenuClose = (event) => {
    this.setState({ anchorElProfile: null })
  }

  handleDropdownMenuOpen = (event) => {
    this.setState({ anchorElDropdown: event.currentTarget })
  }

  handleDropdownMenuClose = (event) => {
    this.setState({ anchorElDropdown: null })
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  current = () => {
    if (this.props.currentPath === '/') {
      return 0
    }
    if (this.props.currentPath === '/admin') {
      return 1
    }
    if (this.props.currentPath === '/sampleform') {
      return 2
    }
    if (this.props.currentPath === '/templatepage') {
      return 3
    }
    if (this.props.currentPath === '/sampletable') {
      return 4
    }
    if (this.props.currentPath === '/samplegrid1') {
      return 5
    }
    if (this.props.currentPath === '/samplegrid2') {
      return 6
    }
    if (this.props.currentPath === '/sampleupload') {
      return 7
    }
  }

  profileMenuId = 'account-menu';
  dropdownMenuId = 'dropdown-menu'

  render () {
    const { classes, t } = this.props
    const { anchorElProfile, anchorElDropdown, menuDrawer } = this.state

    return (
      <AppBar position='absolute' color='default' className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={10} alignItems='baseline'>
            <Grid item xs={12} className={classes.flex}>
              <div className={classes.inline}>
                <Typography variant='h6' color='inherit' noWrap>
                  <Link to='/' className={classes.link}>
                    <img width={20} src={Images.logo} alt='' />
                    <span className={classes.tagline}>{t('title')}</span>
                  </Link>
                </Typography>
              </div>
              {!this.props.noTabs && (
                <>
                  {/*
                      <div className={classes.productLogo}>
                        <Typography>
                          A sample web app
                        </Typography>
                      </div>
                  */}
                  <div className={classes.iconContainer}>
                    <IconButton onClick={this.handleMobileMenuOpen} className={classes.iconButton} color='inherit' aria-label='Menu'>
                      <MenuIcon />
                    </IconButton>
                  </div>
                  <div className={classes.tabContainer}>
                    <SwipeableDrawer anchor='right' open={menuDrawer} onClose={this.handleMobileMenuClose} onOpen={this.handleMobileMenuOpen}>
                      <AppBar title='Menu' />
                      <List>
                        {TopMenu.map((item, index) => (
                          <ListItem component={item.external ? MaterialLink : Link} href={item.external ? item.pathname : null} to={item.external ? null : { pathname: item.pathname, search: this.props.location.search }} button key={item.label}>
                            <ListItemText primary={item.label} />
                          </ListItem>
                        ))}
                      </List>
                    </SwipeableDrawer>
                    <Tabs
                      value={this.current() || this.state.value}
                      indicatorColor='primary'
                      textColor='primary'
                      onChange={this.handleChange}
                    >
                      {TopMenu.map((item, index) => (
                        <Tab key={index} component={item.external ? MaterialLink : Link} href={item.external ? item.pathname : null} to={item.external ? null : { pathname: item.pathname, search: this.props.location.search }} classes={{ root: classes.tabItem }} label={item.label} />
                      ))}

                      <Tab
                        classes={{ wrapper: classes.dropDownMenu }}
                        aria-label='dropdown'
                        aria-controls={this.dropdownMenuId}
                        aria-haspopup='true'
                        value='More'
                        label={<><ArrowDropDownIcon />Click Me</>}
                        onClick={this.handleDropdownMenuOpen}
                        // icon={<ArrowDropDownIcon onClick={this.handleDropdownMenuOpen} />}
                      />
                    </Tabs>
                  </div>
                </>
              )}

            </Grid>
          </Grid>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge='end'
              aria-label='profile'
              aria-controls={this.profileMenuId}
              aria-haspopup='true'
              color='inherit'
              onClick={this.handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </div>

          <StyledMenu
            anchorEl={anchorElProfile}
            id={this.profileMenuId}
            keepMounted
            open={Boolean(anchorElProfile)}
            onClose={this.handleProfileMenuClose}
          >
            <StyledMenuItem onClick={this.handleProfileMenuClose}>
              <ListItemIcon>
                <AccountCircle fontSize='default' />
              </ListItemIcon>
              <ListItemText primary={t('account.profile')} />
            </StyledMenuItem>

            <StyledMenuItem onClick={this.handleProfileMenuClose}>
              <ListItemIcon>
                <ExitToApp fontSize='default' />
              </ListItemIcon>
              <ListItemText primary={t('account.logout')} />
            </StyledMenuItem>
          </StyledMenu>

          <StyledMenu
            id={this.dropdownMenuId}
            open={Boolean(anchorElDropdown)}
            anchorEl={anchorElDropdown}
            onClose={this.handleDropdownMenuClose}
          >
            <StyledMenuItem
              onClick={this.handleDropdownMenuClose}
              component={Link} to={{ pathname: '/samplehooks', search: this.props.location.search }}
            >
              <ListItemIcon>
                <ArrowDropDownIcon fontSize='default' />
              </ListItemIcon>
              <ListItemText primary='React Hooks' />
            </StyledMenuItem>
            <StyledMenuItem
              onClick={this.handleDropdownMenuClose}
              component={Link}
              to={{ pathname: '/samplehooks2', search: this.props.location.search }}
            >
              <ListItemIcon>
                <ArrowDropDownIcon fontSize='default' />
              </ListItemIcon>
              <ListItemText primary='React Hooks 2' />
            </StyledMenuItem>
            <StyledMenuItem
              onClick={this.handleDropdownMenuClose}
              component={Link}
              to={{ pathname: '/sampleapp', search: this.props.location.search }}
            >
              <ListItemIcon>
                <ArrowDropDownIcon fontSize='default' />
              </ListItemIcon>
              <ListItemText primary='Sample App' />
            </StyledMenuItem>
          </StyledMenu>

        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(withStyles(styles)(withTranslation()(Topbar)))
