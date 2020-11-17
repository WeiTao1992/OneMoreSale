import React, { useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Greeting from './Greeting';
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
import { useLayoutEffect } from "react";

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
  const [keyword, setKeyWord] = useState(""); 
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [category, setCategory] = useState("");
  const [pageNumber, setPageNumber] = useState(2);
  const [maxPerPage, setMaxPerPage] = useState(4);
  
  // TODO get it from props.keyword &pageNumber=${pageNumber} &category=${category}&maxPerPage=4

  const { isLoading, isError, data } 
  = useQuery(['search', `index/search?keyword=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}&pageNumber=${pageNumber}&maxPerPage=4`], defaultQueryFn);
  
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error!!!</span>
  }

  console.log(data)
  //  get the size
  let size = 100; // TODO: get size from backend API
  console.log("The length is " + data.length);
  
  // change the page number
  let pageNumbers = size % 4 == 0 ? size / 4 : size / 4 + 1; 
 
  console.log("The totalPages is " + size);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>        
          <Greeting />
        </Grid>
        <Grid align="left" item xs={6}>
          <p> {size} results of keyword </p>
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
          <ItemList itemList = {data}/>
        </Grid>  
        <Grid  item xs={3}>
          
        </Grid>    
        <Grid  align="left"  item xs={3}>
          <span >共 {size} 条</span>    
        </Grid>
        
        <Grid  item xs={3}>
          {/* FIXME: Everytime load a new page, pagination goes to page 1? */}
          <ResultPagination totalNumbers = {pageNumbers} changePage={setPageNumber}/>    
        </Grid>
        <Grid  align="right" item xs={3}>
          <span >前往 <input type="text" id="fname" name="fname"/> 页</span>       
        </Grid>

      </Grid>
    </div>
  );
}
