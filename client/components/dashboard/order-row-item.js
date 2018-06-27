import React from 'react';
import { Header, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const OrderRowItem = props => (
  <Table.Row>
    <Table.Cell selectable singleLine textAlign="center">
      <Link to={`/orders/${props.id}`}>{props.id}</Link>
    </Table.Cell>
    <Table.Cell>
      <Header as="h4" textAlign="center">
        <a href={`/orders/${props.id}`}>{props.status}</a>
      </Header>
    </Table.Cell>
    <Table.Cell textAlign="center">{props.date}</Table.Cell>
    <Table.Cell textAlign="center">{props.authorizer}</Table.Cell>
    <Table.Cell textAlign="center">{props.crew}</Table.Cell>
  </Table.Row>
);

export default OrderRowItem;
