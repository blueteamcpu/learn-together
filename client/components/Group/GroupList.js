import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react';

import Group from './Group';

// This will render all Groups based on context
class GroupList extends Component {
  constructor () {
    this.state = {
      filter: null,
      order: null,
      groups: [],
    };
  }

  componentDidMount() {
    // Get the relevant list of groups to be requested
  }

  render() {
    <Item.Group>
      {this.state.groups.map(g => <Group g={g} />)}
    </Item.Group>
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, null)(GroupList);
