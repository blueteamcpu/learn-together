import React, { Component } from 'react';
import { Button, Comment, Form, Header, Container } from 'semantic-ui-react';
import Axios from 'axios';
import socket from '../../socket';
import SingleComment from './SingleComment/SingleComment';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: { content: '' },
      errors: { content: '' },
      showModal: false,
      initialLoad: true,
    };
    this.commentBoxScroll = 0;
    this.commentAdded = false;
    this.commentsRef = React.createRef();
  }

  joinRoom = () =>
    socket.emit('join-room', {
      type: this.props.type,
      id: this.props.id,
    });

  scrollToNewestComment = () => {
    const commentList = document.getElementById('comment-box');

    if (!this.commentAdded) {
      commentList.scrollTo(0, commentList.scrollHeight - this.commentBoxScroll);
      this.commentBoxScroll = commentList.scrollHeight;
    } else if (this.commentAdded) {
      this.commentAdded = false;
      this.commentBoxScroll += commentList.scrollHeight;
    }
  };

  mutationCallback = mutationList => {
    for (let mutation of mutationList) {
      if (mutation.type === 'childList') {
        this.setState({ showModal: true }, () =>
          setTimeout(() => this.setState({ showModal: false }), 1000 * 8)
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
    } else if (prevProps.comments.length !== this.props.comments.length)
      this.scrollToNewestComment();
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
        this.commentAdded = true;
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

    console.log(this.commentsRef.current);

    return (
      <Container style={{ marginTop: '1em', width: '50%' }}>
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
            return (
              <SingleComment
                key={comment.id}
                comment={comment}
                type={this.props.type}
                typeId={this.props.id}
              />
            );
          })}
        </Comment.Group>

        {this.state.showModal && this.state.initialLoad === false && (
          <Container style={{ marginBottom: '1em' }} textAlign="center">
            <Button
              basic
              size="mini"
              onClick={() => {
                this.commentBoxScroll = 0;
                this.setState({ showModal: false }, this.scrollToNewestComment);
              }}
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
