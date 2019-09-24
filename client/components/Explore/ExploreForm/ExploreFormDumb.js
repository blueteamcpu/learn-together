import React, { Component } from 'react';
import { Form, Responsive, Select, Button, FormField } from 'semantic-ui-react';

const SelectDistance = ({ handleDistance, distance }) => (
  <Select
    value={distance === 'All' ? distance : distance + '-mi'}
    options={['5', '10', '25', '50', '100']
      .map(s => s + '-mi')
      .map(value => ({
        key: value,
        value,
        text: value,
      }))
      .concat([
        {
          key: 'All',
          value: 'All',
          text: 'All',
        },
      ])}
    onChange={handleDistance}
  />
);

const SelectCategory = ({ handleCategory, category }) => (
  <Select
    onChange={handleCategory}
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

class ExploreForm extends Component {
  handleCategory = e => {
    const { innerText } = e.target;
    this.props.fetchData(innerText, this.props.term, 0, this.props.distance);
  };

  handleDistance = e => {
    if (e.target.innerText === 'All') {
      this.props.fetchData(this.props.category, this.props.term, 0, 'All');
    } else {
      this.props.fetchData(
        this.props.category,
        this.props.term,
        0,
        e.target.innerText.split('-')[0]
      );
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.fetchData(
      this.props.category,
      this.props.term,
      0,
      this.props.distance
    );
  };

  render() {
    const { handleSubmit, handleCategory, handleDistance } = this;
    const { category, term, handleChange, distance, isLoggedIn } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          {isLoggedIn && (
            <FormField>
              <SelectDistance
                distance={distance}
                handleDistance={handleDistance}
              />
            </FormField>
          )}
          <Form.Field>
            <SelectCategory
              handleCategory={handleCategory}
              category={category}
              style={{ marginBottom: '0.1rem' }}
            />
          </Form.Field>
          <ExploreInput term={term} handleChange={handleChange} />
          <ExploreButton />
        </Responsive>

        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Form.Group inline>
            {isLoggedIn && (
              <SelectDistance
                distance={distance}
                handleDistance={handleDistance}
              />
            )}
            <SelectCategory
              handleCategory={handleCategory}
              category={category}
            />
            <ExploreInput term={term} handleChange={handleChange} />
            <ExploreButton />
          </Form.Group>
        </Responsive>
      </Form>
    );
  }
}

export default ExploreForm;
