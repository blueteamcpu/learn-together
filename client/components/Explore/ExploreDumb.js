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
import { changeCategory } from '../../actions/explore';

class Explore extends Component {
  state = {
    term: '',
  };

  componentDidMount() {
    this.props.fetchContent(this.props.category);
  }

  handleChange = e => {
    const { value: term } = e.target;
    this.setState(state => ({ ...state, term }));
  };

  handleSelect = e => {
    const { innerText } = e.target;
    this.props.fetchContent(innerText, this.state.term);
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.term.length) {
      this.props.fetchContent(this.props.category, this.state.term);
    }
  };

  // need category to be put on state. race condition with data coming down and state changing

  makeItems = () => {
    if (this.props.category === 'Groups') {
      return this.props.items.map(({ group, memberCount }) => ({
        header: group.name,
        meta: `Members: ${memberCount}`,
        description: group.description,
      }));
    } else if (this.props.category === 'Events') {
      console.log(this.props.items);

      return this.props.items.map(({ event, attendeeCount }) => ({
        header: event.name,
        meta: `Attendees: ${attendeeCount}`,
        description: event.description,
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
                  onChange={this.handleSelect}
                  value={this.props.category}
                  options={['Groups', 'Events'].map(value => ({
                    key: value,
                    value,
                    text: value,
                  }))}
                />
                <Form.Input
                  placeholder="Search..."
                  value={this.state.term}
                  onChange={this.handleChange}
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
            ) : this.props.items.length || this.props.failedToFetch ? (
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
