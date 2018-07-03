import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getAllClosedLastWeekNumThunk } from '../../store/potholes'

class ClosedLastWeek extends React.Component {
  constructor(props) {
    super(props)
    this.props.getAllClosedLastWeekNum()
  }


  render() {
    return (
      <Card color="orange">
        <Card.Content>
          <Card.Header>Completed in Last 7 Days:</Card.Header>
          <Card.Description>
            <Icon name='check circle' />
            {this.props.allClosedLastWeekNum.length}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allClosedLastWeekNum: state.allClosedLastWeekNum
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllClosedLastWeekNum: () => dispatch(getAllClosedLastWeekNumThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClosedLastWeek)
