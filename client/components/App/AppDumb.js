import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/HomeDumb';
import LoginForm from '../LoginForm/LoginForm';
import SignUp from '../SignUpForm/SignUp';

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    );
  }
}

export default App;
