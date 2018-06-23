<<<<<<< HEAD
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  UserHome,
  Dashboard,
  SinglePothole,
} from './components';
import { me } from './store';
=======
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome, Dashboard, Analytics } from './components'
import { me } from './store'
>>>>>>> 4100ed42a867e5ca7643c6fb568a9de4ac3e3ec9

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
<<<<<<< HEAD
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
=======
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props
>>>>>>> 4100ed42a867e5ca7643c6fb568a9de4ac3e3ec9

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
<<<<<<< HEAD

        {isLoggedIn && (
=======
        {
          isLoggedIn &&
>>>>>>> 4100ed42a867e5ca7643c6fb568a9de4ac3e3ec9
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/dashboard" component={Dashboard} />
<<<<<<< HEAD
            <Route path="/singlepothole/:id" component={SinglePothole} />
          </Switch>
        )}
=======
            <Route path="/analytics" component={Analytics} />
          </Switch>
        }
>>>>>>> 4100ed42a867e5ca7643c6fb568a9de4ac3e3ec9
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
<<<<<<< HEAD
      dispatch(me());
    },
  };
};
=======
      dispatch(me())
    }
  }
}
>>>>>>> 4100ed42a867e5ca7643c6fb568a9de4ac3e3ec9

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
