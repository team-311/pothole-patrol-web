import axios from 'axios'

// action types
const GOT_ORDERS = 'GOT_POTHOLES'

// initial state
const initialState = {
  count: 0,
  orders: [],
  currentPage: 1,
  lastPage: 1,
}

// action creators
const createGotOrdersAction = (orders) => ({type: GOT_ORDERS, orders})

// thunk creators
export const createGetLatestOrdersThunk = (page) => {
  return async (dispatch) => {
    try {
      let pageQuery = ''
      if (typeof page === 'number') pageQuery = `?page=${page}`
      const {data: orders} = await axios.get(`/api/orders${pageQuery}`)
      dispatch(createGotOrdersAction(orders))
    } catch (error) {
      console.error(error)
    }

  }
}

// reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_ORDERS:
      return action.orders
    default:
      return state
  }
}
