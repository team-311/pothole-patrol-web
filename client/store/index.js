import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import potholes, { timeCompleteReducer, reportedDayReducer } from './potholes';
import orders from './orders'

const reducer = combineReducers({
  user,
  potholes,
  orders,
  timeComplete: timeCompleteReducer,
  reportedDay: reportedDayReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './potholes';
export * from './orders'
