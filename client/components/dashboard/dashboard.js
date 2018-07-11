import React, { Component } from 'react';
import OrderListViewSmall from '../order-list-view-small';
import AverageTimeComplete from '../analytics/avg-time-complete'
import ReportedPerDay from '../analytics/reported-per-day'
import TotalOpen from '../analytics/total-open'
import TotalClosed from '../analytics/total-closed'
import ClosedLastWeek from '../analytics/closed-last-week'
import ClosedLastMonth from '../analytics/closed-last-month'
import TotalInProgress from '../analytics/total-in-progress'
import ByWard from '../analytics/by-ward'
import PriorityPie from '../analytics/priority-pie'
//import OrderListView from '../order-list-view'
import { Table, Card, Text, Container, Dimmer, Loader } from 'semantic-ui-react';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 4000)
  }

  render() {
    return (
      <Container className="container">
        <Dimmer active={this.state.loading}>
          <Loader inverted content="Loading Pothole Info..." />
        </Dimmer>
        <Card.Group itemsPerRow={5}>
          <TotalOpen />
          <TotalClosed />
          <ClosedLastWeek />
          <ClosedLastMonth />
          <TotalInProgress />
        </Card.Group>
        <Card.Group itemsPerRow={4}>
          <Card color="orange">
            <AverageTimeComplete />
          </Card>
          <Card color="orange">
            <ReportedPerDay />
          </Card>
          <Card color="orange">
            <ByWard />
          </Card>
          <Card color="orange">
            <PriorityPie />
          </Card>
        </Card.Group>
        <OrderListViewSmall history={this.props.history} />
      </Container>
    )
  }
}

export default Dashboard;
