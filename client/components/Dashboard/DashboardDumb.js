import React from 'react';
import { Container, Header, Grid, Button, Divider } from 'semantic-ui-react';
import CardGroup from '../CardGroup/CardGroupDumb';

const groups = [
  {
    id: 1,
    name: 'Linear Algebra',
    zipcode: 93420,
    description: 'All things Linear Algebra!',
  },
  {
    id: 2,
    name: 'Calculus',
    zipcode: 93420,
    description: 'All things Calculus!',
  },
  {
    id: 3,
    name: 'Discrete Math',
    zipcode: 93420,
    description: 'All things Discrete Math!',
  },
  {
    id: 4,
    name: 'Geometry',
    zipcode: 93420,
    description: 'All things Geometry!',
  },
  {
    id: 5,
    name: 'Algorithms',
    zipcode: 93420,
    description: 'All things Algorithms!',
  },
  {
    id: 6,
    name: 'Data Structures',
    zipcode: 93420,
    description: 'All things Data Structures!',
  },
];

const events = [
  {
    id: 1,
    name: 'Spans and bases',
    description:
      "Let's make sure we understand the foundations of vector spaces!",
    date: new Date(),
    zipcode: 93420,
  },
  {
    id: 2,
    name: 'Gradient Descent',
    description: "Let's make sure we understand how to minimize loss!",
    date: new Date(),
    zipcode: 93420,
  },
  {
    id: 3,
    name: 'Graph Traversal',
    description: "Let's make sure we understand how Google works!",
    date: new Date(),
    zipcode: 93420,
  },
  {
    id: 4,
    name: 'Binary Trees',
    description: "Let's make sure we understand how Trees works!",
    date: new Date(),
    zipcode: 93420,
  },
  {
    id: 5,
    name: 'Tris',
    description: "Let's make sure we understand how Tris  works!",
    date: new Date(),
    zipcode: 93420,
  },
  {
    id: 6,
    name: 'Relational Databases',
    description:
      "Let's make sure we understand how Relational Databases works!",
    date: new Date(),
    zipcode: 93420,
  },
  {
    id: 7,
    name: 'No-SQL Databases',
    description: "Let's make sure we understand how No-SQL Databases works!",
    date: new Date(),
    zipcode: 93420,
  },
];

const DashBoard = () => {
  return (
    <main style={{ marginTop: '2em' }}>
      <Grid>
        <Grid.Row>
          <Container textAlign="center">
            <Header as="h1">Your Groups</Header>
            <Divider />
          </Container>
        </Grid.Row>
        <Grid.Row centered>
          <CardGroup
            items={groups.map(g => ({
              id: g.id,
              header: g.name,
              description: g.description || 'No description available.',
              link: `/groups/${g.id}`,
            }))}
            category="Groups"
          />
        </Grid.Row>
        <Grid.Row centered>
          {groups.length === 10 && (
            <Button type="submit">See more groups</Button>
          )}
        </Grid.Row>

        <Grid.Row>
          <Container textAlign="center">
            <Header as="h1">Your Events</Header>
            <Divider />
          </Container>
        </Grid.Row>
        <Grid.Row centered>
          <CardGroup
            items={events.map(e => ({
              id: e.id,
              header: e.name,
              meta: `${e.date.getMonth() +
                1} / ${e.date.getDate()} / ${e.date.getFullYear()}`,
              description: e.description,
              link: `/events/${e.id}`,
            }))}
            category="Events"
          />
        </Grid.Row>
        <Grid.Row centered>
          {events.length === 10 && (
            <Button type="submit">See more events</Button>
          )}
        </Grid.Row>
      </Grid>
    </main>
  );
};

export default DashBoard;
