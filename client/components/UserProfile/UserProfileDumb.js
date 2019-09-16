import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
} from 'semantic-ui-react';
import axios from 'axios';

class UserProfileDumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        zipcode: 0,
        password: '',
        CNPass: '',
        NPass: '',
      },
      loading: true,
      changePassword: false,
      submitted: false,
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._changePassword = this._changePassword.bind(this);
    this._changeAndClear = this._changeAndClear.bind(this);
  }

  componentDidMount() {
    if (this.props.user.id) {
      const user = this.props.user;
      this.setState(state => ({
        ...state,
        values: {
          ...state.values,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          zipcode: user.zipcode,
        },
        loading: false,
      }));
    }
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState(state => ({
      ...state,
      values: { ...state.values, [name]: value },
    }));
  }

  makeSubmitted = (password = false) => {
    let changer = _ => ({ submitted: true });

    if (password) {
      changer = state => ({
        ...state,
        values: {
          ...state.values,
          password: '',
          NPass: '',
          CNPass: '',
        },
        changePassword: false,
        error: '',
      });
    }

    this.setState(changer, function() {
      setTimeout(() => {
        this.setState({ submitted: false });
      }, 3000);
    });
  };

  async handleSubmit(ev) {
    ev.preventDefault();

    try {
      const {
        firstName,
        lastName,
        email,
        username,
        zipcode,
        password,
        NPass,
      } = this.state.values;

      if (this.state.changePassword) {
        const passwords = { password, NPass };
        await axios.put('/user/updateUserPass', passwords);
        this.makeSubmitted(true);
      } else {
        this.props.updateUser(firstName, lastName, username, email, zipcode);
        this.makeSubmitted();
      }
    } catch (err) {
      console.error(err);
      this.setState({
        error:
          'Unable to change information make sure all required inputs are filled in.',
      });
    }
  }

  _changePassword() {
    this.setState(state => ({
      ...state,
      changePassword: !state.changePassword,
    }));
  }

  _changeAndClear() {
    this.setState(state => ({
      ...state,
      changePassword: !state.changePassword,
      values: { ...state.values, password: '', NPass: '', CNPass: '' },
    }));
  }

  render() {
    if (this.state.loading === true) {
      return null;
    } else {
      const { submitted, error, values, changePassword } = this.state;
      const {
        firstName,
        lastName,
        email,
        username,
        zipcode,
        password,
        CNPass,
        NPass,
      } = values;

      return (
        <div>
          {submitted && (
            <Message floating> Your information has been updated!</Message>
          )}

          {error && (
            <Message negative>
              <Message.Header>
                There seems to have been an error changing your information.
              </Message.Header>
              <p>Check your current password field to see if it's correct.</p>
            </Message>
          )}

          {changePassword === false ? (
            <Grid
              textAlign="center"
              style={{ height: '85vh' }}
              verticalAlign="middle"
            >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center">
                  User Details
                </Header>
                <Form size="large" onSubmit={this.handleSubmit}>
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="First Name (optional)"
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={this.handleChange}
                    />

                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Last Name (optional)"
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={this.handleChange}
                    />

                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Username"
                      type="text"
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                      required={true}
                    />

                    <Form.Input
                      fluid
                      icon="inbox"
                      iconPosition="left"
                      placeholder="Email"
                      type="text"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      required={true}
                    />

                    <Form.Input
                      fluid
                      icon="globe"
                      iconPosition="left"
                      placeholder="Zip"
                      type="integer"
                      name="zipcode"
                      value={zipcode}
                      onChange={this.handleChange}
                      required={true}
                    />

                    <Form.Field>
                      <Button secondary fluid size="large" type="submit">
                        Submit
                      </Button>
                    </Form.Field>
                    
                    <Form.Field>
                      <Button
                        primary
                        color="teal"
                        fluid
                        size="large"
                        onClick={this._changePassword}
                      >
                        Change Password
                      </Button>
                    </Form.Field>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          ) : (
            <Grid
              textAlign="center"
              style={{ height: '85vh' }}
              verticalAlign="middle"
            >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center">
                  Update Password
                </Header>
                <Form size="large" onSubmit={this.handleSubmit}>
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user secret"
                      iconPosition="left"
                      placeholder="Current Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />

                    <Form.Input
                      fluid
                      icon="user secret"
                      iconPosition="left"
                      placeholder="New Password"
                      type="password"
                      name="NPass"
                      value={NPass}
                      onChange={this.handleChange}
                    />

                    <Form.Input
                      fluid
                      icon="user secret"
                      iconPosition="left"
                      placeholder="Confirm New Password"
                      type="password"
                      name="CNPass"
                      value={CNPass}
                      onChange={this.handleChange}
                    />

                    <Form.Field>
                      <Button
                        primary
                        color="teal"
                        fluid
                        size="large"
                        type="submit"
                        disabled={
                          !(NPass && NPass.length >= 8 && NPass === CNPass)
                        }
                      >
                        Change Password
                      </Button>
                    </Form.Field>

                    <Form.Field>
                      <Button
                        secondary
                        fluid
                        size="large"
                        onClick={this._changeAndClear}
                      >
                        Cancel
                      </Button>
                    </Form.Field>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          )}
        </div>
      );
    }
  }
}

export default UserProfileDumb;
