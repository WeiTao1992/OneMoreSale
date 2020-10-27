import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function OneMoreSale() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/postedit">PostEdit</Link>
            </li>
            <li>
              <Link to="/signin">SignIn</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/item">Item</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/postedit">
            <PostEdit />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/item">
            <Item />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Main() {
  return <h2>Main</h2>;
}

function Account() {
  return <h2>Account</h2>;
}

function PostEdit() {
  return <h2>PostEdit</h2>;
}

function SignIn() {
  return <h2>SignIn</h2>;
}

function Register() {
  return <h2>Register</h2>;
}

function Item() {
  return <h2>Item</h2>;
}