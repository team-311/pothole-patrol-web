import React from 'react'
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTheme } from 'victory';
import AvgTimeComplete from './avg-time-complete'
import ReportedPerDay from './reported-per-day'

export class Analytics extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <Card.Group itemsPerRow={3}>
        <Card
          fluid
          raised
        >
          <Card.Content>
            <Card.Header>
              Time to Completion
            </Card.Header>
            <AvgTimeComplete />
          </Card.Content>
        </Card>
        <Card
          fluid
          raised
        >
          <Card.Content>
            <Card.Header>
              Reported Per Day
            </Card.Header>
            <ReportedPerDay />
          </Card.Content>
        </Card>
      </Card.Group>
    )
  }
}

