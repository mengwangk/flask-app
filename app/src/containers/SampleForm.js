import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/styles/withStyles'
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import InputAdornment from '@material-ui/core/InputAdornment'
import NameIcon from '@material-ui/icons/SupervisorAccount'
import LockIcon from '@material-ui/icons/Lock'
import EmailIcon from '@material-ui/icons/Email'

import Topbar from '../components/Topbar'
import { ApplicationStyles } from '../themes'
import UserButton from '../components/UserButton'
import UserList from '../components/UserList'
import { addUser, VisibilityFilters } from '../redux/actions'

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

const validationSchema = Yup.object({
  name: Yup.string('Enter a name')
    .required('Name is required'),
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('')
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
  confirmPassword: Yup.string('Enter your password')
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match')
})

const CreateUserForm = (props) => {
  const {
    values: { name, email, password, confirmPassword },
    errors,
    handleSubmit,
    handleChange,
    isValid,
    classes
  } = props

  // console.table(props)

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id='name'
        name='name'
        label='Name'
        fullWidth
        helperText={errors.name ? errors.name : ''}
        error={Boolean(errors.name)}
        value={name}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <NameIcon />
            </InputAdornment>
          )
        }}
      />
      <TextField
        id='email'
        name='email'
        label='Email'
        fullWidth
        helperText={errors.email ? errors.email : ''}
        error={Boolean(errors.email)}
        value={email}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <EmailIcon />
            </InputAdornment>
          )
        }}
      />
      <TextField
        id='password'
        name='password'
        label='Password'
        fullWidth
        type='password'
        helperText={errors.password ? errors.password : ''}
        error={Boolean(errors.password)}
        value={password}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <LockIcon />
            </InputAdornment>
          )
        }}
      />
      <TextField
        id='confirmPassword'
        name='confirmPassword'
        label='Confirm Password'
        fullWidth
        type='password'
        helperText={errors.confirmPassword ? errors.confirmPassword : ''}
        error={Boolean(errors.confirmPassword)}
        value={confirmPassword}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <LockIcon />
            </InputAdornment>
          )
        }}
      />
      <Button
        type='submit'
        color='primary'
        variant='contained'
        className={classes.actionButton}
        disabled={!isValid}
      >
         Submit
      </Button>
    </form>
  )
}

class SampleForm extends Component {
  handleSubmit = (values, actions) => {
    // console.log(values)
    // console.log(actions)
    this.props.dispatch(addUser({ ...values, registered: false }))
  }

  componentDidMount () {}

  render () {
    const { classes } = this.props
    const currentPath = this.props.location.pathname
    const values = { name: 'testuser1', email: 'test@gmail.com', password: 'Rdc12345$', confirmPassword: 'Rdc12345$' }
    return (
      <>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify='center'>
            <Paper elevation={1} className={classes.paper}>
              <h1>User Registration</h1>
              <Formik
                render={props => <CreateUserForm {...props} classes={classes} />}
                onSubmit={this.handleSubmit}
                initialValues={values}
                validationSchema={validationSchema}
              />
              <div>
                <UserList />
              </div>
              <div>
                <UserButton filter={VisibilityFilters.SHOW_ALL}>
                  All
                </UserButton>
                <UserButton filter={VisibilityFilters.SHOW_ACTIVE}>
                  Active
                </UserButton>
                <UserButton filter={VisibilityFilters.SHOW_COMPLETED}>
                  Completed
                </UserButton>
              </div>

            </Paper>
          </Grid>
        </div>
      </>
    )
  }
}

// const mapStateToProps = state => {
//   return {

//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {

//   }
// }

export default connect()(withRouter(withStyles(styles)(SampleForm)))
