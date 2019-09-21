import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  TextArea,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { postNewGroup } from '../../reducers/groupReducer';

class GroupCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        name: '',
        topic: '',
        description: '',
        zipCode: '',
        ownerId: '',
      },
      errors: {}
    };
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

    try {
      const { data } = await axios.post('/api/groups/newgroup',
					this.state.values,
					{
					  validateStatus: function(status) {
					    return status === 201 || status === 401;
					  },
					});
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
        this.props.history.push(`/groups/${data.id}`);
      }

    } catch (error) {
      console.error(error);
    }
  };

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
              Create Group
            </Header>
            <Form
              size="large"
              onSubmit={e => this.handleSubmit(e, this.props.postNewGroup)}
            >
              <Segment stacked>
                <Form.Input
                  placeholder="Group Name"
                  name="name"
                  value={values.name}
                  onChange={this.handleChange}
                />
                <Form.TextArea
                  placeholder="Description"
                  name="description"
                  value={values.description}
                  onChange={this.handleChange}
                />
                <Form.Input
                  placeholder="Topic"
                  name="topic"
                  value={values.subject}
                  onChange={this.handleChange}
                />
                <Form.Input
                  placeholder="Zip Code"
                  name="zipCode"
                  type="number"
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
  postNewGroup: group => dispatch(postNewGroup(group)),
});

export default connect(
  mapStateToProps,
  null
)(GroupCreateForm);
