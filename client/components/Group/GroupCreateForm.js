import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Message, Segment, TextArea} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { postNewGroup } from '../../reducers/groupReducer';

class GroupCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      values: {
        name: '',
        subject: '',
        description: '',
        zipCode: '',
	ownerId: '',
      },
    };
  }

  componentDidMount() {
    this.setState({ ownerId: this.props.user.id});
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState(state => ({
      ...state,
      values: { ...state.values, [name]: value },
    }));
  };

  handleSubmit = async (e, postNewGroup) => {
    e.preventDefault();

    const { data } = await axios.post('/group/newgroup', this.state.values)
	  .then(data => postNewGroup(this.state))
	  .catch(e => {
	    this.setState(state => ({ ...state,
				      errors: { ...state.errors, ...data.error }}));
	  });
  }

  render() { 
    const { values } = this.state;
    return ( 
      <Fragment>
        <Grid
          textAlign="center"
          style={{ height: '85vh' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Create Event
            </Header>
            <Form size="large" onSubmit={(e) => this.handleSubmit(e, this.props.postNewGroup)}>
              <Segment stacked>
                <Form.Input
                  fluid
                  placeholder="Group Name"
                  name="name"
                  value={values.name}
                  onChange={this.handleChange}
                />
                <Form.TextArea
                  fluid
                  placeholder="Description"
                  name="description"
                  value={values.description}
                  onChange={this.handleChange}
                />
                <Form.TextArea
                  fluid
                  placeholder="Subject"
                  name="subject"
                  value={values.subject}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  placeholder="Zip Code"
                  name="zipCode"
                  value={values.zipCode}
                  onChange={this.handleChange}
                />
                <Button color="teal" fluid size="large" type="submit">
                  Create
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({
  user: authentication.user,
});

const mapDispatchToProps = dispatch => ({
  postNewGroup: (group) => dispatch(postNewGroup(group))
});

export default connect(mapStateToProps, null)(GroupCreateForm);
