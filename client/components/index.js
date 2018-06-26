/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export { default as Navbar } from './navbar';
export { default as UserHome } from './user-home';
export { Login, Signup } from './auth-form';
export { default as PotholeListView } from './dashboard/pothole-list-view';
export { default as Dashboard } from './dashboard/dashboard';
export { default as SinglePothole } from './single-pothole/SinglePotholeView';
export { Analytics } from './analytics/analytics';
export { AvgTimeComplete } from './analytics/avg-time-complete'
export { ReportedPerDay } from './analytics/reported-per-day'
export { default as OrderListCard } from './dashboard/order-list-card'
export { default as OrderRowItem } from './dashboard/order-row-item'
export { default as OrderListView } from './order-list-view'
export { default as SingleOrderView } from './single-order/SingleOrderView'
export { default as AllPotholeView } from './all-pothole/all-pothole'
export { default as PotholeRow } from './single-order/PotholeRow'
