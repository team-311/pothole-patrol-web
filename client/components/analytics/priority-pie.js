import React from 'react'
import { Card, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { VictoryChart, VictoryAxis, VictoryPie, VictoryGroup, VictoryLabel, VictoryTheme } from 'victory';
import { getAllOpenPriorityThunk } from '../../store/potholes'

class PriorityPie extends React.Component {
  constructor(props) {
    super(props)
    this.props.getAllOpenPriority()
  }


  render() {

    let high = 0
    let medium = 0
    let low = 0

    for (let i = 0; i < this.props.allOpenPriority.length; i++) {
      if ((this.props.allOpenPriority[i].priority * 10) < 200) {
        low++
      } else if ((this.props.allOpenPriority[i].priority * 10) < 400) {
        medium++
      } else {
        high++
      }
    }

    return (
      <div >
        <h5 className="h5">Currently Open (By Priority) </h5>
        <VictoryPie
          colorScale={["#fc4c02", "#36454f", "#448812"]}
          data={[
            { x: `High (${high})`, y: high }, { x: `Medium (${medium})`, y: medium }, { x: `Low (${low})`, y: low }
          ]}
          labelRadius={60}
          style={{ labels: { fill: "white", fontSize: 13 } }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allOpenPriority: state.allOpenPriority,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOpenPriority: () => dispatch(getAllOpenPriorityThunk()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriorityPie)
