import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGetLatestOrdersThunk } from '../../store';
import { Header, Table, Rating } from 'semantic-ui-react';

const OrderRowItem = props => (

  <Table.Row >
    <Table.Cell singleLine textAlign="center">{props.id}</Table.Cell>
    <Table.Cell>
      <Header as="h4" textAlign="center">
        {props.status}
      </Header>
    </Table.Cell>
    <Table.Cell textAlign="center">
      <a href="#">{props.date}</a>
    </Table.Cell>
    <Table.Cell textAlign="center">
      {props.authorizer}
    </Table.Cell >
    <Table.Cell textAlign="center">
      {props.crew}
    </Table.Cell>
  </Table.Row>
);

export default OrderRowItem;
