import React, { Component, Fragment } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
const { DateInput, TimeInput } = SemanticUiCalendarReact;
import { Link } from 'react-router-dom';
import Axios from 'axios';

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
                zipcode: '',
                groupId: '',
              },
              errors: {}
            }
    }

    componentDidMount() {
        this.setState({values: {groupId: this.props.match.params.groupId}});
    }

    handleChange = (e, {name, value}) => {
        this.setState(state => ({
        ...state,
        values: { ...state.values, [name]: value },
        }));
      };

    handleSubmit = async e => {
        e.preventDefault();

        try {
            const { data } = await Axios.post('/api/events/newevent',
                this.state.values,
                {
                    validateStatus: function(status) {
                      return status === 200 || status === 401;
                    },
                });

                console.log('DATA', data)
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
                this.props.createEvent(data);
            }
        } catch (error) {
            console.error(error);
        }
    };


    render() {
        const { values, errors } = this.state;
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
                <Form size="large" onSubmit={this.handleSubmit}>
                    <Segment stacked>
                    <Form.Input
                        fluid
                        placeholder="Event Name"
                        name="name"
                        value={values.name}
                        onChange={this.handleChange}
                        error={errors.name ? errors.name : null}
                    />
                    <Form.TextArea
                        fluid
                        placeholder="Description"
                        name="description"
                        value={values.description}
                        onChange={this.handleChange}
                        error={errors.description ? errors.description : null}
                    />
                    <DateInput
                    name="day"
                    placeholder="Date"
                    value={values.day}
                    iconPosition="left"
                    onChange={this.handleChange}
                    error={errors.day ? errors.day : null}
                    />
                    <TimeInput
                    name="startTime"
                    placeholder="Start Time"
                    value={values.startTime}
                    iconPosition="left"
                    onChange={this.handleChange}
                    error={errors.startTime ? errors.startTime : null}
                    />
                    <TimeInput
                    name="endTime"
                    placeholder="End Time"
                    value={values.endTime}
                    iconPosition="left"
                    onChange={this.handleChange}
                    error={errors.endTime ? errors.endTime : null}
                    />
                    <Form.Input
                        fluid
                        placeholder="Location"
                        name="location"
                        value={values.location}
                        onChange={this.handleChange}
                        error={errors.location ? errors.location : null}
                    />
                    <Form.Input
                        fluid
                        placeholder="Zip Code"
                        name="zipcode"
                        value={values.zipcode}
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

export default CreateEventForm;
