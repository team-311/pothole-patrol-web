import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getAllOpenThunk } from '../../store/potholes'

class TotalOpen extends React.Component {
  constructor(props) {
    super(props)
    this.props.getAllOpen()
  }


  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Currently Open:</Card.Header>
          <Card.Description>
            <Icon circular name='calendar check outline' />
            {this.props.allOpen.length}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allOpen: state.allOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOpen: () => dispatch(getAllOpenThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalOpen)
