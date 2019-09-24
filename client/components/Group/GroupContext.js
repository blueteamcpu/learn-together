import React, { Component, Fragment } from 'react';
import { Container, Grid, Item, List, Image, Segment, Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPost as _createPost } from '../../actions/post';
import UpdateGroupForm from './UpdateGroupForm';

class GroupContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cTitle: '',
      cDescription: '',
      error: '',
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
    console.log(this.props);
    const sendObj = {};
    sendObj.title = this.state.cTitle;
    sendObj.description = this.state.cDescription;
    sendObj.userId = this.props.user.id;
    sendObj.groupId = this.props.groupId;
    const post = this.props.createPost(sendObj);
    if (post) {
      this.setState({ cTitle: '', cDescription: '' });
    }
  }

  render() {
    const { context, history, groupId, isMember, isAdmin, adminRemoveMember, groupDetailed, posts } = this.props;
    const listRender = context === 'chat' ? posts : groupDetailed[context];
    if (listRender === undefined || context === undefined) return null;
    if (listRender.length === 0) return null;
    return (
      <Fragment>
        {(context === 'events' && isMember) ? <Button as={Link} to={`/groups/${groupId}/events/create`}>Create New Event</Button> : null}
        {context === 'update' ? <UpdateGroupForm />
          : <List relaxed>
            {listRender.map((i, idx) => {
              switch (context) {
                case 'members':
                  return (<Members
                    key={i.id} item={i}
                    isAdmin={isAdmin}
                    groupId={groupId}
                    adminRemoveMember={adminRemoveMember} />);
                  break;
                case 'chat': {
                  // NOTE: Conner - Pass down the props you need here to Chat
                  let last = false;
                  if (idx === listRender.length - 1) {
                    last = true;
                  }
                  return (
                    <Chat key={i.id} item={i} last={last} handleChange={this.handleChange} handleSubmit={this.handleSubmit} cTitle={this.state.cTitle} cDescription={this.state.cDescription} isMember={isMember} isAdmin={isAdmin} />
                  );
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
        }
      </Fragment>
    );
  }
}

const mapStateToProps = ({ groups, posts, authentication }) => ({
  groupDetailed: groups.groupDetailed,
  posts: posts.posts,
  user: authentication.user
});

const mapDispatchToProps = (dispatch) => ({
  createPost: (post) => dispatch(_createPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupContext);

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
                <Grid.Column>
                  {item.description}
                </Grid.Column>
                <Grid.Column>
                  <strong>Location and time:</strong><br />
                  {item.location}<br />
                  {weekday}, {month} {dayNum}, {year}<br />
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

function Members({ item, isAdmin, groupId, adminRemoveMember }) {
  const memberStatus = item.group_member.isAdmin ? 'Admin' : 'Member';
  return (
    <List.Item>
      <Image avatar src={item.imageURL} />
      <List.Content>
        <List.Header>{item.username}</List.Header>
        <List.Description>
          Is a {memberStatus} {isAdmin ? <Button onClick={() => adminRemoveMember(item.id, groupId)} basic negative floated='right' size='small'>Remove</Button> : null}
        </List.Description>
      </List.Content>
    </List.Item>
  );
}

function Chat(props) {
  const { item, cDescription, cTitle, handleChange, handleSubmit, last, isMember } = props;
  return (
    <Fragment>
      {last && isMember ?
        <Fragment>
          <List.Item>
            <List.Header><Link to={`/posts/${item.id}`}>{item.title}</Link></List.Header>
            <List.Content>
              <List.Description>
                Created by: <Image src={item.user.imageURL} avatar /> <span>{item.user.username}</span>
              </List.Description>
            </List.Content>
          </List.Item>
          <Form size="large" onSubmit={handleSubmit}>
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
            <Form.TextArea label="Description" placeholder="Give a description of your post." name="cDescription" value={cDescription} onChange={handleChange} />
            <Form.Field>
              { cTitle.length > 0 ? <Button size="large" type="submit">Create Post</Button> : <Button size = "large" disabled>Create Post</Button>}
            </Form.Field>
          </Form>
        </Fragment> :
        <List.Item>
          <List.Header><Link to={`/posts/${item.id}`}>{item.title}</Link></List.Header>
          <List.Content>
            <List.Description>
              Created by: <Image src={item.user.imageURL} avatar /> <span>{item.user.username}</span>
            </List.Description>
          </List.Content>
        </List.Item>
      }
    </Fragment>
  );
}

function dateDayAsString(dateString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[new Date(dateString).getDay()];
}

function dateMonthAsString(dateString) {
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthsOfYear[new Date(dateString).getMonth()];
}
