import React, { useState } from "react";
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
import Button from '@material-ui/core/Button';
import { useQuery } from 'react-query'
import defaultQueryFn from '../util/defaultQueryFn';

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



export default function Home(props) {
  const classes = useStyles();
  const [itemList, setItemList] = useState([]);
  
  // TODO get it from props.keyword
  const fakeKeyword = "macbook";
  const minPrice = 0;
  const maxPrice = 1000;
  const category = "computer";

  //get the data -> itemList, get keyword from topbar
  const { isLoading, isError, data } 
  = useQuery(['search', `index/search?keyword=${fakeKeyword}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}`], defaultQueryFn);

  console.log(data)
  // get the size
  // const size = data.length;
  
  // change the page number
  // const pageNumber = size % 4 == 0 ? size / 4 : size / 4 + 1; 
  // if(size % 4 == 0) {
  //   pageNumber = size / 4;
  // } else {
  //   pageNumber = size / 4 + 1;
  // }
   
  // set a page key value pair to each Item 
  // TODO: how to get the index of data 
  // const index = 0;
  // setItemList(data.map((item) => {
  //   index = index + 1;
  //   return {
  //     ...item,
  //     page: index / 4,
  //   }
  // }));

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
          <Price />
          <br/>
          <Postdate />
          <br/>
          <div>
          <Button variant="contained" color="primary">
            ok
          </Button>
          </div>
        </Grid>
        <Grid item xs={9}>
          <ItemList />
        </Grid>  
        <Grid  item xs={3}>
          
        </Grid>    
        <Grid  align="left"  item xs={3}>
          <span >共 xx 条</span>    
        </Grid>
        
        <Grid  item xs={3}>
          <ResultPagination />    
        </Grid>
        <Grid  align="right" item xs={3}>
          <span >前往 <input type="text" id="fname" name="fname"/> 页</span>       
        </Grid>

      </Grid>
    </div>
  );
}
