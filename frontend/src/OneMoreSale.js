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
import RoomList from './chat/RoomList';
import ChatRoom from './chat/ChatRoom';

export default function OneMoreSale(props) {
  return (
    <div>
      <Switch>
        <Route path="/roomlist">
          <RoomList />
        </Route>
        <Route path="/chatroom/:room">
          <ChatRoom />
        </Route>
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
          <Home keyword={props.keyword}/>
        </Route>
      </Switch>
    </div>
  );
}