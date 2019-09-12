import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getEvents as _getEvents } from '../../actions/events';
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
            event: {}
         }
    }

    componentDidMount() {
        this.props.getEvents();
    }

    render() { 
        const event = this.props.events.filter(ev => ev.id === this.props.match.params.eventId)[0];
        console.log('MATCH EVENT', event)
        return ( 
            <Container>
                <Segment style={{ padding: '8em 0em' }} vertical>
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
                                <List.Content>{event.day}</List.Content>
                                </List.Item>
                                <List.Item>
                                <List.Icon name='clock outline' />
                                <List.Content>{event.startTime} - {event.endTime}</List.Content>
                                </List.Item>
                            </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
         );
    }
}
 

const mapStateToProps = state => ({
  events: state.events,
});

const mapDispatchToProps = (dispatch) => ({
    getEvents() {
        dispatch(_getEvents());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
