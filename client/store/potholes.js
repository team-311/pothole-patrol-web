import axios from 'axios';

// action types
const GOT_POTHOLES = 'GOT_POTHOLES';
const GOT_SINGLE_POTHOLE = 'GOT_SINGLE_POTHOLE';
const UPDATE_STATUS = 'UPDATE_STATUS';

// initial state
const initialState = {
  count: 0,
  requests: [],
  currentPage: 1,
  lastPage: 1,
  pothole: {},
};

// action creators
const createGotPotholesAction = potholes => ({ type: GOT_POTHOLES, potholes });

const createGotSinglePotholeAction = pothole => ({
  type: GOT_SINGLE_POTHOLE,
  pothole,
});

const createUpdateStatusAction = pothole => ({
  type: UPDATE_STATUS,
  pothole,
});

// thunk creators
export const createGetLatestPotholesThunk = page => {
  return async dispatch => {
    try {
      let pageQuery = '';
      if (typeof page === 'number') pageQuery = `?page=${page}`;
      const { data: potholes } = await axios.get(`/api/potholes${pageQuery}`);
      dispatch(createGotPotholesAction(potholes));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createGotPotholeThunk = potholeId => {
  return async dispatch => {
    try {
      const { data: singlePothole } = await axios.get(
        `/api/potholes/${potholeId}`
      );
      dispatch(createGotSinglePotholeAction(singlePothole));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createUpdateStatusThunk = (pothole, potholeId) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/potholes/${potholeId}`, pothole);
      dispatch(createUpdateStatusAction(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_POTHOLES:
      return action.potholes;
    case GOT_SINGLE_POTHOLE:
      return { ...state, pothole: action.pothole };
    case UPDATE_STATUS:
      return {
        ...state,
        pothole: action.pothole,
      };
    default:
      return state;
  }
}
