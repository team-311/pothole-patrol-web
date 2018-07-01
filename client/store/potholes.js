import axios from 'axios';

// action types
const GOT_POTHOLES = 'GOT_POTHOLES';
const GOT_SINGLE_POTHOLE = 'GOT_SINGLE_POTHOLE';
const GET_TIME_COMPLETE = 'GET_TIME_COMPLETE';
const GET_REPORTED_PER_DAY = 'GET_REPORTED_PER_DAY'
const GET_ALL_CLOSED = 'GET_ALL_CLOSED'
const GET_ALL_CLOSED_LAST_MONTH = 'GET_ALL_CLOSED_LAST_MONTH'
const GET_ALL_OPEN = 'GET_ALL_OPEN'
const GET_ALL_OPEN_LAST_MONTH = 'GET_ALL_OPEN_LAST_MONTH'
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

const getTimeComplete = potholes => ({
  type: GET_TIME_COMPLETE,
  potholes
})

const getReportedPerDay = potholes => ({
  type: GET_REPORTED_PER_DAY,
  potholes
})

const getAllClosed = potholes => ({
  type: GET_ALL_CLOSED,
  potholes
})

const getAllClosedLastMonth = potholes => ({
  type: GET_ALL_CLOSED,
  potholes
})

const getAllOpen = potholes => ({
  type: GET_ALL_CLOSED,
  potholes
})

const getAllOpenLastMonth = potholes => ({
  type: GET_ALL_CLOSED,
  potholes
})
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

export const createGetPotholesThunk = (query, page) => {
  return async dispatch => {
    try {
      const queryParts = []
      if (query) queryParts.push(query)
      if (typeof page === 'number') queryParts.push(`page=${page}`)

      let path = `/api/potholes`
      if (queryParts.length > 0) {
        path += `?` + queryParts.join('&')
      }

      const { data: potholes } = await axios.get(path)
      dispatch(createGotPotholesAction(potholes))
    } catch (error) {
      console.error(error)
    }
  }
}

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

export const getTimeCompleteThunk = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/potholes/allclosed/timetocompletion')
    dispatch(getTimeComplete(data))
  }
}

export const getReportedPerDayThunk = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/potholes/lastweek/byday')
    dispatch(getReportedPerDay(data))
  }
}

export const getAllClosedThunk = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/potholes/allclosed')
    dispatch(getReportedPerDay(data))
  }
}

export const getAllOpenThunk = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/potholes/allopen')
    dispatch(getReportedPerDay(data))
  }
}
export const createUpdateStatusThunk = (pothole, potholeId) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/potholes/${potholeId}`, pothole);
      dispatch(createUpdateStatusAction(response.data.pothole));
    } catch (error) {
      console.error(error);
    }
  };
};

// reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_POTHOLES:
      return action.potholes;
    case GOT_SINGLE_POTHOLE:
      return { ...state, pothole: action.pothole };
    case UPDATE_STATUS:
      return { ...state, pothole: action.pothole };
    default:
      return state;
  }
}

export const timeCompleteReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TIME_COMPLETE:
      return action.potholes
    default:
      return state
  }
}

export const reportedDayReducer = (state = [], action) => {
  switch (action.type) {
    case GET_REPORTED_PER_DAY:
      return action.potholes
    default:
      return state
  }
}

export const allOpenReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_OPEN:
      return action.potholes
    default:
      return state
  }
}

export const allClosedReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_CLOSED:
      return action.potholes
    default:
      return state
  }
}

export const allOpenLastMonthReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_OPEN_LAST_MONTH:
      return action.potholes
    default:
      return state
  }
}

export const allClosedLastMonthReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_CLOSED_LAST_MONTH:
      return action.potholes
    default:
      return state
  }
}
