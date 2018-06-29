import React, { Component } from 'react';
import { Button, Form, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { me, createNewCommentThunk, createGetCommentsThunk } from '../../store';
import CommentList from './CommentList';

class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      comment: '',
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
      potholeId: this.props.pothole.id,
    });
    this.setState({
      comments: [...this.state.comments, this.props.allComments],
      comment: '',
    });
  }

  async componentDidMount() {
    let user = await this.props.getCurrentUser();
    await this.props.getAllComments(this.props.pothole.id);
    this.setState({ user: user.user, comments: this.props.allComments });
  }

  render() {
    return (
      <div>
        {this.props.allComments.length ? <CommentList /> : <div />}
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.TextArea
              placeholder="Try adding multiple lines"
              name="comment"
              value={this.state.comment}
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
        </Container>
      </div>
    );
  }
}

const mapToProps = state => {
  return {
    comments: state.comments,
    comment: state.comments.comment,
    allComments: state.comments.allComments,
    potholes: state.potholes,
    pothole: state.potholes.pothole,
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
