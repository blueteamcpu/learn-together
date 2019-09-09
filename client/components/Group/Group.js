import React from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react';

export default function Group(g) {
  return (
    <Item textAlign='center'>
      <Item.Content>
        <Item.Header as='a'>{g.subject}</Item.Header>
        <Item.Description>{g.description}</Item.Description>
      </Item.Content>
    </Item>
  );
}
