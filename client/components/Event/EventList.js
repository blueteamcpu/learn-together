import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react';
import { getEvents as _getEvents } from '../../actions/events';
import Event from './Event';

class EventList extends Component {

  componentDidMount() {
    this.props.getEvents();
  }


  render() {
      console.log('Event List: ', this.props.events)
    return (
        <Fragment>
            <Item.Group>
            {this.props.events.map(ev => <Event key={ev.id} ev={ev} />)}
            </Item.Group>
        </Fragment>
    )
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


export default connect(mapStateToProps, mapDispatchToProps)(EventList);
