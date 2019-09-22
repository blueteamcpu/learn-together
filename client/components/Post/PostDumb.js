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
            title: '',
            description: '',
            user: '',
            creator: false,
            admin: false,
            loading: true,
            error: '',
        }
    }

    componentDidMount({match}) {
        const {loadPost } = this.props;
        console.log('MATCH: ', match)
        const id = match.params.postId;
        const post = loadPost(id);
        this.setState({ title: post.title, description: post.description, creator: post.creator, admin: post.admin, user: post.user, loading: false });
    }

    deletePost({match}) {
        const {removePost } = this.props;
        const id = match.params.id
        const removed = removePost(id);
        if (removed) {
            history.push('/explore');
        } else {
            this.setState({ error: 'Sorry, this post couldn\'t be removed. Please try again.' })
        }
    }

    render() {
        const { title, description, loading, creator, error, admin, user } = this.state;
        if (loading) {
            return null
        } else {
            return (
                <Fragment>
                    {error ? <Message negative>{error}</Message> : null}
                    <Container>
                        <Segment.Group>
                            <Segment textAlign="left">{title}</Segment>
                            <Segment textAlign="left"><Image src={user.imageURL} /><span>{user.username}</span></Segment>
                            <Segment.Group>
                                <Segment>{description}</Segment>
                            </Segment.Group>
                            {creator || admin ?
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
