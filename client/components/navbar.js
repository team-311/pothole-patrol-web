import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { Menu } from 'semantic-ui-react'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <Menu borderless inverted id="navbar">
      {isLoggedIn && (
        <Menu.Menu>
          <Menu.Item
            as={Link}
            name="dashboard"
            to="/dashboard"
            content="PotholePatrol"
          />
          < Menu.Item
            as={Link}
            name="potholes"
            to="/potholes"
            content="Potholes"
          />
          <Menu.Item
            as={Link}
            name="allorders"
            to="/orders"
            content="Orders"
          />
        </Menu.Menu>
      )}
      {isLoggedIn && (
        < Menu.Menu position="right">
          <Menu.Item
            as={Link}
            name="logout"
            to="/"
            content="Logout"
            onClick={handleClick}
          />
        </Menu.Menu>
      )}{!isLoggedIn && (
        <Menu.Menu>
          {/* The navbar will show these links before you log in */}
          <Menu.Item
            as={Link}
            name="login"
            to="/login"
            content="Login"
          />
          <Menu.Item
            as={Link}
            name="signup"
            to="/signup"
            content="Signup"
          />
        </Menu.Menu>
      )}
    </Menu>
  </div >
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
