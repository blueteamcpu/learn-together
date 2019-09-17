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
  fetchData = (category, term = null, offset = null) => {
    this.props.fetchContent(category, term, offset);
    setTimeout(() => this.props.delayOver(), 2000);
  };

  componentDidMount() {
    if (!this.props.items.length) {
      this.fetchData(this.props.category);
    }
  }

  render() {
    const {
      term,
      offset,
      items,
      fetching,
      defaultDelay,
      category,
      noMoreContent,
    } = this.props;

    return (
      <main style={{ marginTop: '1em' }}>
        <Grid>
          <Grid.Row>
            <Container textAlign="center">
              <Header as="h1">Find your local learning community!</Header>
            </Container>
          </Grid.Row>
          <Grid.Row centered>
            <ExploreForm fetchData={this.fetchData} />
          </Grid.Row>

          <Grid.Row centered>
            {fetching ? (
              items.length ? (
                <ExploreCards />
              ) : !defaultDelay ? (
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
          {items.length !== 0 && items.length % 20 === 0 && (
            <Grid.Row centered>
              <Button
                disabled={noMoreContent}
                onClick={() => this.fetchData(category, term, offset + 1)}
              >
                See more {category.toLowerCase()}
              </Button>
            </Grid.Row>
          )}
        </Grid>
      </main>
    );
  }
}

export default Explore;
