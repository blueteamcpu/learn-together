import React, { Component, Fragment } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Menu,
  Segment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  loadPosts as _loadPosts,
  createPost as _createPost,
} from '../../actions/post';

import {
  getDetailGroup,
  joinGroup,
  leaveGroup,
  adminRemoveMember,
  clearState,
} from '../../reducers/groupReducer';

import GroupContext from './GroupContext';
import CreatePost from '../CreatePost';

class GroupDetail extends Component {
  // context default should become post I think
  // But for now I'm leaving it at events just to
  // Keep things rolling for myself
  constructor() {
    super();
    this.state = { context: 'events', activeItem: 'events' };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name, context: name });
    if (name === 'chat') {
      this.props.loadPosts(this.props.match.params.groupId);
    } else {
      this.props.getDetailGroup(this.props.match.params.groupId, name);
    }
  };

  componentDidMount() {
    this.props.getDetailGroup(
      this.props.match.params.groupId,
      this.state.context
    );
    this.setState({ groupId: this.props.match.params.groupId });
  }

  componentWillUnmount() {
    this.props.clearTheState();
  }

  render() {
    const {
      groupDetailed,
      history,
      match,
      joinGroup,
      leaveGroup,
      adminRemoveMember,
    } = this.props;
    const userId = this.props.user ? this.props.user.id : null;
    const { group, members } = groupDetailed;
    if (group.name === undefined) return null;
    return (
      <Container stretch="true">
        <Segment>
          <Grid columns={2} stackable>
            <Grid.Column width="3">
              <Header as="h2">{group.name}</Header>
            </Grid.Column>
            <Grid.Column width="10">
              <p>
                {group.description
                  ? group.description
                  : 'No Descript available'}
              </p>
            </Grid.Column>
          </Grid>
        </Segment>
        <TabMenu
          match={match}
          activeItem={this.state.activeItem}
          handleItemClick={this.handleItemClick}
          userId={userId}
          isMember={groupDetailed.isMember}
          isAdmin={groupDetailed.isAdmin}
          joinGroup={joinGroup}
          leaveGroup={leaveGroup}
        />
        <Segment attached="bottom">
          <GroupContext
            context={this.state.context}
            history={history}
            groupId={group.id}
            isMember={groupDetailed.isMember}
            isAdmin={groupDetailed.isAdmin}
            adminRemoveMember={adminRemoveMember}
          />
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = ({ groups, authentication }) => ({
  groupDetailed: groups.groupDetailed,
  user: authentication.user,
});

const mapDispatchToProps = dispatch => ({
  getDetailGroup(id, context) {
    dispatch(getDetailGroup(id, context));
  },
  joinGroup() {
    dispatch(joinGroup());
  },
  leaveGroup() {
    dispatch(leaveGroup());
  },
  loadPosts: id => dispatch(_loadPosts(id)),
  adminRemoveMember(userId, groupId) {
    dispatch(adminRemoveMember(userId, groupId));
  },
  clearTheState() {
    dispatch(clearState());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupDetail);

function TabMenu({
  match,
  activeItem,
  handleItemClick,
  userId,
  isAdmin,
  isMember,
  joinGroup,
  leaveGroup,
}) {
  const groupButtonColor = !isMember ? 'green' : 'red';
  const groupButtonFunction = !isMember ? joinGroup : leaveGroup;
  return (
    <div>
      <Menu attached="top" tabular>
        <Menu.Item
          name="events"
          active={activeItem === 'events'}
          onClick={handleItemClick}
        >
          Events
        </Menu.Item>
        {userId ? (
          <Menu.Item
            name="chat"
            active={activeItem === 'chat'}
            onClick={handleItemClick}
          >
            Posts
          </Menu.Item>
        ) : null}
        <Menu.Item
          name="members"
          active={activeItem === 'members'}
          onClick={handleItemClick}
        >
          Members
        </Menu.Item>
        {isAdmin ? (
          <Menu.Item
            name="update"
            active={activeItem === 'update'}
            onClick={handleItemClick}
          >
            Update
          </Menu.Item>
        ) : null}
        {userId ? (
          <Menu.Item
            position="right"
            name="memberStatus"
            active={true}
            color={groupButtonColor}
            onClick={() => groupButtonFunction()}
            content={userId && !isMember ? 'Join' : 'Abandon'}
          />
        ) : null}
      </Menu>
    </div>
  );
}

// We can add a search feature here in the content displayed from the menu
// if we want
// <Menu.Menu position='right'>
//   <Menu.Item>
//     <Input
//       transparent
//       icon={{ name: 'search', link: true }}
//       placeholder='Search users...'
//     />
//   </Menu.Item>
// </Menu.Menu>
