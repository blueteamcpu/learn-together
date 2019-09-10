import React, { Component, Fragment } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  TextArea
} from 'semantic-ui-react';
const { DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput } = SemanticUiCalendarReact;
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            values: {
                name: '',
                description: '',
                day: '',
                startTime: '',
                endTime: '',
                location: '',
                zipCode: '',
                groupId: '',
              },
            }
    }

    componentDidMount() {
        this.setState({groupId: this.props.match.params.groupId})
    }

    handleChange = e => {
        const { name, value } = e.target;
        console.log(e.target)
    
        this.setState(state => ({
          ...state,
          values: { ...state.values, [name]: value },
        }));
      };

    handleSubmit = async e => {
    e.preventDefault();

    try {
        const { data } = await Axios.put('/auth/local/login', this.state.values, {
        validateStatus: function(status) {
            return status === 200 || status === 401;
        },
        });

        if (data.error) {
        this.setState(state => ({
            ...state,
            errors: { ...state.errors, ...data.error },
        }));
        } else {
        this.props.gotUser(data);
        }
    } catch (error) {
        console.error(error);
    }
    };


    render() { 
        const { values } = this.state;
        console.log('CreateEventForm Component State: ', this.state.values)
        return ( 
            <Fragment>
            <Form>
                
            </Form>
            <Grid
                textAlign="center"
                style={{ height: '85vh' }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center">
                    Create Event
                </Header>
                <Form size="large" onSubmit={this.handleSubmit}>
                    <Segment stacked>
                    <Form.Input
                        fluid
                        placeholder="Title"
                        name="title"
                        value={values.title}
                        onChange={this.handleChange}
                    />
                    <Form.TextArea
                        fluid
                        placeholder="Description"
                        name="description"
                        value={values.description}
                        onChange={this.handleChange}
                    />
                    <DateInput
                    name="date"
                    placeholder="Date"
                    value={values.day}
                    iconPosition="left"
                    onChange={this.handleChange}
                    />
                    <TimeInput
                    name="startTime"
                    placeholder="Start Time"
                    value={values.startTime}
                    iconPosition="left"
                    onChange={this.handleChange}
                    />
                    <TimeInput
                    name="endTime"
                    placeholder="End Time"
                    value={values.endTime}
                    iconPosition="left"
                    onChange={this.handleChange}
                    />
                    <Form.Input
                        fluid
                        placeholder="Location"
                        name="location"
                        value={values.location}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        fluid
                        placeholder="Zip Code"
                        name="zipCode"
                        value={values.zipCode}
                        onChange={this.handleChange}
                    />

                    <Button color="teal" fluid size="large" typ="submit">
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
 
export default CreateEventForm;