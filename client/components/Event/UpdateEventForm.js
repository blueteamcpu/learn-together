import React, { Component, Fragment } from 'react';
import {
  Button,
  Form,
  Grid,
  Segment,
  Message
} from 'semantic-ui-react';
const { DateInput, TimeInput } = SemanticUiCalendarReact;
import Axios from 'axios';
import { updateEvent as _updateEvent, getEventDetail as _getEventDetail, deleteEvent as _deleteEvent } from '../../actions/events';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class UpdateEventForm extends Component {
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
              errors: {},
              event: {},
              submitted: false,
            }
            this.deleteEvent = this.deleteEvent.bind(this);
    }

    async componentDidMount() {
        const result = await Axios.get(`/api/events/${this.props.eventId}`);
        const event = result.data;
        this.setState({...this.state, event: event, values: event})
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
            const { data } = await Axios.put(`/api/events/${this.state.event.id}`,
                this.state.values,
                {
                    validateStatus: function(status) {
                      return status === 200 || status === 401;
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
                this.props.getEventDetail(this.props.eventId);
                this.setState({submitted: true});
            }
        } catch (error) {
            console.error(error);
        }
    };

    deleteEvent(){
        this.props.deleteEvent(this.state.event.id);
        // this.props.history.push('/dashboard');
    }


    render() {
        const { values, errors, submitted } = this.state;
        return (
            <Fragment>
            <Grid
                // textAlign="center"
                style={{ height: '85vh' }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                {submitted && (
                    <Message floating> Your event has been updated!</Message>
                )}
                <Form size="large" onSubmit={this.handleSubmit}>
                    <Segment>
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

                    <Button color="teal" fluid size="large" type="submit" style={{marginBottom: '1em'}}>
                        Update Event
                    </Button>
                    
                    <Button as={Link} to='/dashboard' size='large' fluid onClick={this.deleteEvent}>Delete Event</Button>
                    </Segment>
                </Form>
                </Grid.Column>
            </Grid>
            </Fragment>
         );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getEventDetail(eventId) {
        dispatch(_getEventDetail(eventId));
    },
    deleteEvent(eventId) {
        dispatch(_deleteEvent(eventId));
        
    }
});

export default connect(
  null,
  mapDispatchToProps
)(UpdateEventForm);

