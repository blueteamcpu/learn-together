import React from 'react';
import { Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Event(props) {
    const { ev } = props; 
  return (
    <Item textAlign='center'>
      <Item.Content>
        <Item.Header as={Link} to={`/events/${ev.id}`}>{ev.name}</Item.Header>
        <Item.Description>{ev.description}</Item.Description>
      </Item.Content>
    </Item>
  );
}