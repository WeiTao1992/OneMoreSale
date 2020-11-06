import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        flexGrow:1,
    },
    gridItem:{
        marginTop:3,
        marginBottom:1,
        width:'60%',
    },
    gridInItem:{
        marginTop:2,
        marginBottom:1,
        width:'50%',
    },
    gridImg:{
        marginTop:5,
        marginBottom:3,
        width:'40%',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title:{
        variant:'h4',
        align:'left',
    },
    carousel: {
        margin: theme.spacing(2),
    },
    item:{
        color:'textSecondary',
        variant:'body2',
        align:'left',
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(2),
    },
    avatar:{
        display: 'flex',
    '& > *': {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}
}));

export default function Account() {
    const classes = useStyles();
    return (
    <Container maxWidth="lg">
    <div>
        <Grid 
            container 
            direction="row" 
            justify="space-between" 
            alignItems="baseline"
        >
            <Link to="/">
                    Back to home
            </Link>
        </Grid>
        <Divider variant="fullWidth"/>
        <div className={classes.avatar}>
            <Avatar alt="Remy Sharp" src="grey_avatar.png" />
        </div>
        <Paper className={classes.paper}>xs=1</Paper>
        <Paper className={classes.paper}>xs=2</Paper>
        <Paper className={classes.paper}>xs=3</Paper>
    </div>

</Container>
);
}
