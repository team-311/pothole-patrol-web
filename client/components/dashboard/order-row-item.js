import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGetLatestOrdersThunk } from '../../store';
import { Header, Table, Rating } from 'semantic-ui-react';

const OrderRowItem = props => (
  <Table.Row>
    <Table.Cell singleLine>{props.id}</Table.Cell>
    <Table.Cell>
      <Header as="h4" textAlign="center">
        {props.status}
      </Header>
    </Table.Cell>
    <Table.Cell textAlign="right">
      <a href="#">{props.date}</a>
    </Table.Cell>
    <Table.Cell>
      {props.authorizer}
    </Table.Cell>
    <Table.Cell>
      {props.crew}
    </Table.Cell>
  </Table.Row>
);

export default OrderRowItem;
