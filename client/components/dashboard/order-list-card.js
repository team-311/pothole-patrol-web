import React from 'react';
import { Card } from 'semantic-ui-react'
import OrderListView from '../order-list-view'

const OrderListCard = (props) =>
(
  <Card>
    <Card.Content>
      <Card.Header>Recent Orders</Card.Header>
      <OrderListView isDashboardCard={true}/>
    </Card.Content>
  </Card>

)

export default OrderListCard
