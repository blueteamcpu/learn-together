import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Container } from 'semantic-ui-react';

const ExploreCard = ({ header, meta, description, history, link }) => {
  return (
    <Card onClick={() => history.push(link)}>
      <Card.Content>
        <Card.Header>{header}</Card.Header>
        <Card.Meta>{meta}</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

const ConnectedCard = withRouter(ExploreCard);

class Cards extends Component {
  makeGroupCards = () =>
    this.props.items.map(({ group, memberCount }) => {
      const props = {
        link: `/groups/${group.id}`,
        header: group.name,
        meta: `Members: ${memberCount}`,
        description: group.description,
      };
      return <ConnectedCard key={group.id} {...props} />;
    });

  makeEventCards = () =>
    this.props.items.map(({ event, attendeeCount }) => {
      const props = {
        link: `/events/${event.id}`,
        header: event.name,
        meta: `Attendees: ${attendeeCount}`,
        description: event.description,
      };
      return <ConnectedCard key={event.id} {...props} />;
    });

  makeItems = () => {
    if (this.props.category === 'Groups') {
      return this.makeGroupCards();
    } else if (this.props.category === 'Events') {
      return this.makeEventCards();
    }
  };

  render() {
    return this.props.items.length ? (
      <Card.Group centered>{this.makeItems()}</Card.Group>
    ) : (
      <Container textAlign="center">
        {`There are no ${this.props.category.toLowerCase()} that meet your specifications.`}
      </Container>
    );
  }
}

export default Cards;
