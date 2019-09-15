import React, { Component, Fragment } from 'react';
import { List, Image, Segment} from 'semantic-ui-react';
import { connect } from 'react-redux';

class GroupContext extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {};
  // }
  // componentDidMount() {
  //   const { context } = this.props;
  //   this.setState( { context: context});
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.context === prevProps.context) return;
  //   this.setState({ context: this.props.context });
  // }

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
  console.log("Hey! Events got called!!!");
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
