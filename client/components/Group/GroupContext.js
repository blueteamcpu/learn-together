import React, { Component, Fragment } from 'react';
import { Container, Grid, Item, List, Image, Segment, Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UpdateGroupForm from './UpdateGroupForm';

class GroupContext extends React.Component {
  render() {
    const { context, history, groupId, isMember, isAdmin, adminRemoveMember } = this.props;
    if(this.props.groupDetailed[context] === undefined || context === undefined) return null;
    return (
      <Fragment>
        {(context === 'events' && isMember) ? <Button as={Link} to={`/groups/${groupId}/events/create`}>Create New Event</Button> : null}
        { context === 'update' ? <UpdateGroupForm />
          : <List relaxed>
              {this.props.groupDetailed[context].map(i => {
                switch(context) {
                case 'members':
                  return <Members key={i.id} item={i}
                  isAdmin={isAdmin}
                  groupId={groupId}
                  adminRemoveMember={adminRemoveMember}/>;
                  break;
                case 'events':
                  return <Events key={i.id} item={i} history={history}/>;
                  break;
                case 'chat':
                  return <Chat item={i}/>;
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

const mapStateToProps = ({ groups }) => ({
  groupDetailed: groups.groupDetailed,
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
  return(
    <List.Item as='a' onClick={() => history.push(`/events/${item.id}`)}>
      <List.Content>
        <Segment>
          <List.Description>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Container style={{ fontSize: '1.5em', textAlign: 'center'}}>
                    {item.name}
                  </Container>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} divided>
                <Grid.Column>
                  {item.description}              
                </Grid.Column>
                <Grid.Column>
                  <strong>Location and time:</strong><br/>
                  {item.location}<br/>
                  {weekday}, {month} {dayNum}, {year}<br/>
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
  return(
    <List.Item>
      <Image avatar src={item.imageURL} />
      <List.Content>
        <List.Header>{item.username} </List.Header>
        <List.Description>
          Is a {memberStatus} 
        </List.Description>
      </List.Content>
      <List.Content floated='right'>
      { isAdmin ? <Button onClick={() => adminRemoveMember(item.id, groupId)} basic negative floated='right' size='small'>Remove</Button> : null}
      </List.Content>
    </List.Item>    
  );
}

function Chat() {
  
}

export function dateDayAsString(dateString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[new Date(dateString).getDay()];
}

export function dateMonthAsString(dateString) {
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthsOfYear[new Date(dateString).getMonth()];
}
