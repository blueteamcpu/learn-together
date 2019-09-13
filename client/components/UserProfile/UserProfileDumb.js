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
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                zipcode: 0,
                password: '',
                CNPass: '',
                NPass: '',
                loading: true,
                changePassword: false,
                submitted: false,
                error: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._changePassword = this._changePassword.bind(this);
        this._changeAndClear = this._changeAndClear.bind(this);
    }

    componentDidMount(){
      if (this.props.userInfo){
        const user = this.props.userInfo
        this.setState({firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, zipcode: user.zipcode, loading: false});
      }
    }

    handleChange(ev){
        const {name, value} = ev.target;
        this.setState({[name]: value});
    }

    async handleSubmit(ev){
      try {
        ev.preventDefault();
        const {firstName, lastName, email, username, zipcode, password, NPass, changePassword} = this.state;
        if (changePassword) {
          const passwords = {password, NPass}
          await axios.put('/user/updateUserPass', passwords);
          this.setState({submitted: true})
        } else {
          this.props.updateUser(firstName, lastName, username, email, zipcode);
          this.setState({submitted: true});
        }
      } catch (err){
        this.setState({error: 'Unable to change information make sure all required inputs are filled in.'});
      }
    }

    _changePassword(){
      const {changePassword} = this.state;
      this.setState({changePassword: !changePassword})
    }

    _changeAndClear(){
      const {changePassword} = this.state;
      this.setState({changePassword: !changePassword, password: '', NPass: '', CNPass: ''})
    }

    render(){
        if (this.state.loading === true){
          return null
        } else {
        const {firstName, lastName, email, username, zipcode, changePassword, password, CNPass, NPass, submitted, error} = this.state;
        return (
          <div>
            { submitted ? <Message floating> Your information has been updated!</Message> :
              null
            }
            {error ? <Message negative>
                        <Message.Header>There seems to have been an error changing your information.</Message.Header>
                          <p>Check your current password field to see if it's correct.</p>
                     </Message> :
                        null

            }
            { !changePassword ?
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
                        icon = "user"
                        iconPosition = "left"
                        placeholder = "First Name"
                        type = "text"
                        name = "firstName"
                        value = {firstName}
                        onChange = {this.handleChange}
                    />

                    <Form.Input
                        fluid
                        icon = "user"
                        iconPosition = "left"
                        placeholder = "Last Name"
                        type = "text"
                        name = "lastName"
                        value = {lastName}
                        onChange = {this.handleChange}
                    />

                    <Form.Input
                        fluid
                        icon = "user"
                        iconPosition = "left"
                        placeholder = "Username"
                        type = "text"
                        name = "username"
                        value = {username}
                        onChange = {this.handleChange}
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
                    />

                    <Form.Input
                        fluid
                        icon = "globe"
                        iconPosition = "left"
                        placeholder = "Zip"
                        type = "integer"
                        name = "zip"
                        value = {zipcode}
                        onChange = {this.handleChange}
                    />
                    <Button secondary fluid size = "large" onClick = {this._changePassword}> Change Password </Button>
                    <Button primary color = "teal" fluid size="large" type="submit">
                      Change Details
                    </Button>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid> :
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
                                icon = "user secret"
                                iconPosition = "left"
                                placeholder = "Current Password"
                                type = "password"
                                name = "password"
                                value = {password}
                                onChange = {this.handleChange}
                      />

                      <Form.Input
                                fluid
                                icon = "user secret"
                                iconPosition = "left"
                                placeholder = "New Password"
                                type = "password"
                                name = "NPass"
                                value = {NPass}
                                onChange = {this.handleChange}
                      />

                      <Form.Input
                                fluid
                                icon = "user secret"
                                iconPosition = "left"
                                placeholder = "Confirm New Password"
                                type = "password"
                                name = "CNPass"
                                value = {CNPass}
                                onChange = {this.handleChange}
                      />
                      <Button secondary fluid size = "large" onClick = {this._changeAndClear}>Cancel</Button>
                      {NPass && NPass.length >= 8 && NPass === CNPass ?
                    <Button primary color = "teal" fluid size="large" type="submit">
                      Change Password
                    </Button> :
                    <Button disabled>
                      Change Password
                    </Button>}
              </Segment>
              </Form>
            </Grid.Column>
            </Grid>
                    }
          </div>
          );
        }
    }
}

export default UserProfileDumb;
