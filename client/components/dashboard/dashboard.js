import React from 'react';
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
import { Table, Card, Text, Container } from 'semantic-ui-react';

const Dashboard = () => {
  return (
    <Container className="container">
      <Card.Group itemsPerRow={5}>
        <TotalOpen />
        <TotalClosed />
        <ClosedLastWeek />
        <ClosedLastMonth />
        <TotalInProgress />
      </Card.Group>
      <Card.Group itemsPerRow={4}>
        <Card color="blue">
          <AverageTimeComplete />
        </Card>
        <Card color="blue">
          <ReportedPerDay />
        </Card>
        <Card color="blue">
          <ByWard />
        </Card>
        <Card color="blue">
          <PriorityPie />
        </Card>
      </Card.Group>
      <OrderListViewSmall />
    </Container>
  );
};

export default Dashboard;
