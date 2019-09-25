import React, { Component, Fragment } from 'react';
import {
  Container,
  Grid,
  Item,
  List,
  Image,
  Segment,
  Button,
  Form,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPost as _createPost } from '../../actions/post';
import UpdateGroupForm from './UpdateGroupForm';
import { adminChangeAdmin } from '../../reducers/groupReducer';

class GroupContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cTitle: '',
      cDescription: '',
      error: '',
      showPostForm: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const sendObj = {};
    sendObj.title = this.state.cTitle;
    sendObj.description = this.state.cDescription;
    sendObj.userId = this.props.user.id;
    sendObj.groupId = this.props.groupId;
    const post = this.props.createPost(sendObj);
    if (post) {
      this.setState({ cTitle: '', cDescription: '', showPostForm: false });
    }
  }

  render() {
    const { cTitle, cDescription, showPostForm } = this.state;
    const { handleChange, handleSubmit } = this;
    const {
      context,
      history,
      groupId,
      isMember,
      isAdmin,
      adminRemoveMember,
      adminChangeAdmin,
      groupDetailed,
      posts,
    } = this.props;
    const listRender = context === 'chat' ? posts : groupDetailed[context];
    if (listRender === undefined || context === undefined) return null;

    return (
      <Fragment>
        {context === 'events' && isMember && (
          <Button as={Link} to={`/groups/${groupId}/events/create`}>
            Create New Event
          </Button>
        )}

        {context === 'chat' && isMember && showPostForm === false && (
          <Button onClick={_ => this.setState({ showPostForm: true })}>
            Create a post
          </Button>
        )}
        
        {context === 'chat' && isMember && showPostForm && (
          <Form
            style={{ marginTop: '.5em' }}
            size="large"
            onSubmit={handleSubmit}
          >
            <Form.Input
              fluid
              icon="pencil alternate"
              iconPosition="left"
              placeholder="Post Title"
              type="text"
              name="cTitle"
              value={cTitle}
              onChange={handleChange}
            />
            <Form.TextArea
              label="Description"
              placeholder="Give a description of your post."
              name="cDescription"
              value={cDescription}
              onChange={handleChange}
            />
            <Form.Field>
              <Button
                size="large"
                disabled={!(cTitle.length > 0 && cDescription.length > 0)}
              >
                Create Post
              </Button>
              <Button
                size="large"
                onClick={_ =>
                  this.setState({
                    showPostForm: false,
                    cTitle: '',
                    cDescription: '',
                  })
                }
              >
                Cancel
              </Button>
            </Form.Field>
          </Form>
        )}

        {context === 'update' ? (
          <UpdateGroupForm />
        ) : (
          <List relaxed>
            {listRender.map((i, idx) => {
              switch (context) {
                case 'members':
                  return (
                    <Members
                      key={i.id}
                      item={i}
                      isAdmin={isAdmin}
                      groupId={groupId}
                      adminRemoveMember={adminRemoveMember}
                    />
                  );
                  break;
                case 'chat':
                  {
                    // NOTE: Conner - Pass down the props you need here to Chat
                    let last = false;
                    if (idx === listRender.length - 1) {
                      last = true;
                    }
                    return <Chat key={i.id} item={i} />;
                  }
                  break;
                case 'events':
                  return <Events key={i.id} item={i} history={history} />;
                  break;
                default:
                  return null;
              }
            })}
          </List>
        )}
        
      </Fragment>
    );
  }
}

const mapStateToProps = ({ groups, posts, authentication }) => ({
  groupDetailed: groups.groupDetailed,
  posts: posts.posts,
  user: authentication.user,
});

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(_createPost(post)),
  adminChangeAdmin: (userId, groupId) => dispatch(adminChangeAdmin(userId, groupId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupContext);

// Any one of these things can be broken out into their own file
// For the moment I'm not to worried about it though.
// I think this makes it easy to add anything as we see fit
// Lets see though
function Events({ item, history }) {
  const weekday = dateDayAsString(item.day);
  const month = dateMonthAsString(item.day);
  const dayNum = new Date(item.day).getDay();
  const year = new Date(item.day).getFullYear();
  return (
    <List.Item as="a" onClick={() => history.push(`/events/${item.id}`)}>
      <List.Content>
        <Segment>
          <List.Description>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Container style={{ fontSize: '1.5em', textAlign: 'center' }}>
                    {item.name}
                  </Container>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} divided>
                <Grid.Column>{item.description}</Grid.Column>
                <Grid.Column>
                  <strong>Location and time:</strong>
                  <br />
                  {item.location}
                  <br />
                  {weekday}, {month} {dayNum}, {year}
                  <br />
                  {item.startTime} to {item.endTime}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </List.Description>
        </Segment>
      </List.Content>
    </List.Item>
  );
}

function Members({ item, isMember, isAdmin, groupId, adminRemoveMember, adminChangeAdmin }) {
  const memberStatus = item.group_member.isAdmin ? 'an Admin' : 'a Member';
  return (
    <List.Item>
      <Image avatar src={item.imageURL} />
      <List.Content>
        <List.Header>{item.username} </List.Header>
        <List.Description>Is {memberStatus} { isMember && isAdmin ? !item.group_member.isAdmin ? <a onClick={() => adminChangeAdmin(item.id, groupId)}>Promote to Admin</a> : <a onClick={() => adminChangeAdmin(item.id, groupId)}>Remove Admin Status</a> : null }</List.Description>
      </List.Content>
      <List.Content floated="right">
        {isAdmin ? (
          <Button
            onClick={() => adminRemoveMember(item.id, groupId)}
            basic
            negative
            floated="right"
            size="small"
          >
            Remove
          </Button>
        ) : null}
      </List.Content>
    </List.Item>
  );
}

function Chat(props) {
  const { item } = props;
  return (
    <Fragment>
      <List.Item>
        <List.Header>
          <Link to={`/posts/${item.id}`}>{item.title}</Link>
        </List.Header>
        <List.Content>
          <List.Description>
            Created by: <Image src={item.user.imageURL} avatar />{' '}
            <span>{item.user.username}</span>
          </List.Description>
        </List.Content>
      </List.Item>
    </Fragment>
  );
}

export function dateDayAsString(dateString) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return daysOfWeek[new Date(dateString).getDay()];
}

export function dateMonthAsString(dateString) {
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthsOfYear[new Date(dateString).getMonth()];
}
