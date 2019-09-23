import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import Axios from 'axios';
import socket from '../../socket';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: { content: '' },
      errors: {},
    };
  }

  joinRoom = () =>
    socket.emit('join-room', {
      type: this.props.type,
      id: this.props.id,
    });

  componentDidMount() {
    if (this.props.socketAuth) {
      this.joinRoom();
    }

    this.props.getInitialComments(this.props.type, this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.socketAuth === false && this.props.socketAuth) {
      this.joinRoom();
    }
  }

  componentWillUnmount() {
    socket.emit('leave-room', {
      type: this.props.type,
      id: this.props.id,
    });
  }

  handleChange = (_, { name, value }) => {
    this.setState(state => ({
      ...state,
      values: { ...state.values, [name]: value },
    }));
  };

  handleSubmit = async e => {
    e.preventDefault();
    // validate logged in and socket auth'd
    try {
      if (!this.props.loggedIn) {
        this.setState(state => ({
          ...state,
          errors: {
            ...state.errors,
            content: 'You must be logged in to comment.',
          },
        }));
      } else {
        await Axios.post(
          `/api/comments/${this.props.type}/${this.props.id}`,
          this.state.values
        );

        this.setState(state => ({
          ...state,
          values: { content: '' },
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { values, errors } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>

        {this.props.comments.map(comment => {
          const createdAt = new Date(comment.createdAt);

          return (
            <Comment key={comment.id}>
              <Comment.Content>
                <Comment.Author as="a">{comment.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>
                    {createdAt.getMonth() + 1} / {createdAt.getDate()} /{' '}
                    {createdAt.getFullYear()}
                  </div>
                </Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>
                    Reply{' '}
                    {comment.comments.length
                      ? `(${comment.comments.length})`
                      : ''}
                  </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          );
        })}

        <Form reply onSubmit={handleSubmit}>
          <Form.TextArea
            name="content"
            value={values.content}
            onChange={handleChange}
            error={errors.content ? errors.content : null}
          />
          <Button
            content="Add Reply"
            primary
            labelPosition="left"
            icon="edit"
          />
        </Form>
      </Comment.Group>
    );
  }
}

export default Comments;
