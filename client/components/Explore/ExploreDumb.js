import React, { Component } from 'react';
import {
  Container,
  Header,
  Grid,
  Loader,
  Dimmer,
  Segment,
  Image,
} from 'semantic-ui-react';
import ExploreForm from './ExploreForm/ExploreForm';
import ExploreCards from './ExploreCards/ExploreCards';

class Explore extends Component {
  fetchData = (category, term = null, offset = null) => {
    this.props.fetchContent(category, term, offset);
    setTimeout(() => this.props.delayOver(), 500);
  };

  componentDidMount() {
    this.fetchData(this.props.category);
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
            <ExploreForm fetchData={this.fetchData} />
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
        </Grid>
      </main>
    );
  }
}

export default Explore;
