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
export { Analytics } from './analytics';
