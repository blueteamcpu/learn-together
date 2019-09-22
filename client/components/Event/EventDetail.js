import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import UpdateEventForm from './UpdateEventForm';
import Comments from '../Comments'
import { Link } from 'react-router-dom';
import { getEvents as _getEvents, getEventDetail as _getEventDetail, joinEvent as _joinEvent, unjoinEvent as _unjoinEvent } from '../../actions/events';
import { getMyGroups as _getMyGroups } from '../../reducers/groupReducer'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
  } from 'semantic-ui-react';

class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            going: null,
            activeItem: 'info',
            event: {},
         }
         this.rsvp = this.rsvp.bind(this);
         this.unrsvp = this.unrsvp.bind(this);
         
    }

    componentDidMount() {
        this.props.getEventDetail(this.props.match.params.eventId);
        this.props.getMyGroups();
    }
    
    componentDidUpdate() {
        const { event } = this.props;
        const attendees = event.users;
        
        if (attendees && this.state.going === null) {
            const isGoing = attendees.find(user => user.id === this.props.user.id);
            if (isGoing) {
                this.setState({going: true});
            }
            }
    }

    rsvp() {
        this.props.joinEvent(this.props.event);
        this.setState({going: true});
    }
    unrsvp() {
        this.props.unjoinEvent(this.props.event);
        this.setState({going: false});
    }

    

    handleMenuClick = (e, { name }) => this.setState({ activeItem: name })

    render() { 
        const { event, user } = this.props;
        const { going, activeItem } = this.state;
        const attendees = event.users;

        let member = false;

        this.props.groups.forEach(group => {
            if (group.id === event.groupId) {
                member = true
            }
            });

        return ( 

            <Fragment>
                <Container stretch='true'>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    { event.day ? 
                    <Fragment>
                    <Grid container stackable verticalAlign="middle" textAlign='center'>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h3" style={{ fontSize: '2em' }}>
                                {event.name}
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                        <Menu tabular attached='top'>
                            <Menu.Item name='info' active={activeItem==='info'} onClick={this.handleMenuClick}/>
                            <Menu.Item name='attendees' active={activeItem==='attendees'} onClick={this.handleMenuClick}>Attendees ({attendees.length})</Menu.Item>
                            {
                            event.hostId === user.id ? 
                            <Menu.Item name='edit' active={activeItem==='edit'} onClick={this.handleMenuClick}>Edit Event</Menu.Item>
                            : null 
                            }
                            <Menu.Menu position='right'>
                                { member ? 
                                <Menu.Item>
                                    { !going ? 
                                        <Button onClick={this.rsvp} color='red'>Not Going</Button> :
                                        <Button onClick={this.unrsvp} color='green'>I'm Going!</Button>
                                    }
                                </Menu.Item> :
                                <Menu.Item>
                                    You must be a group member to join this event.
                                </Menu.Item>
                                }
                            </Menu.Menu>
                        </Menu>
                        </Grid.Row>
                        </Grid>
                        { activeItem === 'info' ? 
                                <Fragment>
                                <Header sub>Group</Header>
                                <Link to={`/groups/${event.groupId}`}>{event.group.name}</Link>
                                <Header sub>Description</Header>
                                {event.description}
                                <br/>
                                <br/>
                                <List>
                                <List.Item>
                                <List.Content><Icon name='map marker alternate'/>{event.location}, {event.zipcode}</List.Content>
                                </List.Item>
                                <List.Item>
                                <List.Content><Icon name='calendar alternate outline'/>{event.day.slice(0,10)}</List.Content>
                                </List.Item>
                                <List.Item>
                                <List.Content><Icon name='clock outline'/>{event.startTime} - {event.endTime}</List.Content>
                                </List.Item>
                                </List> 
                                </Fragment>
                                : 
                                (activeItem === 'attendees' ? 
                                <List>
                                    {attendees.map(person => 
                                        <List.Item key={person.id}>
                                            <List.Content><Image avatar src={person.imageURL} />{person.username} {event.hostId === person.id ? '(Host)' : null}</List.Content>
                                        </List.Item>
                                        )
                                    }
                                </List> 
                                : 
                                        <UpdateEventForm eventId={event.id} history={this.props.history}/>
                                )
                        }
                       </Fragment>
                 : null }
                 <br />
                 <br />
                <Comments/>
                </Segment>
                </Container>
            </Fragment>
         );
    }
}
 

const mapStateToProps = state => ({
  events: state.events.allEvents,
  event: state.events.detailedEvent,
  user: state.authentication.user,
  groups: state.groups.groupList
});

const mapDispatchToProps = (dispatch) => ({
    getEventDetail(eventId) {
        dispatch(_getEventDetail(eventId));
    },
    joinEvent(event) {
        dispatch(_joinEvent(event));
    },
    unjoinEvent(event) {
        dispatch(_unjoinEvent(event));
    },
    getMyGroups() {
        dispatch(_getMyGroups());
    } 
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
