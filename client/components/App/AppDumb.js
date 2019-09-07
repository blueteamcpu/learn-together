import React, { Component } from 'react';
import Home from '../Home/HomeDumb';

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return <Home />;
  }
}
