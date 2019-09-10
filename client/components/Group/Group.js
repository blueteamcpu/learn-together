import React from 'react';
import { Item } from 'semantic-ui-react';

export default function Group(g, history) {
  return (
    <Item textAlign='center'>
      <Item.Content>
        <Item.Header as='a' onClick={() => history.push('/group/{g.id}')}>{g.subject}</Item.Header>
        <Item.Description>{g.description}</Item.Description>
      </Item.Content>
    </Item>
  );
}

    //     <Item.Header as='a'>Header</Item.Header>
    //     <Item.Meta>Description</Item.Meta>
    //     <Item.Description>
    //       <Image src='/images/wireframe/short-paragraph.png' />
    //     </Item.Description>
    //     <Item.Extra>Additional Details</Item.Extra>
    //   </Item.Content>
    // </Item>
