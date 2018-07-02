import axios from 'axios';

// action types

<<<<<<< HEAD
=======
const GOT_ORDERS = 'GOT_ORDERS';
const GOT_ORDER = 'GOT_ORDER';
const GOT_CREWLIST = 'GOT_CREWLIST';
>>>>>>> 2cc2ae8a082cb3584eedad383196f7a48399c377
const UPDATE_ORDER = 'UPDATE_ORDER';
const GOT_ORDERS = 'GOT_ORDERS'
const GOT_ORDER = 'GOT_ORDER'
const GET_OPEN_ORDERS = 'GET_OPEN_ORDERS'
<<<<<<< HEAD
const GOT_CREWLIST = 'GOT_CREWLIST'
=======

>>>>>>> 2cc2ae8a082cb3584eedad383196f7a48399c377

// initial state
const initialState = {
  count: 0,
  orders: [],
  currentPage: 1,
  lastPage: 1,
  order: {},
  crewList: [],
};

// action creators
<<<<<<< HEAD
=======

const createGotOrdersAction = orders => ({ type: GOT_ORDERS, orders });
>>>>>>> 2cc2ae8a082cb3584eedad383196f7a48399c377


const createGetCrewListAction = crewList => ({ type: GOT_CREWLIST, crewList });

const createUpdateOrderAction = order => ({ type: UPDATE_ORDER, order });

const createGotOrdersAction = (orders) => ({ type: GOT_ORDERS, orders })

const createGotOrderAction = (order) => ({ type: GOT_ORDER, order })

const getOpenOrders = (orders) => ({ type: GET_OPEN_ORDERS, orders })
<<<<<<< HEAD
=======

>>>>>>> 2cc2ae8a082cb3584eedad383196f7a48399c377

// thunk creators
export const createGetLatestOrdersThunk = page => {
  return async dispatch => {
    try {
      let pageQuery = '';
      if (typeof page === 'number') pageQuery = `?page=${page}`;
      const orderData = await axios.get(`/api/orders${pageQuery}`);
      dispatch(createGotOrdersAction(orderData.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createGetOrderThunk = id => {
  return async dispatch => {
    try {
      const orderData = await axios.get(`/api/orders/${id}`);
      dispatch(createGotOrderAction(orderData.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createGetCrewListThunk = () => {
  return async dispatch => {
    try {
      const crew = await axios.get(`/api/teams`);
      dispatch(createGetCrewListAction(crew.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createUpdateOrderThunk = (order, orderId) => {
  console.log(order)
  return async dispatch => {
    try {
      const response = await axios.put(`/api/orders/${orderId}`, order);
      dispatch(createUpdateOrderAction(response.data.updatedOrder));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getOpenOrdersThunk = () => {
  return async (dispatch) => {
    try {
      const orderData = await axios.get(`/api/orders/open`)
      dispatch(getOpenOrders(orderData.data))
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_ORDERS:
      return {
        ...state,
        orders: action.orders.orders,
        count: action.orders.count,
        currentPage: action.orders.currentPage,
        lastPage: action.orders.lastPage,
      };
    case GOT_ORDER:
<<<<<<< HEAD

=======
>>>>>>> 2cc2ae8a082cb3584eedad383196f7a48399c377
      return { ...state, order: action.order, crew: action.order.crew };
    case GOT_CREWLIST:
      return { ...state, crewList: action.crewList };
    case UPDATE_ORDER:
<<<<<<< HEAD
      return { ...state, order: action.order }
=======
      return { ...state, order: action.order };
>>>>>>> 2cc2ae8a082cb3584eedad383196f7a48399c377
    default:
      return state
  }
}


export const getOpenOrdersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_OPEN_ORDERS:
      return action.orders
    default:
      return state;
  }
}
