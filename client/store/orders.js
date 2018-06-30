import axios from 'axios';

// action types
const GOT_ORDERS = 'GOT_ORDERS';
const GOT_ORDER = 'GOT_ORDER';
const GOT_CREW = 'GOT_CREW';
const UPDATE_ORDER = 'UPDATE_ORDER';

// initial state
const initialState = {
  count: 0,
  orders: [],
  currentPage: 1,
  lastPage: 1,
  order: {},
  crew: {},
};

// action creators
const createGotOrdersAction = orders => ({ type: GOT_ORDERS, orders });

const createGotOrderAction = order => ({ type: GOT_ORDER, order });

const createGetCrewAction = crew => ({ type: GOT_CREW, crew });

const createUpdateOrderAction = order => ({ type: UPDATE_ORDER, order });

// thunk creators
export const createGetLatestOrdersThunk = page => {
  return async dispatch => {
    try {
      let pageQuery = '';
      if (typeof page === 'number') pageQuery = `?page=${page}`;
      const orderData = await axios.get(`/api/orders${pageQuery}`);
      dispatch(createGotOrdersAction(orderData.data.orders));
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

export const createGetCrewThunk = id => {
  return async dispatch => {
    try {
      const crew = await axios.get(`/api/teams/${id}`);
      dispatch(createGetCrewAction(crew.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createUpdateOrderThunk = (order, orderId) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/orders/${orderId}`, order);
      dispatch(createUpdateOrderAction(response.data.updatedOrder));
    } catch (error) {
      console.error(error);
    }
  };
};

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDERS:
      return { ...state, orders: action.orders };
    case GOT_ORDER:
      return { ...state, order: action.order, crew: action.order.crew };
    case GOT_CREW:
      return { ...state, crew: action.crew };
    case UPDATE_ORDER:
      return { ...state, order: action.order };
    default:
      return state;
  }
}
