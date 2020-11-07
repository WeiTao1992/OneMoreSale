import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Greeting from './Greeting';
import Result from './Result';
import Rank from './Rank';
import Category from './Category';
import Price from './Price';
import Postdate from './Postdate';
import ResultPagination from './ResultPagination';
import ItemList from './ItemList';

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

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          
          <Greeting />
        </Grid>
        <Grid item xs={6}>
          <Result />
        </Grid>
        <Grid item xs={6}>
          <Rank />
        </Grid>
        <Grid item xs={3}>
          <Category />
        </Grid>
        <Grid item xs={9}>
          <ItemList />
        </Grid>
        <Grid item xs={3}>
          <Price />
        </Grid>
        <Grid item xs={9}>
          <ResultPagination />
        </Grid>
        <Grid item xs={3}>
          <Postdate />
        </Grid>
      </Grid>
    </div>
  );
}
