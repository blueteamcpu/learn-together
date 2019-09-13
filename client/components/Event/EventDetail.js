import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getEvents as _getEvents, getEventDetail as _getEventDetail, joinEvent as _joinEvent } from '../../actions/events';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react';

class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            going: false,
         }
         this.rsvp = this.rsvp.bind(this);
    }

    componentDidMount() {
        this.props.getEventDetail(this.props.match.params.eventId);
        
    }

    componentDidUpdate() {
        const { event } = this.props;
        const attendees = event.users;

        if (attendees && this.state.going === false) {
            const isGoing = attendees.filter(user => user.id === this.props.user.id)
            if (isGoing.length) {
                this.setState({going: true})
            }
            }
    }

    rsvp() {
        this.props.joinEvent(this.props.event)
        this.setState({going: true})
    }

    render() { 
        const { event } = this.props;
        const { going } = this.state;
        const attendees = event.users;

        
       
        return ( 
            <Container>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    { event.day ? 
                    <Grid container stackable verticalAlign="middle" >
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Header as="h3" style={{ fontSize: '2em' }}>
                                {event.name}
                                </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                {event.description}
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                            <List>
                                <List.Item>
                                <List.Icon name='map marker alternate' />
                                <List.Content>{event.location}, {event.zipcode}</List.Content>
                                </List.Item>
                                <List.Item>
                                <List.Icon name='calendar alternate outline' />
                                <List.Content>{event.day.slice(0,10)}</List.Content>
                                </List.Item>
                                <List.Item>
                                <List.Icon name='clock outline' />
                                <List.Content>{event.startTime} - {event.endTime}</List.Content>
                                </List.Item>
                            </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                { !going ? 
                                <Button onClick={this.rsvp} >I'm Going!</Button> :
                                <Button onClick={this.rsvp} >Not Going</Button>
                                }
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                {attendees.length} People Going
                            </Grid.Column>
                        </Grid.Row>
                    </Grid> : null }
                </Segment>
            </Container>
         );
    }
}
 

const mapStateToProps = state => ({
  events: state.events.allEvents,
  event: state.events.detailedEvent,
  user: state.authentication.user
});

const mapDispatchToProps = (dispatch) => ({
    getEvents() {
        dispatch(_getEvents());
    },
    getEventDetail(eventId) {
        dispatch(_getEventDetail(eventId));
    },
    joinEvent(event) {
        dispatch(_joinEvent(event));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
