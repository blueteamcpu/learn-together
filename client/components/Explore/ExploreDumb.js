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
import { thisTypeAnnotation } from '@babel/types';

class Explore extends Component {
  state = {
    term: '',
  };

  handelChange = e => {
    const { value } = e.target;
    this.setState({ term: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.term.length) {
      if (this.props.category === 'Groups') {
        this.props.fetchGroups(this.state.term);
      }
    }
  };

  componentDidMount() {
    if (this.props.category === 'Groups') {
      this.props.fetchGroups();
    } else if (this.props.category === 'Events') {
      // this.props.fetchEvents()
    } else {
      this.props.changeCategory('Groups');
    }
  }

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
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Select
                  onChange={e => this.props.changeCategory(e.target.value)}
                  defaultValue="Groups"
                  options={['Groups', 'Events'].map(value => ({
                    key: value,
                    value,
                    text: value,
                  }))}
                />
                <Form.Input
                  placeholder="Search..."
                  value={this.state.term}
                  onChange={this.handelChange}
                />
                <Button type="submit" color="blue" basic>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Grid.Row>
          <Grid.Row centered>
            <Card.Group
              items={this.props.items.map(({ group, memberCount }) => ({
                header: group.name,
                meta: `Members: ${memberCount}`,
                description: group.description,
              }))}
            />
          </Grid.Row>
        </Grid>
      </main>
    );
  }
}

export default Explore;
