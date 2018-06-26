import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allComments: props.allComments[0],
    };
  }

  render() {
    return this.state.allComments.map(comment => {
      return (
        <Comment.Group key={comment.id}>
          <Comment>
            <Comment.Avatar
              as="a"
              src="https://www.cxservice360.com/wp-content/uploads/2017/09/Avatar.png"
            />
            <Comment.Content>
              <Comment.Author>{comment.user.firstName}</Comment.Author>
              <Comment.Metadata>
                <div>2 days ago</div>
              </Comment.Metadata>
              <Comment.Text>{comment.text}</Comment.Text>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      );
    });
  }
}

export default CommentList;
