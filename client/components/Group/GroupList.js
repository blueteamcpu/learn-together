import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react';

import Group from './Group';

// This will render all Groups based on context
class GroupList extends Component {
  render() {
    <Item.Group>
      {this.state.groups.map(g => <Group g={g} />)}
    </Item.Group>
  }
}

const mapStateToProps = ({ groups }) => ({
  groups: groups.groupList,
});

// I just put the dispatch here for now, I'm not sure if we need it
// Just consider it boilerplate
const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, null)(GroupList);
