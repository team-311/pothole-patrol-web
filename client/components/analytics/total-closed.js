import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getAllClosedThunk } from '../../store/potholes'

class TotalClosed extends React.Component {
  constructor(props) {
    super(props)
    this.props.getAllClosed()
  }


  render() {
    return (
      <Card color="orange">
        <Card.Content>
          <Card.Header>Total Completed:</Card.Header>
          <Card.Description>
            <Icon circular name='check' />
            {this.props.allClosed.length}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allClosed: state.allClosed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllClosed: () => dispatch(getAllClosedThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalClosed)
