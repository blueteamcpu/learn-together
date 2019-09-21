import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
  } from 'semantic-ui-react';

  class CreatePost extends Component {
      constructor(props) {
          super(props);
          this.state = {  }
      }
      render() { 
          return ( 
              <Fragment>

              </Fragment>
           );
      }
  }
   
  export default CreatePost;

  const mapStateToProps = state => ({
  });
  
  const mapDispatchToProps = (dispatch) => ({
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
  