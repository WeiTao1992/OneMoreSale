import React from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./home/Home";
import Account from "./account/Account";
import Item from "./item/Item";
import Register from "./register/Register";
import Login from "./login/Login";
import Sell from "./sell/Sell";

export default function OneMoreSale() {
  return (
    <div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/sell">Sell</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/item/3">Item</Link>
          </li>
        </ul>
      </nav> */}

      <Switch>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/sell">
          <Sell />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/item/:id">
          <Item />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}