import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoggedInOnly = ({ exact, path, component: Comp, loggedIn }) => {
  return (
    <Route
      exact={exact === undefined ? true : exact}
      path={path}
      render={props => {
        if (loggedIn) {
            return <Comp {...props} />;
        } else {
            return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default LoggedInOnly;
