import React, { Component, Fragment } from 'react';
import { Container, Divider, Grid, Header, Menu, Segment} from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getDetailGroup } from '../../actions/group';

class GroupDetail extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {
    this.props.getDetailGroup(this.props.history.params.groupId);
  }

  render({ groupDetailed }) {
    return (
      <Container>
        <LeftMenu />
        <Segment placeholder>
          <Grid columns={2} relaxed='very'>
            <Grid.Column>
              <Header as='h2'>{groupDetailed.name}</Header>
            </Grid.Column>
            <Grid.Column>
              <p>{groupDetailed.description ? groupDetailed.description : "No Descript available"}</p>
            </Grid.Column>
          </Grid>
          <Divider vertical></Divider>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = ({ groups }) => ({
  groupDetailed: groups.groupDetailed,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailGroup: (id) => getDetailGroup(dispatch),
});

export default connect(mapStateToProps, null)(GroupDetail);

function LeftMenu () {
  return (
    <Segment>
      <Menu>
        <Menu.Item
          name='members'
          active={activeItem === 'members'}
          onClick={this.handleItemClick}
        >
          Members
        </Menu.Item>

        <Menu.Item
          name='events'
          active={activeItem === 'events'}
          onClick={this.handleItemClick}
        >
          Events
        </Menu.Item>

        <Menu.Item
          name='activity'
          active={activeItem === 'activity'}
          onClick={this.handleItemClick}
        >
          Activity
        </Menu.Item>

        <Menu.Item
          name='chat'
          active={activeItem === 'chat'}
          onClick={this.handleItemClick}
        >
          Chat
        </Menu.Item>
      </Menu>
    </Segment>
  );
}
