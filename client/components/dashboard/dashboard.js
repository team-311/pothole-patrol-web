import React from 'react';
import { AllPotholeViewSmall, OrderListView } from '../';
import AverageTimeComplete from '../analytics/avg-time-complete'
import ReportedPerDay from '../analytics/reported-per-day'
import { Table, Card, Text, Container } from 'semantic-ui-react';

const Dashboard = () => {
  return (
    <Container >
      <Card.Group itemsPerRow={2}>
        <Card>
          <Card.Header>Average Days to Completion</Card.Header>
          <AverageTimeComplete />
        </Card>
        <Card>
          <Card.Header>Potholes Reported Per Day</Card.Header>
          <ReportedPerDay />
        </Card>
      </Card.Group>
      <Card.Group itemsPerRow={2}>
        <Card>
          <AllPotholeViewSmall />
        </Card>
        <Card>
          <OrderListView />
        </Card>
      </Card.Group>
    </Container >
  );
};

export default Dashboard;
