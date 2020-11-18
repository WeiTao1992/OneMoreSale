import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Item from './Item';

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

export default function ItemList({
  itemList,
}) {
  const classes = useStyles();

  console.log("itemList")
  console.log(itemList)

  return (
    <div className={classes.root}>
      { itemList.map(item => (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Item item={item} />
            </Paper>
          </Grid>
        </Grid>))
      }
    </div>
  );
}
