import axios from 'axios';

// action types
const NEW_COMMENT = 'NEW_COMMENT';

// initial state
const initialState = {
  comment: '',
};

// action creators
const createNewComment = comment => ({ type: NEW_COMMENT, comment });

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

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_COMMENT:
      return action.comment;
    default:
      return state;
  }
}
