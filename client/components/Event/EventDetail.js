import React, { Component } from 'react';
import { Container, Divider, Grid, Header, Menu, Segment} from 'semantic-ui-react';
import { connect } from 'react-redux';

class EventDetail extends Component {
  state = {}


  render() {
    return (
      <Container>
        
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
});

export default connect(mapStateToProps, null)(EventDetail);
