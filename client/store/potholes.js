import axios from 'axios'

// action types
const GOT_POTHOLES = 'GOT_POTHOLES'

// initial state
const initialState = {
  count: 0,
  requests: [],
  currentPage: 1,
  lastPage: 1,
}

// action creators
const createGotPotholesAction = (potholes) => ({type: GOT_POTHOLES, potholes})

// thunk creators
export const createGetLatestPotholesThunk = (page) => {
  return async (dispatch) => {
    try {
      let pageQuery = ''
      if (typeof page === 'number') pageQuery = `?page=${page}`
      const {data: potholes} = await axios.get(`/api/potholes${pageQuery}`)
      dispatch(createGotPotholesAction(potholes))
    } catch (error) {
      console.error(error)
    }

  }
}

// reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_POTHOLES:
      return action.potholes
    default:
      return state
  }
}
