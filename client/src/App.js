import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import API from './api';
import './resources/scss/App.scss';
import Nav from './components/Nav';
import Messages from './components/Messages';
import Home from './pages/Home';
import Admin from './pages/Admin';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';

class App extends Component {
  state = {
    appName: "MERN Starter",
    authorized: false,
    nav: {
      brand: {
        path: "/",
        label: "MERN Starter"
      },
      active: "home",
      hasSearch: false,
      messages: { "success": [], "warning": [], "info": [], "error": [] },
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
        },
      }
    }
  }

  componentDidMount = () => {
    console.log("App props", this.props);
    API.auth.authorize();
    this.handleLocationChange(this.props.location, "PUSH");
    this.props.history.listen(this.handleLocationChange);

    this.setState({
      authorized: API.auth.isAuthorized()
    }, () => {
      console.log("State post App mount", this.state)
    });
  }

  getMessages = () => {
    const msgs = <Messages messages={this.state.messages} />
  };

  setMessage = (msg, type) => {

  };

  handleLocationChange = (location, action) => {
    const { menu } = this.state.nav;
    const active = Object.keys(menu).filter((key) => menu[key].path === location.pathname);
    console.log(location);
    if (this.state.authorized === true && location.pathname === "/signin") {
      this.props.history.push("/");
      return;
    }

    if (active.length > 0) {
      document.title = `${this.state.appName} - ${menu[active[0]].label}`;
      this.setState((prev) => ({
        ...prev,
        nav: {
          ...prev.nav,
          active: active[0],
        }
      }))
    }
  };

  handleSignIn = (e, { email, password }) => {
    e.preventDefault();

    console.log("handling sign in", email, password);
  };

  render() {
    const topNav = <Nav nav={this.state.nav} isAuthd={this.state.authorized} hasSearch={this.state.hasSearch} />;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={() => <Home nav={topNav} messages={this.state.msg} />} />
          <Route path="/admin" component={() => <Admin nav={topNav} messages={this.state.msg} />} />
          <Route path="/signin" component={() => <SignIn nav={topNav} handleSignIn={this.handleSignIn} setMsgs={this.setMessage} messages={this.state.msg} />} />
          <Route component={() => <NotFound nav={topNav} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);