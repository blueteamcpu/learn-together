import React, { Component, Fragment } from 'react';
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
import axios from 'axios';

export default class NewTopicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
	name: '',
      },
      errors: false,
      addedSuccess: false,
    };
  }

    handleChange = (e, data) => {
    let { name, value } = data;

    this.setState(state => ({
      ...state,
      values: { ...state.values, [name]: value },
    }));
  };

  handleSubmit = async (e, updateChangedTopics) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/affiliates/topics/new',
					this.state.values,
					{
					  validateStatus: function(status) {
					    return status === 201 || status === 200;
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
        this.setState({ values: { name: '' }, addedSuccess: true});
        updateChangedTopics(data);
      }

    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { errors, values } = this.state;
    
    return (
        <Grid textAlign="center">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h3" color="teal" textAlign="center">
              Don't see a topic you like? Add a new one.
            </Header>
            {this.state.addedSuccess ? <Message color='green'>Your topic has been added!</Message> : null}
            <Form
              size="large"
              onSubmit={e => this.handleSubmit(e, this.props.updateChangedTopics)}
            >
              <Segment stacked>
                <Form.Input
                  placeholder="New Topic Name"
                  name="name"
                  value={values.name}
                  onChange={this.handleChange}
                  error={errors.name ? errors.name : null}
                />
                <Button color="teal" fluid size="large" type="submit">
                  Create New Topic
                </Button>                
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
    );
  }
}
