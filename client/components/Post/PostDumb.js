import React, { Component, Fragment } from 'react';
import {
    Button,
    Container,
    Segment,
    Message,
    Image,
} from 'semantic-ui-react';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
        }
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        const {loadPost} = this.props;
        const id = this.props.match.params.postId;
        loadPost(id);
    }

    deletePost() {
        const {removePost, currentPost, history } = this.props;
        const id = this.props.match.params.postId;
        removePost(id);
        console.log(currentPost.groupId)
        history.push(`/groups/${currentPost.groupId}`);
    }

    render() {
        const { error } = this.state;
        //const {title, description, loadingPost} = this.props.currentPost;
        const {user, currentPost} = this.props
        if (!currentPost.title) {
            return null
        } else {
            return (
                <Fragment>
                    {error ? <Message negative>{error}</Message> : null}
                    <Container>
                        <Segment.Group>
                            <Segment textAlign="left">{currentPost.title}</Segment>
                            <Segment ><Image size = "mini" src={currentPost.user.imageURL} /><span>{currentPost.user.username}</span></Segment>
                            <Segment.Group>
                                <Segment>{currentPost.description}</Segment>
                            </Segment.Group>
                            {currentPost.user.id === user.id || user.isAdmin ?
                                <Button
                                    fluid
                                    size="large"
                                    onClick={this.deletePost}>
                                    Delete Post
                                </Button> :
                                null
                            }
                        </Segment.Group>
                    </Container>
                </Fragment>
            )
        }
    }
}

export default Post;
