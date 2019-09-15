import React, { Component, Fragment } from 'react';
import { Container, Grid, Item, List, Image, Segment} from 'semantic-ui-react';
import { connect } from 'react-redux';

class GroupContext extends React.Component {
  render() {
    const { context } = this.props;
    if(this.props.groupDetailed[context] === undefined || context === undefined) return null;
    console.log("context");
    return (
    <List divided relaxed>
      {this.props.groupDetailed[context].map(i => {
        switch(context) {
        case 'members':
          return <Members key={i.id} item={i}/>;
          break;
        case 'events':
          return <Events key={i.id} item={i}/>;
          break;
        case 'chat':
          return <Chat item={i}/>;
          break;
        default:
          return null;
        }
      })}
    </List>
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
function Events({ item }) {
  const weekday = dateDayAsString(item.day);
  const month = dateMonthAsString(item.day);
  const dayNum = new Date(item.day).getDay();
  const year = new Date(item.day).getYear();
  return(
    <List.Item>
      <List.Content>
        <List.Header as='h3' style={{ fontSize: '2em' }}>{item.name}</List.Header>              
        <List.Description>
        <Grid divided='vertically'>
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

      </List.Content>
    </List.Item>
  );
}

function Members({ item }) {
  return(
    <List.Item>
      <Image avatar src={item.imageURL} />
      <List.Content>
        <List.Header>{item.username}</List.Header>
      </List.Content>
    </List.Item>
  );
}

function Chat() {
  
}

function dateDayAsString(dateString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[new Date(dateString).getDay()];
}

function dateMonthAsString(dateString) {
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthsOfYear[new Date(dateString).getMonth()];
}
