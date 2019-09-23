import React, { Component } from 'react';
import { Button, Comment, Form, Header, Container } from 'semantic-ui-react';
import Axios from 'axios';
import socket from '../../socket';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: { content: '' },
      errors: { content: '' },
      showModal: false,
      initialLoad: true,
    };
  }

  joinRoom = () =>
    socket.emit('join-room', {
      type: this.props.type,
      id: this.props.id,
    });

  scrollToNewestComment = () => {
    const commentList = document.getElementById('comment-box');
    const newestComment = commentList.lastChild;
    newestComment.scrollIntoView();
  };

  mutationCallback = mutationList => {
    for (let mutation of mutationList) {
      if (mutation.type === 'childList') {
        this.setState({ showModal: true }, () =>
          setTimeout(() => this.setState({ showModal: false }), 1000 * 5)
        );
      }
    }
  };

  componentDidMount() {
    if (this.props.socketAuth) {
      this.joinRoom();
    }

    this.props.getInitialComments(this.props.type, this.props.id);

    if (this.props.comments.length) {
      this.setState({ initialLoad: false });
      this.scrollToNewestComment();
    }

    this.observer = new MutationObserver(this.mutationCallback);

    this.observer.observe(document.getElementById('comment-box'), {
      childList: true,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.socketAuth === false && this.props.socketAuth) {
      this.joinRoom();
    }

    if (prevProps.comments.length === 0 && this.props.comments.length !== 0) {
      this.setState({ initialLoad: false });
      this.scrollToNewestComment();
    }
  }

  componentWillUnmount() {
    socket.emit('leave-room', {
      type: this.props.type,
      id: this.props.id,
    });

    this.observer.disconnect();
  }

  handleChange = (_, { name, value }) => {
    this.setState(state => ({
      ...state,
      values: { ...state.values, [name]: value },
    }));
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      if (this.state.values.content.length === 0) {
        this.setState(state => ({
          ...state,
          errors: {
            ...state.errors,
            content: 'Comments cannot be empty.',
          },
        }));
      } else if (!this.props.loggedIn) {
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
          errors: { content: '' },
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
      <Container style={{ marginTop: '1em', width: '30%' }}>
        <Header as="h3" dividing>
          Comments
        </Header>
        <Comment.Group
          id="comment-box"
          style={{ overflow: 'auto', maxHeight: '50vh' }}
          onScroll={e => {
            if (e.target.scrollTop === 0) {
              if (
                this.props.comments.length !== 0 &&
                this.props.comments.length % 30 === 0 &&
                this.props.noMoreToLoad === false
              ) {
                this.props.getMoreComments(this.props.type, this.props.id);
              }
            }
          }}
        >
          {this.props.comments.map(comment => {
            const createdAt = new Date(comment.createdAt);

            return (
              <Comment key={comment.id}>
                <Comment.Content>
                  <Comment.Author as="a">
                    {comment.user.username}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>
                      {createdAt.getMonth() + 1} / {createdAt.getDate()} /{' '}
                      {createdAt.getFullYear()} @{' '}
                      {createdAt.toLocaleTimeString()}
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
        </Comment.Group>

        {this.state.showModal && this.state.initialLoad === false && (
          <Container style={{ marginBottom: '1em' }} textAlign="center">
            <Button
              basic
              size="mini"
              onClick={() =>
                this.setState({ showModal: false }, this.scrollToNewestComment)
              }
            >
              See new comments
            </Button>
          </Container>
        )}

        <Form reply onSubmit={handleSubmit}>
          <Form.TextArea
            name="content"
            value={values.content}
            onChange={handleChange}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                this.handleSubmit(e);
              }
            }}
            error={errors.content ? errors.content : null}
            style={{ maxHeight: 50 }}
          />
          <Button
            content="Add Reply"
            primary
            labelPosition="left"
            icon="edit"
          />
        </Form>
      </Container>
    );
  }
}

export default Comments;
