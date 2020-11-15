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
  return (
    <div className="App">
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Router>
          <TopBar position = "sticky" />
          <Box m={6} />
          <OneMoreSale />
        </Router>
      </ReactQueryCacheProvider>
    </div>
  );
}

export default App;
