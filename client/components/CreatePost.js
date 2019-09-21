import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { createPost as _createPost } from '../actions/post';
import {
    Button,
    Form,
    } from 'semantic-ui-react';


  class CreatePost extends Component {
      constructor(props) {
          super(props);
          this.state = { 
              values: { title: '',
                        description: '',
                        groupId: '',
                      },
              errors: {},
           }
      }

      componentDidMount() {
        const group = this.props.group;
        this.setState({values: {groupId: group.id}});
      }

      handleChange = (e, {name, value}) => {
        this.setState(state => ({
        ...state,
        values: { ...state.values, [name]: value },
        }));
      };

      handleSubmit = async e => {
            e.preventDefault();

            try {
                const { data } = await Axios.post('/api/posts/createPost',
                    this.state.values,
                    {
                        validateStatus: function(status) {
                        return status === 200 || status === 401;
                        },
                    });

                if (data.error) {
                    this.setState(state => ({
                    ...state,
                    errors: { ...state.errors, ...data.error },
                    }));
                } else if (data.errors) {
                    this.setState(state => ({
                    ...state,
                    errors: { ...state.errors, ...data.errors },
                    }));
                } else {
                    this.props.createPost(data);
                    this.props.history.push(`/groups/${this.props.group.id}/posts/${data.id}`)
                    //need to pass history as a prop
                    //need to create a route for above ^
                }

            } catch (error) {
                console.error(error);
            }
        };

      render() { 
          const { handleSubmit, handleChange } = this;
          const { values, errors } = this.state;
          return ( 
              <Fragment>
                  <Form onSubmit={handleSubmit}>
                    <Form.TextArea
                            fluid
                            placeholder="Title"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            error={errors.title ? errors.title : null}
                        />
                    <Form.TextArea
                            fluid
                            placeholder="Description"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            error={errors.description ? errors.description : null}
                        />
                    <Button color="teal" size="small" type="submit">
                        Post
                    </Button>
                  </Form>
              </Fragment>
           );
      }
  }
   
  const mapStateToProps = state => ({
    group: state.groups.groupDetailed.group,
  });
  
  const mapDispatchToProps = (dispatch) => ({
        createPost(post) {
            dispatch(_createPost(post));
        }
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
  