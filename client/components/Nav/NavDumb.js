import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Button, Responsive, Dropdown } from 'semantic-ui-react';

const NavLeft = ({ history, location }) => (
  <Fragment>
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
  </Fragment>
);

const ConnectedLeft = withRouter(NavLeft);

const NavRight = ({ history, location, loggedIn, logOut, mobile }) => (
  <Menu.Menu position="right">
    {!loggedIn && (
      <Fragment>
        <Menu.Item>
          <Button
            as="a"
            color="black"
            basic
            onClick={() => history.push('/login')}
          >
            Log In
          </Button>
          <Button
            as="a"
            color="black"
            basic
            style={mobile ? { marginLeft: '0.3em' } : { marginLeft: '0.5em' }}
            onClick={() => history.push('/signup')}
          >
            Sign Up
          </Button>
        </Menu.Item>
      </Fragment>
    )}

    {loggedIn && (
      <Fragment>
        <Menu.Item
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
            style={mobile ? { marginLeft: '0.3em' } : { marginLeft: '0.5em' }}
            onClick={logOut}
          >
            Log Out
          </Button>
        </Menu.Item>
      </Fragment>
    )}
  </Menu.Menu>
);

const ConnectedRight = withRouter(NavRight);

const Nav = ({ loggedIn, logOut }) => {
  return (
    <Menu borderless size="large">
      <ConnectedLeft />
      <ConnectedRight loggedIn={loggedIn} logOut={logOut} />
    </Menu>
  );
};

const DesktopView = ({ loggedIn, logOut }) => {
  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Nav loggedIn={loggedIn} logOut={logOut} />
    </Responsive>
  );
};

class MobileView extends Component {
  state = {
    options: ['Learn Together', 'Home', 'Explore', 'Dashboard', 'Profile'],
  };

  makeOptions = option => ({
    key: option,
    text: option,
    value: option,
    disabled: option === 'Learn Together',
  });

  handleChange = ev => {
    const text = ev.target.innerText;

    if (text === 'Home') {
      this.props.history.push('/');
    } else {
      this.props.history.push('/' + text.toLowerCase());
    }
  };

  determineDefault = () => {
    let pathname = this.props.location.pathname;

    if (pathname === '/') {
      return 'Home';
    }

    pathname = pathname[1].toUpperCase() + pathname.slice(2);

    if (this.state.options.includes(pathname)) {
      return pathname;
    } else {
      return 'Learn Together';
    }
  };

  render() {
    const { loggedIn, logOut } = this.props;

    return (
      <Responsive
        maxWidth={Responsive.onlyMobile.maxWidth}
        inverted={location.pathname === '/' ? 'true' : 'false'}
      >
        <Menu pointing secondary size="large">
          <Menu.Item>
            <Dropdown
              defaultValue={this.determineDefault()}
              options={this.state.options.map(this.makeOptions)}
              onChange={this.handleChange}
            />
          </Menu.Item>
          <ConnectedRight mobile={true} loggedIn={loggedIn} logOut={logOut} />
        </Menu>
      </Responsive>
    );
  }
}

const ConnectedMobile = withRouter(MobileView);

const ResponsiveNav = ({ loggedIn, logOut }) => (
  <Fragment>
    <DesktopView loggedIn={loggedIn} logOut={logOut} />
    <ConnectedMobile loggedIn={loggedIn} logOut={logOut} />
  </Fragment>
);

export default ResponsiveNav;
