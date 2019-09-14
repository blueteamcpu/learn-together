import React from 'react';
import { Form, Responsive, Select, Button } from 'semantic-ui-react';

const ExploreSelect = ({ handleSelect, category }) => (
  <Select
    onChange={handleSelect}
    value={category}
    options={['Groups', 'Events'].map(value => ({
      key: value,
      value,
      text: value,
    }))}
  />
);

const ExploreInput = ({ term, handleChange }) => (
  <Form.Input placeholder="Search..." value={term} onChange={handleChange} />
);

const ExploreButton = () => (
  <Button type="submit" color="blue" basic>
    Submit
  </Button>
);

const ExploreForm = ({
  handleSubmit,
  handleSelect,
  category,
  term,
  handleChange,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Form.Field>
          <ExploreSelect
            handleSelect={handleSelect}
            category={category}
            style={{ marginBottom: '0.1rem' }}
          />
        </Form.Field>
        <ExploreInput term={term} handleChange={handleChange} />
        <ExploreButton />
      </Responsive>

      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Form.Group inline>
          <ExploreSelect handleSelect={handleSelect} category={category} />
          <ExploreInput term={term} handleChange={handleChange} />
          <ExploreButton />
        </Form.Group>
      </Responsive>
    </Form>
  );
};

export default ExploreForm;
