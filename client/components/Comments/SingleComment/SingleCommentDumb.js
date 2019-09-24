import React, { Component, Fragment } from 'react';
import { Comment, Form, Button } from 'semantic-ui-react';
import Axios from 'axios';

class SingleComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showThread: false,
      values: { content: '' },
      errors: { content: '' },
    };
  }

  openThread = _ => {
    if (!this.props.thread) {
      this.props.getThread(this.props.comment.id);
    }

    this.setState({ showThread: true });
  };

  closeThread = _ => {
    this.setState({ showThread: false });
  };

  handleChange = (_, { name, value }) => {
    this.setState(state => ({
      ...state,
      values: {
        ...state.values,
        [name]: value,
      },
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
          `/api/comments/${this.props.type}/${this.props.typeId}/comment/${this.props.comment.id}`,
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
    const { comment, thread } = this.props;
    const { showThread, values, errors } = this.state;
    const { openThread, closeThread, handleChange, handleSubmit } = this;

    const createdAt = new Date(comment.createdAt);

    return (
      <Comment>
        <Comment.Content>
          <Comment.Author as="a">{comment.user.username}</Comment.Author>
          <Comment.Metadata>
            <div>
              {createdAt.getMonth() + 1} / {createdAt.getDate()} /{' '}
              {createdAt.getFullYear()} @ {createdAt.toLocaleTimeString()}
            </div>
          </Comment.Metadata>
          <Comment.Text>{comment.content}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={openThread}>
              Reply {comment.threadCount ? `(${comment.threadCount})` : ''}
            </Comment.Action>
            {showThread && (
              <Comment.Action onClick={closeThread}>Hide Thread</Comment.Action>
            )}
          </Comment.Actions>
        </Comment.Content>

        {showThread && thread && (
          <Fragment>
            <Comment.Group>
              {thread.map(c => {
                const _createdAt = new Date(c.createdAt);

                return (
                  <Comment.Content key={c.id}>
                    <Comment.Author as="a">{c.user.username}</Comment.Author>
                    <Comment.Metadata>
                      <div>
                        {_createdAt.getMonth() + 1} / {_createdAt.getDate()} /{' '}
                        {_createdAt.getFullYear()} @{' '}
                        {_createdAt.toLocaleTimeString()}
                      </div>
                    </Comment.Metadata>
                    <Comment.Text>{c.content}</Comment.Text>
                  </Comment.Content>
                );
              })}

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
                  style={{ maxHeight: 50, width: '50%' }}
                />
                <Button
                  size="tiny"
                  content="Add Reply"
                  primary
                  labelPosition="left"
                  icon="edit"
                />
              </Form>
            </Comment.Group>
          </Fragment>
        )}
      </Comment>
    );
  }
}

export default SingleComment;
