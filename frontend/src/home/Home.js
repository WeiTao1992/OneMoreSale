import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Greeting from "./Greeting";
import Rank from "./Rank";
import Category from "./Category";
import Price from "./Price";
import ResultPagination from "./ResultPagination";
import ItemList from "./ItemList";
import Condition from "./Condition";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useQuery } from "react-query";
import defaultQueryFn from "../util/defaultQueryFn";
import { useLayoutEffect } from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [category, setCategory] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);

  // TODO get it from props.keyword &category=${categoryContent}

  // change list to string array
  let categoryContent = "";
  category.map((s) => {
    categoryContent += s;
    categoryContent += " ";
  });

  // console.log("the category content is" + categoryContent);

  const { isLoading, isError, data } = useQuery(
    [
      "search",
      `index/search?keyword=${props.keyword}&category=${categoryContent}&minPrice=${minPrice}&maxPrice=${maxPrice}&pageNumber=${pageNumber}&sortByPrice=${sortByPrice}&sortByDate=${sortByDate}&maxPerPage=4`,
    ],
    defaultQueryFn
  );

  // console.log(
  //   `index/search?keyword=${props.keyword}&category=${categoryContent}&minPrice=${minPrice}&maxPrice=${maxPrice}&pageNumber=${pageNumber}&sortByPrice=${sortByPrice}&sortByDate=${sortByDate}&maxPerPage=4`
  // );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error!!!</span>;
  }

  console.log(data);

  let size = data.totalPosts;

  // console.log("There are   " + size);
  // change the page number
  let pageNumbers = size % 4 == 0 ? size / 4 : Math.floor(size / 4) + 1;

  console.log("The totalPages is " + pageNumbers);
  let value;
  const handleChange = (event) => {
    setPageNumber(event.target.value);
  };

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
          <Rank
            changeCurSortByPrice={setSortByPrice}
            changeCurSortByDate={setSortByDate}
          />
        </Grid>
        <Grid align="left" item xs={3}>
          <Category curCategory={category} changeCategory={setCategory} />
          <br />
          <Price curPrice={minPrice} changePrice={setMinPrice} />
          {/* <Button variant="contained" color="primary">
            ok
          </Button> */}
        </Grid>
        <Grid item xs={9}>
          <ItemList itemList={data.postList} />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid align="left" item xs={3}>
          <span>共 {size} 条</span>
        </Grid>

        <Grid item xs={3}>
          <ResultPagination
            currentPage={pageNumber}
            totalNumbers={pageNumbers}
            changePage={setPageNumber}
          />
        </Grid>
        <Grid align="right" item xs={3}>
          <span>
            前往 <TextField value={value} onChange={handleChange}/> 页
          </span>
        </Grid>
      </Grid>
    </div>
  );
}
