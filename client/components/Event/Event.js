import React from 'react';
import { Item } from 'semantic-ui-react';

export default function Event(props) {
    const { ev, history } = props; 
  return (
    <Item textAlign='center'>
      <Item.Content>
        <Item.Header as='a' onClick={() => history.push('/events/{ev.id}')}>{ev.name}</Item.Header>
        <Item.Description>{ev.description}</Item.Description>
      </Item.Content>
    </Item>
  );
}