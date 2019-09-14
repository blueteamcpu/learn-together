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
  Responsive,
} from 'semantic-ui-react';

class Explore extends Component {
  state = {
    term: '',
    showLoading: false,
  };

  fetchData = (category, term = null, offset = null) => {
    this.props.fetchContent(category, term, offset);
    setTimeout(() => this.props.delayOver(), 500);
  };

  componentDidMount() {
    this.fetchData(this.props.category);
  }

  handleChange = e => {
    const { value: term } = e.target;
    this.setState(state => ({ ...state, term }));
  };

  handleSelect = e => {
    const { innerText } = e.target;
    this.fetchData(innerText, this.state.term);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.fetchData(this.props.category, this.state.term);
  };

  makeItems = () => {
    if (this.props.category === 'Groups') {
      return this.props.items.map(({ group, memberCount }) => ({
        header: group.name,
        meta: `Members: ${memberCount}`,
        description: group.description,
      }));
    } else if (this.props.category === 'Events') {
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
              <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
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
              </Responsive>
              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Form.Group inline>
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
              </Responsive>
            </Form>
          </Grid.Row>
          <Grid.Row centered>
            {this.props.fetching ? (
              !this.props.defaultDelay ? (
                <Segment>
                  <Dimmer active>
                    <Loader />
                  </Dimmer>
                  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Segment>
              ) : null
            ) : this.props.items.length ? (
              <Card.Group centered items={this.makeItems()} />
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
