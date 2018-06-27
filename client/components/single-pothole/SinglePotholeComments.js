import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { me, createNewCommentThunk, createGetCommentsThunk } from '../../store';
import CommentList from './CommentList';

class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      comment: '',
      currentPotholeId: props.potholeId,
      comments: [],
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
      potholeId: this.state.currentPotholeId,
    });
    this.setState({
      comments: [...this.state.comments, this.props.allComments],
    });
  }

  async componentDidMount() {
    let user = await this.props.getCurrentUser();
    await this.props.getAllComments(this.state.currentPotholeId);
    this.setState({ user: user.user, comments: this.props.allComments });
  }

  render() {
    return (
      <div>
        <Form width={'100%'} onSubmit={this.handleSubmit}>
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
        {this.props.allComments.length ? <CommentList /> : <div />}
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
)(CommentSection);
