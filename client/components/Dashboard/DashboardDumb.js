import React, { Component } from 'react';
import { Container, Header, Grid, Button, Divider, Segment } from 'semantic-ui-react';
import CardGroup from '../CardGroup/CardGroupDumb';
import { firstSentenceOnly } from '../../../utils/index';

class DashBoard extends Component {
  componentDidMount() {
    this.props.getMyEvents();
    this.props.getMyGroups();
  }

  render() {
    const { groups, events, history } = this.props;

    return (
      <main style={{ marginTop: '2em' }}>
        <Grid>
          <Grid.Row centered>
            <Container textAlign="center">

              <Header clearing as="h1">
                Your Groups
              </Header>
              <Button color='red' onClick={() => history.push('/groups/createnew')}>Create New Group</Button>
              <Divider />
            </Container>
          </Grid.Row>
          <Grid.Row centered>
            <CardGroup
              items={groups.map(g => ({
                id: g.id,
                header: g.name,
                description: g.description
                  ? firstSentenceOnly(g.description)
                  : 'No description available.',
                link: `/groups/${g.id}`,
              }))}
              noContentMessage="You do not belong to any groups."
            />
          </Grid.Row>
          <Grid.Row centered>
            {groups.length !== 0 && groups.length % 10 === 0 && (
              <Button type="submit">See more groups</Button>
            )}
          </Grid.Row>

          <Grid.Row centered>
            <Container textAlign="center">
              <Header as="h1">Your Events</Header>
              <Divider />
            </Container>
          </Grid.Row>
          <Grid.Row centered>
            <CardGroup
              items={events.map(e => {
                const day = new Date(e.day);

                return {
                  id: e.id,
                  header: e.name,
                  meta: `${day.getMonth() +
                    1} / ${day.getDate()} / ${day.getFullYear()}`,
                  description: firstSentenceOnly(e.description),
                  link: `/events/${e.id}`,
                };
              })}
              noContentMessage="You are not rsvp'd to any events."
            />
          </Grid.Row>
          <Grid.Row centered>
            {events.length !== 0 && events.length % 10 === 0 && (
              <Button type="submit">See more events</Button>
            )}
          </Grid.Row>
        </Grid>
      </main>
    );
  }
}

export default DashBoard;
