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
  Select,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { getDetailGroup } from '../../reducers/groupReducer';

class UpdateGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        name: '',
        topicId: '',
        description: '',
        zipCode: '',
        ownerId: '',
      },
      errors: {},
      updated: false,
    };
  }

  handleChange = (e, data) => {
    let { name, value } = data;

    this.setState(state => ({
      ...state,
      values: { ...state.values, [name]: value },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/groups/update/${this.props.groups.group.id}`,
					this.state.values,
					{
					  validateStatus: function(status) {
					    return status === 202 || status === 401;
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
        this.setState({ updated: true });
        this.props.getDetailGroup(this.props.groups.group.id);
      }

    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    axios.get('/api/affiliates/topics/all')
      .then(response => {
        const values = this.props.groups.group;
        this.setState({ topicsList: response.data, values: { name: values.name,
                                                             topicId: values.topicId,
                                                             description: values.description,
                                                             zipCode: values.zipcode,
                                                             ownerId: values.ownerId,
                                                           }});
      })
      .catch(e => this.setState({errors: {...this.state.errors, e}}));
    axios.get('/api/affiliates/courses/all')
      .then(response => this.setState({ courseList: response.data}))
      .catch(e => this.setState({errors: {...this.state.errors, e}}));
  }

  render() {
    const { errors, values } = this.state;
    return (
      <Fragment>
        { this.state.updated ? <Message floating color='green'>Your event has been updated!</Message>
          : null
        }
        <Grid
          textAlign="center"
          style={{ height: '85vh' }}
          verticalAlign="top"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Update Group
            </Header>
            <Form
              size="large"
              onSubmit={e => this.handleSubmit(e)}
            >
              <Segment stacked>
                <Form.Input
                  placeholder="Group Name"
                  name="name"
                  value={values.name}
                  onChange={this.handleChange}
                  error={errors.name ? errors.name : null}
                />
                <Form.TextArea
                  placeholder="Description"
                  name="description"
                  value={values.description}
                  onChange={this.handleChange}
                  error={errors.description ? errors.description : null}
                />
                <Form.Field>
                  {
                    this.state.topicsList ?
                      <Select
                        placeholder="Topic"
                        name="topicId"
                        defaultValue={values.topicId ? values.topicId : null}
                        onChange={this.handleChange}
                        options={this.state.topicsList.map(({id, name}) => ({
                          key: id,
                          value: id,
                          text: name,
                        }))}
                      />
                    : null
                  }
                </Form.Field>
                <Form.Input
                  placeholder="Zip Code"
                  name="zipCode"
                  type="number"
                  value={values.zipCode}
                  onChange={this.handleChange}
                  error={errors.zipcode ? errors.zipcode : null}
                />
                <Button color="teal" fluid size="large" type="submit">
                  Update
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>

      </Fragment>
    );
  }
}

const mapStateToProps = ({ authentication, groups }) => ({
  user: authentication.user,
  groups: groups.groupDetailed,
});

const mapDispatchToProps = dispatch => ({
  getDetailGroup: id => dispatch(getDetailGroup(id, 'update')),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateGroupForm);
