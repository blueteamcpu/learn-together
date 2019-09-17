import React, { Component } from 'react';
import {
  Container,
  Header,
  Grid,
  Loader,
  Dimmer,
  Segment,
  Image,
  Button,
} from 'semantic-ui-react';
import ExploreForm from './ExploreForm/ExploreForm';
import ExploreCards from './ExploreCards/ExploreCards';

class Explore extends Component {
  state = {
    term: '',
  };

  handleChange = e => {
    const { value: term } = e.target;
    this.setState(state => ({ ...state, term }));
  };

  fetchData = (category, term = null, offset = null) => {
    this.props.fetchContent(category, term, offset);
    setTimeout(() => this.props.delayOver(), 500);
  };

  componentDidMount() {
    this.fetchData(this.props.category);
  }

  render() {
    const term = this.state.term;

    return (
      <main style={{ marginTop: '1em' }}>
        <Grid>
          <Grid.Row>
            <Container textAlign="center">
              <Header as="h1">Find your local learning community!</Header>
            </Container>
          </Grid.Row>
          <Grid.Row centered>
            <ExploreForm
              term={term}
              fetchData={this.fetchData}
              handleChange={this.handleChange}
            />
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
            ) : (
              <ExploreCards />
            )}
          </Grid.Row>
          {this.props.items.length !== 0 && this.props.items.length && (
            <Grid.Row centered>
              <Button
                disabled={this.props.noMoreContent}
                onClick={() =>
                  this.fetchData(
                    this.props.category,
                    this.state.term,
                    this.props.offset + 1
                  )
                }
              >
                See more {this.props.category.toLowerCase()}
              </Button>
            </Grid.Row>
          )}
        </Grid>
      </main>
    );
  }
}

export default Explore;
