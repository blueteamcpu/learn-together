import React, { Component, Fragment } from 'react';
import Comment from '../Comments/Comments';
import { Button, Container, Segment, Message, Image } from 'semantic-ui-react';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    const { loadPost } = this.props;
    const id = this.props.match.params.postId;
    loadPost(id);
  }

  deletePost() {
    const { removePost, currentPost, history } = this.props;
    const id = this.props.match.params.postId;
    removePost(id);
    history.push(`/groups/${currentPost.groupId}`);
  }

  render() {
    const { error } = this.state;
    //const {title, description, loadingPost} = this.props.currentPost;
    const { user, currentPost } = this.props;
    if (!currentPost.title) {
      return null;
    } else {
      return (
        <Fragment>
          {error ? (
            <Message style={{ marginTop: '1em' }} negative>
              {error}
            </Message>
          ) : null}
          <Container style={{ marginTop: '1em' }}>
            <Segment.Group>
              <Segment textAlign="left">{currentPost.title}</Segment>
              <Segment
                style={{
                  display: 'flex',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <Image size="mini" src={currentPost.user.imageURL} />
                  <span style={{ alignSelf: 'center', marginLeft: '.5em' }}>
                    {currentPost.user.username}
                  </span>
                </div>

                {currentPost.user.id === user.id || user.isAdmin ? (
                  <Button
                    style={{ marginLeft: '.5em' }}
                    color="red"
                    basic
                    size="small"
                    onClick={this.deletePost}
                  >
                    Delete Post
                  </Button>
                ) : null}
              </Segment>
              <Segment.Group>
                <Segment>{currentPost.description}</Segment>
              </Segment.Group>

              <Comment type="post" id={this.props.match.params.postId} />
            </Segment.Group>
          </Container>
        </Fragment>
      );
    }
  }
}

export default Post;
