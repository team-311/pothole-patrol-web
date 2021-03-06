import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getAllClosedLastMonthThunk } from '../../store/potholes'

class ClosedLastMonth extends React.Component {
  constructor(props) {
    super(props)
    this.props.getAllClosedLastMonth()
  }


  render() {
    return (
      <Card color='orange'>
        <Card.Content>
          <Card.Header>Completed in Last 30 Days:</Card.Header>
          <Card.Description>
            <Icon name='check circle' />
            {this.props.allClosedLastMonth}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allClosedLastMonth: state.allClosedLastMonth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllClosedLastMonth: () => dispatch(getAllClosedLastMonthThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClosedLastMonth)
