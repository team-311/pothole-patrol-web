import React from 'react'
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { VictoryChart, VictoryAxis, VictoryBar, VictoryLabel, VictoryTheme } from 'victory';
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
          <VictoryLabel text={`Total Days\n(from Open to Completion)`} x={180} y={30} textAnchor="middle" />
          <VictoryLabel text={`# of Potholes`} angle={-90} x={5} y={180} textAnchor="middle" />
          <VictoryLabel text={`# of Days`} x={180} y={340} textAnchor="middle" />
          <VictoryAxis
            tickValues={["1", "2", "3", "4", "5", "6", "7+"]}
            tickFormat={(x) => (`${x}`)}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x}`)}
          />
          <VictoryBar
            data={this.props.potholes}
            x={"time"}
            y={"count"}
            style={{ data: { fill: "#36454F" } }}
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
