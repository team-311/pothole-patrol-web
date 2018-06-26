import React from 'react'
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTheme } from 'victory';
import { getTimeCompleteThunk } from '../../store/potholes'

class AvgTimeComplete extends React.Component {
  constructor(props) {
    super(props)
    this.props.getComplete()
  }

  render() {
    return (
      <div >
        <VictoryChart
          domainPadding={10}
          theme={VictoryTheme.material}
        >
          <VictoryAxis
            tickValues={["1", "2", "3", "4", "5", "6", "7+"]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x}`)}
          />
          <VictoryBar
            data={this.props.potholes}
            x={"time"}
            y={"count"}
            style={{ data: { fill: "red" } }}
          />
        </VictoryChart>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    potholes: state.timeComplete
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComplete: () => dispatch(getTimeCompleteThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvgTimeComplete)
