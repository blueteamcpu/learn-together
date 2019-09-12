import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import GuestOnly from '../GuestOnly/GuestOnly';
import Home from '../Home/HomeDumb';
import LoginForm from '../LoginForm/LoginForm';
import SignUp from '../SignUpForm/SignUp';
import Nav from '../Nav/Nav';
import EventList from '../Event/EventList';
import CreateEventForm from '../CreateEventForm/CreateEventForm';
import EventDetail from '../Event/EventDetail';

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
          <Route exact path="/events" component={EventList} />
          <Route exact path="/events/:eventId" component={EventDetail} />
          <Route exact path="/groups/:groupId/events/create" component={CreateEventForm} />
          <GuestOnly exact={true} path="/login" component={LoginForm} />
          <GuestOnly exact={true} path="/signup" component={SignUp} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
