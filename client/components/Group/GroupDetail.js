import React, { Component, Fragment } from 'react';
import { Container, Divider, Grid, Header, Menu, Segment} from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getDetailGroup } from '../../reducers/groupReducer';

import GroupContext from './GroupContext';

class GroupDetail extends Component {
  // context default should become post I think
  // But for now I'm leaving it at members just to
  // Keep things rolling for myself
  state = { context: 'members',
            activeItem: 'members',
          };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name, context: name });
    this.props.getDetailGroup(this.props.match.params.groupId, name);
  };

  componentDidMount() {
    this.props.getDetailGroup(this.props.match.params.groupId, this.state.context);
    this.setState({ groupId: this.props.match.params.groupId});
  }

  compontentDidUpdate() {
    const { context } = this.state;
  }

  render() {
    const { groupDetailed, history } = this.props;
    const { group, members } = groupDetailed;
    if(group.name === undefined) return null;
    return (
      <Container stretch='true'>
        <Segment>
          <Grid columns={2} stackable>
            <Grid.Column width='3'>
              <Header as='h2'>{group.name}</Header>
            </Grid.Column>
            <Grid.Column width='10'>
              <p>{group.description ? group.description : "No Descript available"}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <TabMenu activeItem={this.state.activeItem} handleItemClick={this.handleItemClick}/>
        <Segment attached='bottom'>
          <GroupContext context={this.state.context} history={history}/>
        </Segment>        
      </Container>
    );
  }
}

const mapStateToProps = ({ groups }) => ({
  groupDetailed: groups.groupDetailed,
});

const mapDispatchToProps = (dispatch) => ({
  getDetailGroup(id, context) { dispatch(getDetailGroup(id, context)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail);

function TabMenu ({ activeItem, handleItemClick}) {
  return (
    <div>
      <Menu attached='top' tabular>
        <Menu.Item
          name='events'
          active={activeItem === 'events'}
          onClick={handleItemClick}
        >
          Events
        </Menu.Item>

        <Menu.Item
          name='chat'
          active={activeItem === 'chat'}
          onClick={handleItemClick}
        >
          Chat
        </Menu.Item>
        
        <Menu.Item
          name='members'
          active={activeItem === 'members'}
          onClick={handleItemClick}
        >
          Members
        </Menu.Item>
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
