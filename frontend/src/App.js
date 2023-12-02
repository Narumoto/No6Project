import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import Login from './components/Login';
import Upload from './components/Upload';
import Search from './components/Search';
import Annotation from './components/Annotation';
import Forum from './components/Forum';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      user: {}
    };
  }

  componentDidMount() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      this.setState({
        isAuthenticated: true,
        user: decoded
      });
    }
  }

  setUser = (decoded) => {
    this.setState({
      isAuthenticated: true,
      user: decoded
    });
  }

  logoutUser = () => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    this.setState({
      isAuthenticated: false,
      user: {}
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/annotation" component={Annotation} />
            <Route exact path="/forum" component={Forum} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
