import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import GuestOnly from '../GuestOnly/GuestOnly';
import Home from '../Home/HomeDumb';
import LoginForm from '../LoginForm/LoginForm';
import SignUp from '../SignUpForm/SignUp';
import Nav from '../Nav/Nav';
import CreateEventForm from '../CreateEventForm/CreateEventFormDumb'

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
          <Route exact path="/groups/:groupId/events/create" component={CreateEventForm} />
          <GuestOnly exact={true} path="/login" component={LoginForm} />
          <GuestOnly exact={true} path="/signup" component={SignUp} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
