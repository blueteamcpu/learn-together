import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

const CustomCard = ({ header, meta, description, history, link }) => {
  return (
    <Card onClick={() => history.push(link)}>
      <Card.Content>
        {header && <Card.Header>{header}</Card.Header>}
        {meta && <Card.Meta>{meta}</Card.Meta>}
        {description && <Card.Description>{description}</Card.Description>}
      </Card.Content>
    </Card>
  );
};

const ConnectedCard = withRouter(CustomCard);

export default ConnectedCard;