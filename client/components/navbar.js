import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { Menu } from 'semantic-ui-react'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <Menu>
      <Menu.Item
        as={Link}
        name="dashboard"
        to="/dashboard"
        content="Dashboard"
      />
      {isLoggedIn ? (
        <Menu.Menu position="right">
          {/* The navbar will show these links after you log in */}
          <Menu.Item
            as={Link}
            name="allpotholes"
            to="/allpotholes"
            content="All-Potholes"
          />
          <Menu.Item
            as={Link}
            name="allorders"
            to="/orders"
            content="All-Orders"
          />
          <Menu.Item
            as={Link}
            name="analytics"
            to="/analytics"
            content="Analytics"
          />
          <Menu.Item
            as={Link}
            name="logout"
            to="/"
            content="Logout"
            onClick={handleClick}
          />
        </Menu.Menu>

      ) : (
          <Menu.Menu>
            {/* The navbar will show these links before you log in */}
            < Menu.Item
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
