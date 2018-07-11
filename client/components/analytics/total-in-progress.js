import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getAllInProgressThunk } from '../../store/potholes'

class TotalInProgress extends React.Component {
  constructor(props) {
    super(props)
    this.props.getAllInProgress()
  }


  render() {
    return (
      <Card color="orange">
        <Card.Content>
          <Card.Header>Currently In Progress:</Card.Header>
          <Card.Description>
            <Icon circular name='warning sign' />
            {this.props.allInProgress}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allInProgress: state.allInProgress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllInProgress: () => dispatch(getAllInProgressThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalInProgress)
