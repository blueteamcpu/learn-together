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
import ExploreForm from './ExploreForm';
import ExploreCards from '../ExploreCards/ExploreCards';

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
            <ExploreForm
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleSelect={this.handleSelect}
              term={this.state.term}
              category={this.props.category}
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
        </Grid>
      </main>
    );
  }
}

export default Explore;
