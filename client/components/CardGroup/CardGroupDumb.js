import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import ConnectedCard from './ConnectedCardDumb';

const Cards = ({ items, category }) =>
  items.length ? (
    <Card.Group centered>
      {items.map(item => {
        return <ConnectedCard key={item.id} {...item} />;
      })}
    </Card.Group>
  ) : (
    <Container textAlign="center">
      {`There are no ${category.toLowerCase()} that meet your specifications.`}
    </Container>
  );

export default Cards;
