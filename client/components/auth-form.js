import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import { Button, Segment, Form, Container, Grid, GridColumn, Divider } from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <Container>
      <Grid columns='equal'>
        <Grid.Column>
          <div />
        </Grid.Column>
        <Grid.Column width={8} style={{ marginTop: '5rem' }}>
          <Segment>
            <Form onSubmit={handleSubmit} name={name}>
              <Form.Field style={{ display: 'inline' }}>
                <label htmlFor="email"><small>Email</small></label>
                <input name="email" type="text" />
              </Form.Field>
              <Form.Field style={{ display: 'inline' }}>
                <label htmlFor="password"><small>Password</small></label>
                <input name="password" type="password" />
              </Form.Field>
              <Button primary type="submit" style={{ display: 'inline', marginTop: '1rem' }}>{displayName}</Button>
              {error && error.response && <div> {error.response.data} </div>}
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <div />
        </Grid.Column>
      </Grid>
    </Container >
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
