import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  export default function FailLogin() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

    return(
        <div className={classes.root}>
          {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}> */}
            <Alert severity="error">
              Incorrect email or password!
            </Alert>
          {/* </Snackbar> */}
        </div>
    )
  }