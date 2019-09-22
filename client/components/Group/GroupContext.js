import React, { Component, Fragment } from 'react';
import { Container, Grid, Item, List, Image, Segment, Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UpdateGroupForm from './UpdateGroupForm';

class GroupContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { context, history, groupId, isMember, isAdmin, adminRemoveMember } = this.props;
    if (this.props.groupDetailed[context] === undefined || context === undefined) return null;
    return (
      <Fragment>
        {(context === 'events' && isMember) ? <Button as={Link} to={`/groups/${groupId}/events/create`}>Create New Event</Button> : null}
        {context === 'update' ? <UpdateGroupForm />
          : <List relaxed>
            {this.props.groupDetailed[context].map(i => {
              switch (context) {
                case 'members':
                  return (<Members
                    key={i.id} item={i}
                    isAdmin={isAdmin}
                    groupId={groupId}
                    adminRemoveMember={adminRemoveMember} />);
                  break;
                case 'events':
                  return <Events key={i.id} item={i} history={history} />;
                  break;
                case 'chat':
                  console.log('hit Chant!')
                  return (
                    <Fragment>
                      {console.log('Inside the Fragment!')}
                      <Form size="medium" onSubmit={this.handleSubmit}>
                        <Form.Input
                          fluid
                          icon="pencil alternate"
                          iconPosition="left"
                          placeholder="Post Title"
                          type="text"
                          name="cTitle"
                          value={this.state.cTitle}
                          onChange={this.handleChange}
                        />
                        <Form.TextArea label = "Description" placeholder = "Give a description of your post." />
                        <Form.Field>
                          <Button size = "large" type = "submit">Create Post</Button>
                        </Form.Field>
                      </Form>
                      <Chat item={i} />
                    </Fragment>
                  );
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

const mapStateToProps = ({ groups, posts }) => ({
  groupDetailed: groups.groupDetailed,
  posts: posts.posts,
});

// const mapDispatchToProps = (dispatch) => ({
//   getDetailGroup(id) { dispatch(getDetailGroup(id)); }
// });

export default connect(mapStateToProps, null)(GroupContext);

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
    <List.Item as='a' onClick={() => history.push(`/events/${item.id}`)}>
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

function Chat({post}) {
  return (
    <List.Item>
      <List.Header><Link to={`/posts/${post.id}`}>{post.title}</Link></List.Header>
      <List.Content>
        <List.Description>
          Created by: <Image src={post.User.imageURL} avatar /> <span>{post.User.username}</span>
        </List.Description>
      </List.Content>
    </List.Item>
  )
}

function dateDayAsString(dateString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[new Date(dateString).getDay()];
}

function dateMonthAsString(dateString) {
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthsOfYear[new Date(dateString).getMonth()];
}
