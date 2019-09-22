import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        values: { content: '' },
        errors: {},
     }
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
            //TODO: make create comment axios post below    

            // const { data } = await Axios.post('/api/comments/createComment',
            //     this.state.values,
            //     {
            //         validateStatus: function(status) {
            //         return status === 200 || status === 401;
            //         },
            //     });

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
              //TODO: dispatch to redux
            }

        } catch (error) {
            console.error(error);
        }
    };


  render() { 
      const { values, errors } = this.state;
      const { handleChange, handleSubmit } = this;

      //TODO: replace with real comment list from redux
      const commentList = [
        {
          username: 'katherinep',
          createdAt: '5:42',
          content: 'Sounds like a super fun event!',
          imageURL: 'https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png'
        },
        {
          username: 'mrimmutable',
          createdAt: '6:05',
          content: 'Im going!',
          imageURL: 'https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png'
        },
        {
          username: 'fakeuser',
          createdAt: '6:35',
          content: 'I cant make it this time',
          imageURL: 'https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png'
        },
      ]


      return ( 
        <Comment.Group>
          <Header as='h3' dividing>
            Comments
          </Header>

          {
            commentList.map(comment => 
                  <Comment>
                  <Comment.Avatar src={comment.imageURL} />
                  <Comment.Content>
                    <Comment.Author as='a'>{comment.username}</Comment.Author>
                    <Comment.Metadata>
                      <div>{comment.createdAt}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.content}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                    {/* small form below for a reply to a comment. need to get it to only show up after you click reply */}
                    {/* <Form reply>
                      <Form.TextArea />
                      <Button
                        content='Add Reply'
                        labelPosition='left'
                        icon='edit'
                        primary
                      />
                    </Form> */}
                  </Comment.Content>
                </Comment>
              )
          }

          <Form reply>
            <Form.TextArea 
              name="title"
              value={values.title}
              onChange={handleChange}
              error={errors.title ? errors.title : null}
            />
            <Button content='Add Reply' primary labelPosition='left' icon='edit' />
          </Form>
        </Comment.Group>
        );
  }
}
 
export default Comments