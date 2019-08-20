import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import API from "../services";
import "../resources/scss/App.scss";
import Nav from "./parts/Nav";
import Messages from "./parts/Messages";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

class App extends Component {
  state = {
    appName: "MERN Starter",
    authenticated: false,
    nav: {
      brand: {
        path: "/",
        label: "MERN Starter"
      },
      active: "home",
      hasSearch: false,
      messages: { success: [], warning: [], info: [], error: [] },
      msg: null,
      menu: {
        home: {
          path: "/",
          label: "Home",
          privilege: false
        },
        admin: {
          path: "/admin",
          label: "Admin",
          privilege: true
        }
      }
    }
  };

  componentDidMount = () => {
    console.log("App props", this.props);
    this.props.history.listen(this.handleLocationChange);

    this.setState(
      {
        authenti: API.auth.isAuthorized()
      },
      () => {
        this.handleLocationChange(this.props.location, "PUSH");
        console.log("State post App mount", this.state);
      }
    );
  };

  getMessages = () => {
    //const msgs = <Messages messages={this.state.messages} />;
  };

  setMessage = (msg, type) => {};

  handleLocationChange = (location, action) => {
    console.log("Changin location...", location);
    const { menu } = this.state.nav;
    const active = Object.keys(menu).filter(
      key => menu[key].path === location.pathname
    );

    if (this.state.authenticated === true && location.pathname === "/signin") {
      this.props.history.push("/");
      return;
    }

    if (active.length > 0) {
      document.title = `${this.state.appName} - ${menu[active[0]].label}`;
      this.setState(prev => ({
        ...prev,
        nav: {
          ...prev.nav,
          active: active[0]
        }
      }));
    }
  };

  handleSignIn = (e, { email, password }) => {
    e.preventDefault();

    if (API.auth.authenticate(email, password)) {
      this.setState(
        {
          authorized: true
        },
        () => {
          this.handleLocationChange(this.props.location, "PUSH");
        }
      );
    }

    console.log("handling sign in", email, password);
  };

  handleSignOut = () => {
    API.auth.revoke();

    this.setState({
      authorized: false
    });
  };

  render() {
    const topNav = (
      <Nav
        nav={this.state.nav}
        isAuthd={this.state.authenticated}
        hasSearch={this.state.hasSearch}
        handleSignOut={this.handleSignOut}
      />
    );
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Home nav={topNav} messages={this.state.msg} />}
          />
          <Route
            path="/admin"
            component={() => <Admin nav={topNav} messages={this.state.msg} />}
          />
          <Route
            path="/signin"
            component={() => (
              <SignIn
                nav={topNav}
                handleSignIn={this.handleSignIn}
                setMsgs={this.setMessage}
                messages={this.state.msg}
              />
            )}
          />
          <Route component={() => <NotFound nav={topNav} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
