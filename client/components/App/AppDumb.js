import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/HomeDumb';
import LoginForm from '../LoginForm/LoginFormDumb';

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginForm} />
      </Switch>
    );
  }
}

export default App;
