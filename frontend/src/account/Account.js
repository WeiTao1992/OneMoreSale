import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';


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
}));

export default function Account() {
    const classes = useStyles();
    
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
                <Grid container wrap="nowrap" spacing={2} direction="column" alignItems="flex-start">
                    <Grid item>
                        <FormLabel>Email: haha@gmail.com</FormLabel>
                    </Grid>    
                    <Grid item >
                        <FormLabel>UserName: haha</FormLabel>
                    </Grid>      
                    <Grid item >
                        <FormLabel>Password: *****</FormLabel>
                    </Grid>  
                </Grid>
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

        <div className={classes.root}>
            <Grid container wrap="nowrap" alignItems="flex-start">
                <Typography variant="h6">
                    My Items
                </Typography>
            </Grid>
            <Paper className={classes.paper} variant="outlined">
                <Grid container wrap="nowrap" spacing={2} direction="column" alignItems="flex-start">
                    <Grid item>
                        <FormLabel>item1</FormLabel>
                    </Grid>    
                    <Grid item >
                        <FormLabel>item2</FormLabel>
                    </Grid>      
                </Grid>
            </Paper>
        </div>

    </Container>
);
}
