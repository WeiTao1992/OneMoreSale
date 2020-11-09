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
import Condition from './Condition';
import TextField from '@material-ui/core/TextField';

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

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          
          <Greeting />
        </Grid>
        <Grid align="left" item xs={6}>
          <Result />
        </Grid>
        <Grid align="right" item xs={6}>
          <Rank />
        </Grid>
        <Grid align="left" item xs={3}>
          <Category />
          <br/>
          <Condition />
          <br/>
          <Price />
          <br/>
          <Postdate />
        </Grid>
        <Grid item xs={9}>
          <ItemList />
        </Grid>  
        <Grid  item xs={3}>
          
        </Grid>    
        <Grid  item xs={3}>
          <span >共 xx 条</span>    
        </Grid>
        
        <Grid  item xs={3}>
          <ResultPagination />    
        </Grid>
        <Grid  item xs={3}>
          <span >前往 <input type="text" id="fname" name="fname"/> 页</span>       
        </Grid>

      </Grid>
    </div>
  );
}
