import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { VictoryChart, VictoryAxis, VictoryBar, VictoryStack, VictoryGroup, VictoryLabel, VictoryTheme } from 'victory';
import { getByWardThunk, getByWardThunk2 } from '../../store/potholes'

class ByWard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wardId: 1,
      wardId2: 2
    }
    this.props.getByWard(this.state.wardId)
    this.props.getByWard2(this.state.wardId2)
    this.handleChange = this.handleChange.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
  }

  handleChange(event, data) {
    console.log("data in handlechange: ", data)
    this.setState({ wardId: data.value }, () => {
      this.props.getByWard(this.state.wardId)
    })
  }

  handleChange2(event, data) {
    this.setState({ wardId2: data.value }, () => {
      this.props.getByWard2(this.state.wardId2)
    })
  }

  render() {
    let cArr = []
    let oArr = []
    for (let i = 0; i < this.props.wardHoles.length; i++) {
      if (this.props.wardHoles[i].status === 'Completed') {
        cArr.push(this.props.wardHoles[i])
      } else if (this.props.wardHoles[i].status === 'Open' || this.props.wardHoles[i].status === 'Open - Dup') {
        oArr.push(this.props.wardHoles[i])
      }
    }

    let dataObj1 = { status: 2, count: cArr.length }
    let dataObj2 = { status: 1, count: oArr.length }
    let returnArr = [dataObj2, dataObj1]

    let mapArray = []
    for (let y = 1; y < 51; y++) {
      mapArray.push(y)
    }

    let cArr2 = []
    let oArr2 = []
    for (let i = 0; i < this.props.wardHoles2.length; i++) {
      if (this.props.wardHoles2[i].status === 'Completed') {
        cArr2.push(this.props.wardHoles2[i])
      } else if (this.props.wardHoles2[i].status === 'Open' || this.props.wardHoles2[i].status === 'Open - Dup') {
        oArr2.push(this.props.wardHoles2[i])
      }
    }

    let dataObja = { status: 2, count: cArr2.length }
    let dataObjb = { status: 1, count: oArr2.length }
    let returnArr2 = [dataObjb, dataObja]
    let wardText = "Ward #" + this.state.wardId + " (green)    vs.    Ward #" + this.state.wardId2 + " (Black)"

    let mapArray2 = []
    for (let y = 1; y < 51; y++) {
      mapArray2.push(y)
    }

    return (
      <div >
        <VictoryChart
          domainPadding={{ x: 30 }}
          theme={VictoryTheme.material}
        >
          <VictoryLabel text={`Comparison by Ward\n(Last 30 Days)`} x={180} y={30} textAnchor="middle" />
          <VictoryLabel text={`# of Potholes`} angle={-90} x={10} y={180} textAnchor="middle" />
          <VictoryAxis
            style={{ tickLabels: { angle: -45 } }}
            tickValues={["total \nopen", "total \nclosed"]}
            tickFormat={(x) => (`${x}`)}
          />
          <VictoryAxis
            dependentAxis
            tickValues={[50, 100, 150, 200, 300, 400, 500, 600]}
            tickFormat={(x) => (`${x}`)}
          />
          <VictoryGroup offset={10} style={{ data: { width: 15 } }}>
            <VictoryBar
              data={returnArr}
              x={"status"}
              y={"count"}
              style={{ data: { fill: "#36454F" } }}
            />
            <VictoryBar
              data={returnArr2}
              x={"status"}
              y={"count"}
              style={{ data: { fill: "#FC4C02" } }}
            />
          </VictoryGroup >
        </VictoryChart>
        <Menu compact className="dropdownMenu">
          <Dropdown item scrolling placeholder={`Ward #${this.state.wardId} (grey)`} >
            <Dropdown.Menu>
              {mapArray.map(item => (
                <Dropdown.Item value={item} onClick={this.handleChange} key={item}>{item}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown item scrolling placeholder={`Ward #${this.state.wardId2} (orange)`} >
            <Dropdown.Menu >
              {mapArray2.map(item => (
                <Dropdown.Item value={item} onClick={this.handleChange2} key={item}>{item}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    wardHoles: state.wardHoles,
    wardHoles2: state.wardHoles2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getByWard: (id) => dispatch(getByWardThunk(id)),
    getByWard2: (id) => dispatch(getByWardThunk2(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ByWard)
