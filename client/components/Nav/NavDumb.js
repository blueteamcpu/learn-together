import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';

const Nav = ({ location, history, loggedIn, logOut }) => {
  return (
    <Menu borderless size="large">
      <Menu.Item header>Learn Together</Menu.Item>
      <Menu.Item
        as="a"
        active={location.pathname === '/'}
        onClick={() => history.push('/')}
      >
        Home
      </Menu.Item>
      <Menu.Item
        as="a"
        active={location.pathname === '/explore'}
        onClick={() => history.push('/explore')}
      >
        Explore
      </Menu.Item>
      <Menu.Item
        as="a"
        active={location.pathname === '/dashboard'}
        onClick={() => history.push('/dashboard')}
      >
        Dashboard
      </Menu.Item>

      <Menu.Item position="right">
        {!loggedIn && (
          <Button
            as="a"
            color={location.pathname === '/' ? 'black' : 'teal'}
            basic={location.pathname === '/'}
            onClick={() => history.push('/login')}
          >
            Log In
          </Button>
        )}
        {!loggedIn && (
          <Button
            as="a"
            color={location.pathname === '/' ? 'black' : 'teal'}
            basic={location.pathname === '/'}
            style={{ marginLeft: '0.5em' }}
            onClick={() => history.push('/signup')}
          >
            Sign Up
          </Button>
        )}
      </Menu.Item>

      {loggedIn && (
        <React.Fragment>
          <Menu.Item
            position="right"
            as="a"
            active={location.pathname === '/profile'}
            onClick={() => history.push('/profile')}
          >
            Profile
          </Menu.Item>
          <Menu.Item>
            <Button
              as="a"
              color="red"
              basic
              style={{ marginLeft: '0.5em' }}
              onClick={logOut}
            >
              Log Out
            </Button>
          </Menu.Item>
        </React.Fragment>
      )}
    </Menu>
  );
};

export default Nav;
