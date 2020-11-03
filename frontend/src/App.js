import logo from './logo.svg';
import './App.css';
import TopBar from "./topbar/TopBar";
import OneMoreSale from './OneMoreSale';

function App() {
  return (
    <div className="App">
      <TopBar position = "sticky" />
      <OneMoreSale />
    </div>
  );
}

export default App;
