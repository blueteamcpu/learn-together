import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getEvents as _getEvents, getEventDetail as _getEventDetail, joinEvent as _joinEvent, unjoinEvent as _unjoinEvent } from '../../actions/events';
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
            activeItem: 'info',
         }
         this.rsvp = this.rsvp.bind(this);
         this.unrsvp = this.unrsvp.bind(this);
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
    unrsvp() {
        this.props.unjoinEvent(this.props.event)
        this.setState({going: false})
    }

    handleMenuClick = (e, { name }) => this.setState({ activeItem: name })

    render() { 
        const { event } = this.props;
        const { going, activeItem } = this.state;
        const attendees = event.users;
       
        return ( 
            // <Container>
            //     <Segment style={{ padding: '8em 0em' }} vertical>
            //         { event.day ? 
            //         <Grid container stackable verticalAlign="middle" textAlign='center'>
            //             <Grid.Row>
            //                 <Grid.Column>
            //                     <Header as="h3" style={{ fontSize: '2em' }}>
            //                     {event.name}
            //                     </Header>
            //                     <p style={{ fontSize: '1.33em' }}>
            //                     {event.description}
            //                     </p>
            //                 </Grid.Column>
            //             </Grid.Row>
            //             <Grid.Row>
            //                 <Grid.Column width={10}>
            //                 <List>
            //                     <List.Item>
            //                     <List.Content><Icon name='map marker alternate'/>{event.location}, {event.zipcode}</List.Content>
            //                     </List.Item>
            //                     <List.Item>
            //                     <List.Content><Icon name='calendar alternate outline'/>{event.day.slice(0,10)}</List.Content>
            //                     </List.Item>
            //                     <List.Item>
            //                     <List.Content><Icon name='clock outline'/>{event.startTime} - {event.endTime}</List.Content>
            //                     </List.Item>
            //                 </List>
            //                 </Grid.Column>
            //             </Grid.Row>
            //             <Grid.Row>
            //                 <Grid.Column width={10}>
            //                     { !going ? 
            //                     <Button onClick={this.rsvp} color='green'>I'm Going!</Button> :
            //                     <Button onClick={this.unrsvp} color='red'>Not Going</Button>
            //                     }
            //                 </Grid.Column>
            //             </Grid.Row>
            //             <Grid.Row>
            //                 <Grid.Column width={10}>
            //                     {attendees.length} People Going
            //                 </Grid.Column>
            //             </Grid.Row>
            //         </Grid> : null }
            //     </Segment>
            // </Container>

            <Fragment>
                <Container stretch='true'>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    { event.day ? 
                    <Grid container stackable verticalAlign="middle" textAlign='center'>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h3" style={{ fontSize: '2em' }}>
                                {event.name}
                                </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                {event.description}
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                        { !going ? 
                                        <Button onClick={this.rsvp} color='green'>I'm Going!</Button> :
                                        <Button onClick={this.unrsvp} color='red'>Not Going</Button>
                                    }
                        <Menu tabular attached='top'>
                            <Menu.Item name='info' active={activeItem==='info'} onClick={this.handleMenuClick}/>
                            <Menu.Item name='attendees' active={activeItem==='attendees'} onClick={this.handleMenuClick}/>
                        </Menu>
                        </Grid.Row>
                </Grid> : null }
                </Segment>
                </Container>
            </Fragment>
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
    },
    unjoinEvent(event) {
        dispatch(_unjoinEvent(event));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
