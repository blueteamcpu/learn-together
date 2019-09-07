import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        firstName: '',
        lastName: '',
        imageURL: '',
        zipcode: '',
        username: '',
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

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const { data } = await Axios.post(
        '/auth/local/signup',
        this.state.values,
        {
          validateStatus: function(status) {
            return status === 200 || status === 401;
          },
        }
      );

      if (data.error) {
        this.setState(state => ({
          ...state,
          errors: { ...state.errors, ...data.error },
        }));
      } else if (data.errors) {
        this.setState(state => ({
          ...state,
          errors: { ...state.errors, ...data.errors },
        }));
      } else {
        this.props.gotUser(data);
      }
    } catch (error) {
      console.error(error);
    }
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
            Sign Up
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="First name (optional)"
              name="firstName"
              error={errors.firstName ? errors.firstName : null}
              value={values.firstName}
              onChange={this.handleChange}
            />

            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Last name (optional)"
              name="lastName"
              error={errors.lastName ? errors.lastName : null}
              value={values.lastName}
              onChange={this.handleChange}
            />

            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Profile photo URL (optional)"
              name="imageURL"
              error={errors.imageURL ? errors.imageURL : null}
              value={values.imageURL}
              onChange={this.handleChange}
            />

            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              required={true}
              type="number"
              placeholder="Zip Code"
              name="zipcode"
              error={errors.zipcode ? errors.zipcode : null}
              value={values.zipcode}
              onChange={this.handleChange}
            />

            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              required={true}
              placeholder="Username"
              name="username"
              error={errors.username ? errors.username : null}
              value={values.username}
              onChange={this.handleChange}
            />

            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              required={true}
              placeholder="Email"
              name="email"
              error={errors.email ? errors.email : null}
              value={values.email}
              onChange={this.handleChange}
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              required={true}
              placeholder="Password"
              type="password"
              name="password"
              error={errors.password ? errors.password : null}
              value={values.password}
              onChange={this.handleChange}
            />

            <Button color="teal" fluid size="large" typ="submit">
              Sign up
            </Button>
          </Form>
          <Message>
            Have an account? <Link to="/login">Log In</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SignUpForm;
