import React, { Component } from 'react';
import {
  Container,
  Header,
  Form,
  Button,
  Select,
  Grid,
  Card,
} from 'semantic-ui-react';

class Explore extends Component {
  render() {
    return (
      <main style={{ marginTop: '1em' }}>
        <Grid>
          <Grid.Row>
            <Container textAlign="center">
              <Header as="h1">Find your local learning community!</Header>
            </Container>
          </Grid.Row>
          <Grid.Row centered>
            <Form>
              <Form.Group>
                <Select
                  defaultValue="Groups"
                  options={['Groups', 'Events'].map(value => ({
                    key: value,
                    value,
                    text: value,
                  }))}
                />
                <Form.Input placeholder="Search..." />
                <Button type="submit" color="blue" basic>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Grid.Row>
          <Grid.Row centered>
            <Card.Group
              items={[
                {
                  header: 'Project Report - April',
                  description:
                    'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
                  meta: 'ROI: 30%',
                },
                {
                  header: 'Project Report - May',
                  description:
                    'Bring to the table win-win survival strategies to ensure proactive domination.',
                  meta: 'ROI: 34%',
                },
                {
                  header: 'Project Report - June',
                  description:
                    'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
                  meta: 'ROI: 27%',
                },
              ]}
            />
          </Grid.Row>
        </Grid>
      </main>
    );
  }
}

export default Explore;
