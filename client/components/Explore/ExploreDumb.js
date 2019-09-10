import React, { Component } from 'react';
import {
  Container,
  Header,
  Form,
  Button,
  Select,
  Grid,
  Card,
  Loader,
  Dimmer,
  Segment,
  Image,
} from 'semantic-ui-react';

class Explore extends Component {
  state = {
    term: '',
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

  makeItems = () => {
    if (this.props.category === 'Groups') {
      return this.props.items.map(({ group, memberCount }) => ({
        header: group.name,
        meta: `Members: ${memberCount}`,
        description: group.description,
      }));
    }
  };

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
            {this.props.fetching ? (
              <Segment>
                <Dimmer active>
                  <Loader />
                </Dimmer>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </Segment>
            ) : this.props.items.length ? (
              <Card.Group items={this.makeItems()} />
            ) : (
              <Container textAlign="center">
                {`There are no ${this.props.category.toLowerCase()} that meet your specifications.`}
              </Container>
            )}
          </Grid.Row>
        </Grid>
      </main>
    );
  }
}

export default Explore;
