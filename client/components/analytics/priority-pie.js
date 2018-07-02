import React from 'react'
import { Card } from 'semantic-ui-react'
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
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 12 }}
          x={10} y={10}
          text="Open by Priority:"
        />
        <VictoryPie
          colorScale={["red", "orange", "green"]}
          data={[
            { x: `High (${high})`, y: high }, { x: `Medium (${medium})`, y: medium }, { x: `Low (${low})`, y: low }
          ]}
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
