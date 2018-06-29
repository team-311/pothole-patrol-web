import React, { Component } from 'react';
import { Comment, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

class CommentList extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();

    this.state = {
      date: date,
    };
  }

  render() {
    return this.props.allComments.map(comment => {
      return (
        <Segment key={comment.id} style={{ margin: '2rem' }}>
          <Comment.Group>
            <Comment>
              <Comment.Avatar
                as="a"
                src={
                  comment.user.profilePicture ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpD6egrPWQJs-dfiOc0Uotoi-dthRwfE5scYvS09d_WHHd1k86'
                }
              />
              <Comment.Content>
                <Comment.Author>{comment.user.firstName}</Comment.Author>
                <Comment.Metadata>
                  <div>{this.state.date}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </Segment>
      );
    });
  }
}

const mapState = state => {
  return {
    allComments: state.comments.allComments,
  };
};

export default connect(
  mapState,
  null
)(CommentList);
