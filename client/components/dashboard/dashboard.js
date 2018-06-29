import React from 'react';
import { AllPotholeViewSmall, OrderListView } from '../';
import AverageTimeComplete from '../analytics/avg-time-complete'
import ReportedPerDay from '../analytics/reported-per-day'
import TotalOpen from '../analytics/total-open'
import TotalClosed from '../analytics/total-closed'
import ClosedLastWeek from '../analytics/closed-last-week'
import ClosedLastMonth from '../analytics/closed-last-month'
import TotalInProgress from '../analytics/total-in-progress'
import ByWard from '../analytics/by-ward'
import PriorityPie from '../analytics/priority-pie'
import { Table, Card, Text, Container } from 'semantic-ui-react';

const Dashboard = () => {
  return (
    <Container >
      <Card.Group itemsPerRow={5}>
        <TotalOpen />
        <TotalClosed />
        <ClosedLastWeek />
        <ClosedLastMonth />
        <TotalInProgress />
      </Card.Group>
      <Card.Group itemsPerRow={3}>
        <Card>
          <AverageTimeComplete />
        </Card>
        <Card>
          <ReportedPerDay />
        </Card>
        <Card>
          <ByWard />
        </Card>
      </Card.Group>
      <Card.Group itemsPerRow={3}>
        <Card>
          <PriorityPie />
        </Card>
      </Card.Group>
    </Container>
  );
};

export default Dashboard;
