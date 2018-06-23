import React from 'react'
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTheme } from 'victory';

const data = [
  { days: 1, number: 20 },
  { days: 2, number: 50 },
  { days: 3, number: 45 },
  { days: 4, number: 100 },
  { days: 5, number: 150 },
  { days: 6, number: 225 },
  { days: 7, number: 700 }
]

const data1 = [
  { date: 1, reported: 20 },
  { date: 2, reported: 5 },
  { date: 3, reported: 45 },
  { date: 4, reported: 17 },
  { date: 5, reported: 15 }
]

const data2 = [
  { date: 1, closed: 5 },
  { date: 2, closed: 10 },
  { date: 3, closed: 12 },
  { date: 4, closed: 7 },
  { date: 5, closed: 22 }
]

export const Analytics = (props) => {

  return (
    <Card.Group className="analyticsContainer">
      <Card
        fluid
        raised>
        <Card.Content>
          <Card.Header>
            Average Days to Completion
          </Card.Header>
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
              data={data}
              x={"days"}
              y={"number"}
            />
          </VictoryChart>
        </Card.Content>
      </Card>
      <Card
        fluid
        raised>
        <Card.Content>
          <Card.Header>
            Potholes Reported Per Day
          </Card.Header>
          <VictoryChart
            domainPadding={10}
            theme={VictoryTheme.material}
          >
            <VictoryAxis
              tickValues={["6/27", "6/28", "6/29", "6/30", "6/31"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`${x}`)}
            />
            <VictoryBar
              data={data1}
              x={"date"}
              y={"reported"}
            />
          </VictoryChart>
        </Card.Content>
      </Card>
      <Card
        fluid
        raised>
        <Card.Content>
          <Card.Header>
            Potholes Closed Per Day
          </Card.Header>
          <VictoryChart
            domainPadding={10}
            theme={VictoryTheme.material}
          >
            <VictoryAxis
              tickValues={["6/27", "6/28", "6/29", "6/30", "6/31"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`${x}`)}
            />
            <VictoryBar
              data={data2}
              x={"date"}
              y={"closed"}
            />
          </VictoryChart>
        </Card.Content>
      </Card>
    </Card.Group>
  )
}
