import React from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment'

const PotholeRow = props => {
  const order = props.order;
  const formattedDate = moment(order.createdAt).format('dddd MMMM D Y');
  const [day, month, dayNumber, year] = formattedDate.split(' ');
  const date = [month, ' ', dayNumber, ', ', year].join('');

  return (
    <Table.Row>
      <Table.Cell>{order.serviceNumber}</Table.Cell>
      <Table.Cell>{order.status}</Table.Cell>
      <Table.Cell>{date}</Table.Cell>
      <Table.Cell>{order.mostRecentAction || 'No Recent Actions'}</Table.Cell>
      <Table.Cell>{order.ward}</Table.Cell>
      <Table.Cell selectable>
        <a href="#">{order.zip}</a>
      </Table.Cell>
    </Table.Row>
  );
};

export default PotholeRow
