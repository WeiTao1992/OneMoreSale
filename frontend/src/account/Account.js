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
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(2),
    },
    avatar:{
         marginTop: theme.spacing(3),
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
    },
    root1: {
        flexGrow: 1,
        maxWidth: 752,
      },
    demo: {
        backgroundColor: theme.palette.background.paper,
      },
    title: {
        margin: theme.spacing(4, 0, 2),
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
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    
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
                    <Button variant="contained">Edit</Button>
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
                <Grid container wrap="nowrap" spacing={2} direction="column" alignItems="flex-start">
                    <Grid item>
                        <FormLabel>Phone: 12315</FormLabel>
                    </Grid>    
                    <Grid item >
                        <FormLabel>Address: 12 Ave, CA, 12345</FormLabel>
                    </Grid>      
                </Grid>
            </Paper>
        </div>

        <div className={classes.root1}>
            <Grid container wrap="nowrap" alignItems="flex-start">
                <Typography variant="h6">
                    My Items
                </Typography>
            </Grid>
            <Paper className={classes.paper} variant="outlined">
        
                <Grid item xs={12} md={6}>
                    <div className={classes.demo}>
                        <List dense={dense}>
                            {generate(
                                <ListItem>
                                <Grid Container alignItems="flex-start">
                                    <Avatar alt="avatar example" src="grey_avatar.png" />
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        > 
                                        <MenuItem value={0}>Sold</MenuItem>
                                        <MenuItem value={1}>Unsold</MenuItem>
                                    </Select>
                                    <ListItemText primary="Item Name"
                                    secondary={secondary ? 'Condition' : null}/>
                                </Grid>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                                </ListItem>,
                            )}
                        </List>
                    </div>
                </Grid>

            </Paper>
        </div>
    </Container>
);
}
