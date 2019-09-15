import React, { Component } from 'react';
import {
  Container,
  Header,
  Grid,
  Loader,
  Dimmer,
  Segment,
  Image,
} from 'semantic-ui-react';

const groups = [
  {
    name: 'Linear Algebra',
    zipcode: 93420,
    description: 'All things Linear Algebra!',
  },
  {
    name: 'Calculus',
    zipcode: 93420,
    description: 'All things Calculus!',
  },
  {
    name: 'Discrete Math',
    zipcode: 93420,
    description: 'All things Discrete Math!',
  },
];

const events = [
  {
    name: 'Spans and bases',
    description:
      "Let's make sure we understand the foundations of vector spaces!",
    date: new Date(),
    zipcode: 93420,
  },
  {
    name: 'Gradient Descent',
    description: "Let's make sure we understand how to minimize loss!",
    date: new Date(),
    zipcode: 93420,
  },
  {
    name: 'Graph Traversal',
    description: "Let's make sure we understand how Google works!",
    date: new Date(),
    zipcode: 93420,
  },
];

const DashBoard = () => {
  return (
    <Grid>
      <Grid.Row>
        <Container textAlign="center">
          <Header as="h1">Your Groups</Header>
        </Container>
      </Grid.Row>
      <Grid.Row>
        
      </Grid.Row>
    </Grid>
  );
};

export default DashBoard;
