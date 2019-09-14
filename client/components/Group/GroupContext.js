import React, { Component, Fragment } from 'react';
import { List, Image, Segment} from 'semantic-ui-react';
import { connect } from 'react-redux';

class GroupContext extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { context } = this.props;
    this.setState( { context: context});
  }


  render() {
    const { context } = this.state;
    if(this.props.groupDetailed[context] === undefined || context === undefined) return null;
    return (
    <List divided relaxed>
      {this.props.groupDetailed[context].map(i => {
        switch(this.state.context) {
        case 'members':
          return <Members key={i.id} item={i}/>;
          break;
        case 'events':
          return <Events item={i}/>;
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
  return(
    <List.Item>
      <List.Content>
        <List.Header>{item.name}</List.Header>
        <List.Description>
          {item.description}
          {item.location}
          {item.startTime} to {item.endTime}
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

//   <List divided relaxed>
//     <List.Item>
//       <List.Icon name='github' size='large' verticalAlign='middle' />
//       <List.Content>
//         <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
//         <List.Description as='a'>Updated 10 mins ago</List.Description>
//       </List.Content>
//     </List.Item>
//     <List.Item>
//       <List.Icon name='github' size='large' verticalAlign='middle' />
//       <List.Content>
//         <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
//         <List.Description as='a'>Updated 22 mins ago</List.Description>
//       </List.Content>
//     </List.Item>
//     <List.Item>
//       <List.Icon name='github' size='large' verticalAlign='middle' />
//       <List.Content>
//         <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
//         <List.Description as='a'>Updated 34 mins ago</List.Description>
//       </List.Content>
//     </List.Item>
//   </List>
// )
