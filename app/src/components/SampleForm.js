import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import {withRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik } from "formik";

import Topbar from './Topbar';

const backgroundShape = require('../images/shape.svg');

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
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`
  },
  actionButton: {
    textTransform: 'uppercase',
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
 
});

const CreateUserForm = (props) => {
    return (
     <form onSubmit={() => {}}>
       <TextField
         id="name"
         name="name"
         label="Name"
         fullWidth
  
       />
       <TextField
         id="email"
         name="email"
         label="Email"
         fullWidth
       />
       <TextField
         id="password"
         name="password"
         label="Password"
         fullWidth
         type="password"
       />
       <TextField
         id="confirmPassword"
         name="confirmPassword"
         label="Confirm Password"
         fullWidth
         type="password"
       />
       <Button
         type="submit"
         fullWidth
         color='primary' 
         variant="contained"
       >
         Submit
       </Button>
     </form>
   );
};

class SampleForm extends Component {

  state = {};

  componentDidMount() {}

  render() {
    const {classes} = this.props;
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline/>
        <Topbar currentPath={currentPath}/>
        <div className={classes.root}>
          <Grid container justify="center">
            <Paper elevation={1} className={classes.paper}>
            <h1>Form</h1>
            <Formik
                render={props => <CreateUserForm {...props} />}
            />
            </Paper>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(SampleForm));
