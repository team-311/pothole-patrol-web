import React from 'react';
import { PotholeListView, Analytics, OrderListCard } from '../';

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
