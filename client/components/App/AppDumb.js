import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import GuestOnly from '../GuestOnly/GuestOnly';
import Home from '../Home/HomeDumb';
import LoginForm from '../LoginForm/LoginForm';
import SignUp from '../SignUpForm/SignUp';
import Nav from '../Nav/Nav';
import CreateEventForm from '../Event/CreateEventForm/CreateEventForm';
import EventDetail from '../Event/EventDetail';

// I think eventually we split these routes out into a Dashboard route
// For now, just keeping the ball rolling
import GroupDetail from '../Group/GroupDetail';
import UserProfile from '../UserProfile/UserProfile';
import LoggedInOnly from '../LoggedInOnly/LoggedInOnly';
import Explore from '../Explore/Explore';
import Dashboard from '../Dashboard/Dashboard';

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
          <Route exact path="/events/:eventId" component={EventDetail} />
          <Route
            exact
            path="/groups/:groupId/events/create"
            component={CreateEventForm}
          />
          <Route exact path="/groups/:groupId" component={GroupDetail} />
          <Route exact path="/explore" component={Explore} />
          <LoggedInOnly exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/groups/:groupId/events/create"
            component={CreateEventForm}
          />
          <GuestOnly exact={true} path="/login" component={LoginForm} />
          <GuestOnly exact={true} path="/signup" component={SignUp} />
          <LoggedInOnly exact={true} path="/profile" component={UserProfile} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
