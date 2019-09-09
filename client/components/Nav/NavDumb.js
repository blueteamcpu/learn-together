import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Button, Sidebar, Responsive, Icon } from 'semantic-ui-react';

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
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { loggedIn, logOut } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        maxWidth={Responsive.onlyMobile.maxWidth}
        inverted={location.pathname === '/'}
      >
        <Sidebar
          as={Menu}
          animation="push"
          onHide={this.handleSidebarHide}
          visible={sidebarOpened}
          vertical
        >
          <ConnectedLeft />
        </Sidebar>

        <Sidebar.Pusher
          dimmed={sidebarOpened}
          style={sidebarOpened ? { minHeight: 160, padding: '1em 0em' } : {}}
        >
          <Menu pointing secondary size="large">
            <Menu.Item onClick={this.handleToggle}>
              <Icon name="sidebar" />
            </Menu.Item>
            <ConnectedRight mobile={true} loggedIn={loggedIn} logOut={logOut} />
          </Menu>
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

const ResponsiveNav = ({ loggedIn, logOut }) => (
  <Fragment>
    <DesktopView loggedIn={loggedIn} logOut={logOut} />
    <MobileView loggedIn={loggedIn} logOut={logOut} />
  </Fragment>
);

export default ResponsiveNav;
