import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import potholes, { timeCompleteReducer, reportedDayReducer, allOpenReducer, allClosedReducer, allOpenLastMonthReducer, allClosedLastWeekReducer, allClosedLastMonthReducer, allInProgressReducer, getByWardReducer, getByWardReducer2, allClosedLastWeekNumReducer, allOpenPriorityReducer } from './potholes';
import orders, { getOpenOrdersReducer } from './orders'
import comments from './comments';

const reducer = combineReducers({
  user,
  potholes,
  orders,
  comments,
  openOrders: getOpenOrdersReducer,
  timeComplete: timeCompleteReducer,
  reportedDay: reportedDayReducer,
  allOpen: allOpenReducer,
  allOpenPriority: allOpenPriorityReducer,
  allClosed: allClosedReducer,
  allOpenLastMonth: allOpenLastMonthReducer,
  allClosedLastWeek: allClosedLastWeekReducer,
  allClosedLastWeekNum: allClosedLastWeekNumReducer,
  allClosedLastMonth: allClosedLastMonthReducer,
  allInProgress: allInProgressReducer,
  wardHoles: getByWardReducer,
  wardHoles2: getByWardReducer2
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './potholes';
export * from './orders';
export * from './comments';
