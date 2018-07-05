import React from 'react';
import { Header, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
//import history from '../history';

const OrderRowItem = props => {
  return (
    <Table.Row key={props.id} selectable onClick={() => props.history.push(`/orders/${props.id}`)}>
      <Table.Cell textAlign="center">{props.id}</Table.Cell>
      <Table.Cell textAlign="center">{props.status}</Table.Cell>
      <Table.Cell textAlign="center">{props.date}</Table.Cell>
      <Table.Cell textAlign="center">{props.authorizer}</Table.Cell>
      <Table.Cell textAlign="center">{props.crew}</Table.Cell>
    </Table.Row>
  )
};

export default OrderRowItem;
