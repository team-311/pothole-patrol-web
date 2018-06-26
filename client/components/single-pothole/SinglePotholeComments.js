import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { me, createNewCommentThunk, createGetCommentsThunk } from '../../store';

class CommentExampleReplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      comment: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.props.newComment({
      text: this.state.comment,
      userId: this.state.user.id,
      potholeId: this.props.id,
    });
    console.log('NewComent====', this.props);
  }

  async componentDidMount() {
    let user = await this.props.getCurrentUser();
    this.setState({ user: user.user });
    await this.props.getAllComments(this.props.id);
    await console.log('User====', this.state.user);
  }

  renderComments() {
    if (this.props.allComments.legth) {
      this.props.allComments.map(comment => {
        return (
          <Comment.Group key={comment.comment}>
            <Comment>
              <Comment.Avatar
                as="a"
                src="https://www.cxservice360.com/wp-content/uploads/2017/09/Avatar.png"
              />
              <Comment.Content>
                <Comment.Author>{this.state.user.name}</Comment.Author>
                <Comment.Metadata>
                  <div>2 days ago</div>
                </Comment.Metadata>
                <Comment.Text>{comment.comment}</Comment.Text>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        );
      });
    } else {
      return <Header as="h5">Hi there</Header>;
    }
  }

  render() {
    console.log('AllComments=====', this.props.allComments);

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.TextArea
            placeholder="Try adding multiple lines"
            name="comment"
            onChange={this.handleChange}
          />
          <br />
          <Button
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
        {this.renderComments()}
      </div>
    );
  }
}

const mapToProps = state => {
  return {
    comments: state.comments,
    comment: state.comments.comment,
    allComments: state.comments.allComments,
  };
};

const mapDispatch = dispatch => {
  return {
    getCurrentUser: () => dispatch(me()),
    newComment: comment => dispatch(createNewCommentThunk(comment)),
    getAllComments: id => dispatch(createGetCommentsThunk(id)),
  };
};

export default connect(
  mapToProps,
  mapDispatch
)(CommentExampleReplyForm);
