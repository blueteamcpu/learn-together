import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

class UserProfileDumb extends Component {

    constructor(props) {
        super(props);
        this.state = {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                zipcode: 0,
                loading: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
      if (this.props.userInfo){
        await this.props.getUser();
        const user = this.props.userInfo
        this.setState({firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, zipcode: user.zipcode, loading: false});
      }
    }

    async componentDidUpdate(prevProps){
      if (this.props.userInfo.email !== prevProps.userInfo.email){
        await this.props.getUser();
        const user = this.props.userInfo;
        this.setState({firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, zipcode: user.zipcode, loading: false});
      }
    }

    handleChange(ev){
        const {name, value} = ev.target;
        this.setState({[name]: value});
    }

    handleSubmit(ev){
      ev.preventDefault();
      const {firstName, lastName, email, username, zipcode} = this.state;
      this.props.updateUser(firstName, lastName, username, email, zipcode);
    }

    render(){
        if (this.state.loading === true){
          return null
        } else {
        const {firstName, lastName, email, username, zipcode} = this.state;
        return (
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

                    <Button color="teal" fluid size="large" type="submit">
                      Change Details
                    </Button>

                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          );
        }
    }
}

export default UserProfileDumb;
