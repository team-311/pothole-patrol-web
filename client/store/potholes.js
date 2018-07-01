import axios from 'axios';

// action types
const GOT_POTHOLES = 'GOT_POTHOLES';
const GOT_SINGLE_POTHOLE = 'GOT_SINGLE_POTHOLE';
const GET_TIME_COMPLETE = 'GET_TIME_COMPLETE';
const GET_REPORTED_PER_DAY = 'GET_REPORTED_PER_DAY'
const GET_ALL_CLOSED = 'GET_ALL_CLOSED'
const GET_ALL_CLOSED_LAST_WEEK = 'GET_ALL_CLOSED_LAST_WEEK'
const GET_ALL_CLOSED_LAST_WEEK_NUM = 'GET_ALL_CLOSED_LAST_WEEK_NUM'
const GET_ALL_CLOSED_LAST_MONTH = 'GET_ALL_CLOSED_LAST_MONTH'
const GET_ALL_OPEN = 'GET_ALL_OPEN'
const GET_ALL_OPEN_LAST_MONTH = 'GET_ALL_OPEN_LAST_MONTH'
const GET_ALL_IN_PROGRESS = 'GET_ALL_IN_PROGRESS'
const GET_BY_WARD = 'GET_BY_WARD'
const GET_BY_WARD2 = 'GET_BY_WARD2'
const UPDATE_STATUS = 'UPDATE_STATUS';
const GET_ALL_OPEN_PRIORITY = 'GET_ALL_OPEN_PRIORITY'

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

const getAllClosedLastWeek = potholes => ({
  type: GET_ALL_CLOSED_LAST_WEEK,
  potholes
})

const getAllClosedLastWeekNum = potholes => ({
  type: GET_ALL_CLOSED_LAST_WEEK_NUM,
  potholes
})

const getAllClosedLastMonth = potholes => ({
  type: GET_ALL_CLOSED_LAST_MONTH,
  potholes
})

const getAllOpen = potholes => ({
  type: GET_ALL_OPEN,
  potholes
})
const getAllOpenPriority = potholes => ({
  type: GET_ALL_OPEN_PRIORITY,
  potholes
})

const getAllOpenLastMonth = potholes => ({
  type: GET_ALL_OPEN_LAST_MONTH,
  potholes
})

const getAllInProgress = potholes => ({
  type: GET_ALL_IN_PROGRESS,
  potholes
})

const getByWard = potholes => ({
  type: GET_BY_WARD,
  potholes
})

const getByWard2 = potholes => ({
  type: GET_BY_WARD2,
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
    dispatch(getAllClosed(data))
  }
}

export const getAllClosedLastWeekThunk = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/potholes/allclosed/lastweek')
    dispatch(getAllClosedLastWeek(data))
  }
}

export const getAllClosedLastWeekNumThunk = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/potholes/allclosed/lastweeknum')
    dispatch(getAllClosedLastWeekNum(data))
  }
}

export const getAllClosedLastMonthThunk = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/potholes/allclosed/lastmonth')
    dispatch(getAllClosedLastMonth(data))
  }
}

export const getAllOpenThunk = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/potholes/allopen')
    dispatch(getAllOpen(data))
  }
}

export const getAllOpenPriorityThunk = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/potholes/allopen/priority')
    dispatch(getAllOpenPriority(data))
  }
}

export const getAllInProgressThunk = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/potholes/allinprogress')
    dispatch(getAllInProgress(data))
  }
}

export const getByWardThunk = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/potholes/byward/${id}`)
    dispatch(getByWard(data))
  }
}

export const getByWardThunk2 = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/potholes/byward/${id}`)
    dispatch(getByWard2(data))
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

export const allOpenPriorityReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_OPEN_PRIORITY:
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
export const allClosedLastWeekReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_CLOSED_LAST_WEEK:
      return action.potholes
    default:
      return state
  }
}

export const allClosedLastWeekNumReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_CLOSED_LAST_WEEK_NUM:
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

export const getByWardReducer = (state = [], action) => {
  switch (action.type) {
    case GET_BY_WARD:
      return action.potholes
    default:
      return state
  }
}

export const getByWardReducer2 = (state = [], action) => {
  switch (action.type) {
    case GET_BY_WARD2:
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

export const allInProgressReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_IN_PROGRESS:
      return action.potholes
    default:
      return state
  }
}
