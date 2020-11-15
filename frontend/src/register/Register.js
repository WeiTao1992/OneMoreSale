import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useMutation, useQueryCache } from 'react-query';
import { register } from '../util/apis';
import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        OneMoreSale
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [mutate, { isLoading }] = useMutation(register); 
  
  const [username, setUsername] = React.useState();
  const [setAddress, setaddress] = React.useState();
  const [setPhone, setphone] = React.useState();
  const [account, setAccount] = React.useState({
    email : "", 
    password : "",
    firstName : "",
    lastName : ""
  });

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleAddressChange = (event) => {
    setaddress(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setphone(event.target.value);
  };

  const handleAccountChange = (prop) => (event) => {
    setAccount({ ...account, [prop]: event.target.value });
  };

  const queryCache = useQueryCache();
  const history = useHistory();

  //const [failRegister, setFailRegister] = React.useState(false);
  const onRegisterClick = async() => {
    try {
      const data = await mutate({username, setAddress, setPhone, account})
      console.log(data);
      if (data !== undefined) {
        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  }  

  if (isLoading) {
    console.log("Registering...")
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register Your Account
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                value = {account.email}
                autoFocus
                onChange = {handleAccountChange('email')}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="UserName"
                value = {username}
                autoFocus
                onChange = {handleUsernameChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value = {account.password}
                onChange = {handleAccountChange('password')}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="firstname"
                label="FirstName"
                type="firstname"
                id="firstname"
                value = {account.firstName}
                onChange = {handleAccountChange('firstName')}
                
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="lastname"
                label="LastName"
                type="lastname"
                id="lastname"
                value = {account.lastName}
                onChange = {handleAccountChange('lastName')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="phone"
                name="phone"
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                autoFocus
                value = {setPhone}
                onChange = {handlePhoneChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="address"
                name="address"
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                autoFocus
                value = {setAddress}
                onChange = {handleAddressChange}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color = "primary"
            className={classes.submit}
            onClick={onRegisterClick}
          >
            SignUp
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/Login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
