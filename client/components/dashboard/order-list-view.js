import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGetLatestOrdersThunk } from '../../store';
import { Header, Table, Container } from 'semantic-ui-react';
import OrderRowItem from './order-row-item';
import moment from 'moment'

class OrderListView extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    this.props.getLatestOrders(1);
  }

  handleClick = () => {
    this.setState(
      prevState => {
        return {
          page: prevState.page + 1,
        };
      },
      () => {
        this.props.getLatestOrders(this.state.page);
      }
    );
  };

  render() {
    const { orders, lastPage } = this.props.orders;
    return (
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell singleLine>Status</Table.HeaderCell>
              <Table.HeaderCell>Date Created</Table.HeaderCell>
              <Table.HeaderCell>Authorizer</Table.HeaderCell>
              <Table.HeaderCell>Crew</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {orders.map(order => <OrderRowItem key={order.id} id={order.id} status={order.status} date={order.createdAt} authorizer={order.userId} crew={order.crewId}/>)}
            <OrderRowItem />
          </Table.Body>
        </Table>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLatestOrders: page => dispatch(createGetLatestOrdersThunk(page)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderListView);
