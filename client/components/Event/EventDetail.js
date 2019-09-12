import React, { Component, Fragment } from 'react';
import { Container, Divider, Grid, Header, Menu, Segment} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getEvents as _getEvents } from '../../actions/events';

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
            <Fragment>
                <h1></h1>
            </Fragment>
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
