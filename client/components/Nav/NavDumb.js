import React, { Component } from 'react';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { fixed } = this.state;
        return ( 
            
                <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size="large"
                >
                <Container>
                    <Menu.Item as="a" active>
                    Home
                    </Menu.Item>
                    <Menu.Item as="a">Explore</Menu.Item>
                    <Menu.Item position="right">
                    <Button as="a" inverted={!fixed}>
                        Log in
                    </Button>
                    <Button
                        as="a"
                        inverted={!fixed}
                        primary={fixed}
                        style={{ marginLeft: '0.5em' }}
                    >
                        Sign Up
                    </Button>
                    </Menu.Item>
                </Container>
                </Menu>
                
            
         );
    }
}
 
export default Nav;