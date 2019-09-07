import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        email: '',
        password: '',
      },
      errors: {},
    };
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState(state => ({
      ...state,
      values: { ...state.values, [name]: value },
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { values, errors } = this.state;

    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log In
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={this.handleChange}
              />

              <Button color="teal" fluid size="large" typ="submit">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to="/signup">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginForm;
