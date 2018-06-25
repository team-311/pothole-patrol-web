import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { me, createNewCommentThunk } from '../../store';

class CommentExampleReplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      potholeId: props.id,
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
      potholeId: this.state.potholeId,
    });
    console.log(this.props.comment);
  }

  async componentDidMount() {
    let user = await this.props.getCurrentUser();
    this.setState({ user: user.user });
    console.log(this.state.user);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Header as="h2">Comments</Header>
        {/* <Comment.Group>
      <Comment>
        <Comment.Avatar
          as="a"
          src="https://www.cxservice360.com/wp-content/uploads/2017/09/Avatar.png"
        />
        <Comment.Content>
          <Comment.Author as="a">Marie Jobes</Comment.Author>
          <Comment.Metadata>
            <div>2 days ago</div>
          </Comment.Metadata>
          <Comment.Text>Revolutionary!</Comment.Text>
          <Comment.Actions>
            <Comment.Action active>Reply</Comment.Action>
          </Comment.Actions> */}
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
        {/* </Comment.Content> */}
        {/* </Comment> */}
        {/* </Comment.Group> */}
      </div>
    );
  }
}

const mapToProps = state => {
  return {
    comment: state.comment,
  };
};

const mapDispatch = dispatch => {
  return {
    getCurrentUser: () => dispatch(me()),
    newComment: comment => dispatch(createNewCommentThunk(comment)),
  };
};

export default connect(
  mapToProps,
  mapDispatch
)(CommentExampleReplyForm);
