import axios from 'axios'

// action types
const GOT_ORDERS = 'GOT_ORDERS'
const GOT_ORDER = 'GOT_ORDER'

// initial state
const initialState = {
  count: 0,
  orders: [],
  currentPage: 1,
  lastPage: 1,
  order: {}
}

// action creators
const createGotOrdersAction = (orders) => ({type: GOT_ORDERS, orders})

const createGotOrderAction = (order) => ({type: GOT_ORDER, order})

// thunk creators
export const createGetLatestOrdersThunk = (page) => {
  return async (dispatch) => {
    try {
      let pageQuery = ''
      if (typeof page === 'number') pageQuery = `?page=${page}`
      const orderData = await axios.get(`/api/orders${pageQuery}`)
      dispatch(createGotOrdersAction(orderData.data.orders))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createGetOrderThunk = (id) => {
  return async (dispatch) => {
    try {
      const orderData = await axios.get(`/api/orders/${id}`)
      dispatch(createGotOrderAction(orderData.data))
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_ORDERS:
      return {...state, orders: action.orders}
    case GOT_ORDER:
      return {...state, order: action.order}
    default:
      return state
  }
}
