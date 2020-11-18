import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import greeting from './greeting.jpg';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Item({
  item,
}) {
  const classes = useStyles();
  console.log(item);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <img src={greeting} alt="Logo" height="80" width="100"/>
        </Grid>
        <Grid item xs={5}>

        <Link to={`/item/${item.postId}`}>
          <p> Item Name: {item.postTitle} </p>
          </Link>
          <p> Condition: {item.postCondition}</p>
          <p> Location: {item.postAddress} </p>
          <p> Seller: {item.postOwner} </p>
          <p> Category: {item.postCategory}  </p>   
        </Grid>
        <Grid item xs={2}>
          <p> Price: {item.postPrice} </p>
        </Grid>
        <Grid item xs={2}>
          <p> Status: {item.postStatus} </p>
        </Grid>
      </Grid>
    </div>
  );
}
