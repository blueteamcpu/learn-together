import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoggedInOnly = ({ exact, path, component: Comp, loggedIn, loading }) => {
  return (
    <Route
      exact={exact === undefined ? true : exact}
      path={path}
      render={props => {
        if (loading || loggedIn) {
          return <Comp key={loggedIn} {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default LoggedInOnly;
