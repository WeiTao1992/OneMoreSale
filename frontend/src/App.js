import React from 'react';
import './App.css';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import Box from '@material-ui/core/Box';
import defaultQueryFn from "./util/defaultQueryFn";
import {BrowserRouter as Router} from "react-router-dom";
import TopBar from "./topbar/TopBar";
import OneMoreSale from './OneMoreSale';

 // provide the default query function to your app with defaultConfig
 const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

function App() {
  const [keyword, setKeyword] = React.useState("");

  const handleKeywordChange = (keyword) => {
    setKeyword(keyword)
  }

  return (
    <div className="App">
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Router>
          <TopBar position = "sticky" keyword={keyword} onKeywordChange={handleKeywordChange} />
          <Box m={6} />
          <OneMoreSale keyword={keyword}/>
        </Router>
      </ReactQueryCacheProvider>
    </div>
  );
}

export default App;
