import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import TopBar from "./topbar/TopBar";
import OneMoreSale from './OneMoreSale';

function App() {
  return (
    <div className="App">
      <Router>
        <TopBar position = "sticky" />
        <OneMoreSale />
      </Router>
    </div>
  );
}

export default App;
