import React from 'react'
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { VictoryChart, VictoryAxis, VictoryBar, VictoryGroup, VictoryLabel, VictoryTheme } from 'victory';
import { getReportedPerDayThunk, getAllClosedLastWeekThunk } from '../../store/potholes'

class ReportedPerDay extends React.Component {
  constructor(props) {
    super(props)
    this.props.getReported()
    this.props.getAllClosedLastWeek()
  }


  render() {
    let dayArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    let retArr = []
    for (let i = 1; i <= 8; i++) {
      let date = new Date(new Date() - (i * 24 * 60 * 60 * 1000))
      retArr.push(dayArr[date.getDay()])
    }
    return (
      <div >
        <VictoryChart
          domainPadding={20}
          theme={VictoryTheme.material}
        >
          <VictoryLabel text={`All Potholes Open/Closed\n(Last 7 Days)`} x={180} y={30} textAnchor="middle" />
          <VictoryLabel text={`Open (Grey) || Closed (Orange)`} x={180} y={340} textAnchor="middle" />
          <VictoryLabel text={`# of Potholes`} angle={-90} x={10} y={180} textAnchor="middle" />
          <VictoryAxis
            style={{ tickLabels: { angle: -45 } }}
            tickValues={[1, 2, 3, 4, 5, 6, 7]}
            tickFormat={[`${dayArr[0]}`, `${dayArr[1]}`, `${dayArr[2]}`, `${dayArr[3]}`, `${dayArr[4]}`, `${dayArr[5]}`, `${dayArr[6]}`]}
          />
          <VictoryAxis
            dependentAxis={true}
            tickFormat={(x) => (`${x}`)}
          />
          <VictoryGroup offset={10} style={{ data: { width: 15 } }}>
            <VictoryBar
              data={this.props.potholes}
              x={"time"}
              y={"count"}
              style={{ data: { fill: "#36454F" } }}
            />
            <VictoryBar
              data={this.props.allClosedLastWeek}
              x={"time"}
              y={"count"}
              style={{ data: { fill: "#FC4C02" } }}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    potholes: state.reportedDay,
    allClosedLastWeek: state.allClosedLastWeek
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReported: () => dispatch(getReportedPerDayThunk()),
    getAllClosedLastWeek: () => dispatch(getAllClosedLastWeekThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportedPerDay)
