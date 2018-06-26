import React from 'react';
import { PotholeListView, AllPotholeViewSmall, OrderListView } from '../';
import { Table, Button, Container, Header } from 'semantic-ui-react';

const Dashboard = () => {
  return (
    <Container>
      <AllPotholeViewSmall />
      <OrderListView />
    </Container>
  );
};

export default Dashboard;
