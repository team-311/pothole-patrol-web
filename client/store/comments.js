import axios from 'axios';

// action types
const NEW_COMMENT = 'NEW_COMMENT';
const ALL_COMMENTS = 'ALL_COMMENTS';

// initial state
const initialState = {
  comment: '',
  allComments: [],
};

// action creators
const createNewComment = comment => ({ type: NEW_COMMENT, comment });

const getAllComments = allComments => ({ type: ALL_COMMENTS, allComments });

// thunk creators
export const createNewCommentThunk = comment => {
  return async dispatch => {
    try {
      const { data: newComment } = await axios.post(`/api/comments`, comment);
      dispatch(createNewComment(newComment));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createGetCommentsThunk = id => {
  return async dispatch => {
    try {
      const { data: comments } = await axios.get(`/api/comments/${id}`);
      dispatch(getAllComments(comments));
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_COMMENT:
      return {
        ...state,
        comment: action.comment.text,
        allComments: [action.comment],
      };
    case ALL_COMMENTS:
      return {
        ...state,
        allComments: [action.allComments],
      };
    default:
      return state;
  }
}
