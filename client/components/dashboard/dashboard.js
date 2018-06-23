import React from 'react';
import { PotholeListView, OrderListView, Analytics, OrderListCard } from '../';

const Dashboard = () => {
  return (
    <div>
      <Analytics />
      <PotholeListView />
      <OrderListCard />
    </div>
  );
};

export default Dashboard;
