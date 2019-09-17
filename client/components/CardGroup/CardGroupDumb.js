import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import ConnectedCard from './ConnectedCardDumb';

const Cards = ({ items, noContentMessage }) =>
  items.length ? (
    <Card.Group centered>
      {items.map(item => {
        return <ConnectedCard key={item.id} {...item} />;
      })}
    </Card.Group>
  ) : (
    <Container textAlign="center">{noContentMessage}</Container>
  );

export default Cards;
