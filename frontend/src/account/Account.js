import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    list: {
        width: "100%",
        backgroundColor: theme.palette.background.default,
    },

    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(2),
    },
    paper1: {
        margin: theme.spacing(2),
    },
    avatar:{
         marginTop: theme.spacing(3),
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
    },
    title: {
        margin: theme.spacing(4, 0, 2),
      },
    select: {
        margin: theme.spacing(16),
    },
}));

function generate(element) {
    return [0, 1].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

export default function Account() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
    <Container maxWidth="lg">
        <Grid container direction="row" justify="space-between" alignItems="baseline">
            <Link to="/">Back to Home</Link>
        </Grid>
        <Divider variant="fullWidth"/>

        <div className={classes.avatar}>
            <Avatar alt="avatar example" src="grey_avatar.png" />   
                <Typography variant="subtitle1">
                 UserName
                </Typography>
        </div>

        <div className={classes.root}>
            <Grid container wrap="nowrap" alignItems="flex-start">
                <Typography variant="h6">
                    Login and Security
                </Typography>
            </Grid>
            <Paper className={classes.paper} variant="outlined">
                <Grid container direction="row" justify="space-between">
                    <Typography>Email:haha@gmail.com</Typography>
                    <Button variant="contained" onClick={handleClickOpen}>
                        Edit
                    </Button>
                    <Dialog fullWidth='true' open={open} onClose={handleClose}>
                        <DialogTitle id="form-dialog-title">Login</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Email Address"
                                    type="email"
                                    fullWidth/>
                            </DialogContent>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="UserName"
                                    type="text"
                                    fullWidth/>
                            </DialogContent>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Password"
                                    type="text"
                                    fullWidth/>
                            </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={handleClose} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                <div align="left">
                    <FormLabel>UserName: haha</FormLabel>
                </div>
                <br></br>
                <div align="left">
                    <FormLabel>Password: *****</FormLabel>
                </div>  
            </Paper>
        </div>

        <div className={classes.root}>
            <Grid container wrap="nowrap" alignItems="flex-start">
                <Typography variant="h6">
                    Address
                </Typography>
            </Grid>
            <Paper className={classes.paper} variant="outlined">
                <Grid container direction="row" justify="space-between">
                    <FormLabel>Phone: 123-456-7890</FormLabel>
                    <Button variant="contained">
                        Edit
                    </Button> 
                    <Dialog fullWidth='true' open={open} onClose={handleClose}>
                        <DialogTitle id="form-dialog-title">Address</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Phone"
                                    type="number"
                                    fullWidth/>
                            </DialogContent>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Address"
                                    type="text"
                                    fullWidth/>
                            </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={handleClose} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>      
                </Grid> 
                <div align="left">
                    <FormLabel>Address: 123 Ave, CA, 12345</FormLabel>   
                </div> 
            </Paper>
        </div>

        <div className={classes.root}>
            <Grid container wrap="nowrap" alignItems="flex-start">
                <Typography variant="h6">
                    My Items
                </Typography>
            </Grid> 

            <Paper className={classes.paper} variant="outlined">
                <List className={classes.list}>{generate(
                    <ListItem>
                        <Paper className={classes.paper1} elevation={0}>
                            <img src="grey_item.png" />
                        </Paper>

                        <ListItemText primary="Item Name" secondary="condition"/>
                        <ListItemText primary="Price"/>
                        
                        <Select className={classes.select}>
                            <MenuItem value={0}>Sold</MenuItem>
                            <MenuItem value={1}>Unsold</MenuItem>
                        </Select>
                        
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>

                    </ListItem>)}
                </List>
            </Paper>
        </div>

    </Container>
);
}
