import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './resources/scss/App.scss';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

class App extends Component {
  state = {
    appName: "MERN Starter",
    nav: {
      brand: {
        path: "/",
        label: "MERN Starter"
      },
      active: "home",
      menu: {
        home: {
          path: "/",
          label: "Home"
        },
        admin: {
          path: "/admin",
          label: "Admin"
        },
      }
    }
  }

  componentDidMount = () => {
    console.log("App props", this.props);
    this.handleLocationChange(this.props.location, "PUSH");
    this.props.history.listen(this.handleLocationChange);
  }

  handleLocationChange = (location, action) => {
    const { menu } = this.state.nav;
    const active = Object.keys(menu).filter((key) => menu[key].path === location.pathname);
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

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={() => <Home nav={this.state.nav} />} />
          <Route path="/admin" component={() => <Admin nav={this.state.nav} />} />
          <Route component={() => <NotFound nav={this.state.nav} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
