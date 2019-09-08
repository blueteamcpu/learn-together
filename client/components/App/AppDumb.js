import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/HomeDumb';
import LoginForm from '../LoginForm/LoginForm';
import SignUp from '../SignUpForm/SignUp';
import Nav from '../Nav/Nav';

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <Fragment>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
