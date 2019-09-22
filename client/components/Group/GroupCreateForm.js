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

import { postNewGroup } from '../../reducers/groupReducer';

class GroupCreateForm extends Component {
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
      errors: false
    };
  }

  handleChange = (e, data) => {
    let { name, value } = data;

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
      console.log(data);
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

  componentDidMount() {
    axios.get('/api/affiliates/topics/all')
      .then(response => {
        this.setState({ topicsList: response.data});
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
                  type="number" max={99999}
                  value={values.zipCode}
                  onChange={this.handleChange}
                  error={errors.zipcode ? errors.zipcode : null}
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
