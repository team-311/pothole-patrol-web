import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGetLatestOrdersThunk } from '../../store';
import { Table, Button, Icon } from 'semantic-ui-react';
import OrderRowItem from './order-row-item';
import moment from 'moment';

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
            <Table.HeaderCell textAlign="center">Id</Table.HeaderCell>
            <Table.HeaderCell singleLine textAlign="center">
              Status
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Date Created</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Authorizer</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Crew</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orders.map(order => {
            const formattedDate = moment(order.createdAt).format(
              'dddd MMMM D Y'
            );
            const [day, month, dayNumber, year] = formattedDate.split(' ');
            const date = [month, ' ', dayNumber, ', ', year].join('');
            return (
              <OrderRowItem
                key={order.id}
                id={order.id}
                status={order.status}
                date={date}
                authorizer={order.userId}
                crew={order.crewId}
              />
            );
          })}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.Cell textAlign='left' colSpan="4">
            Viewing {this.state.page} out of {lastPage}
              <Button
                floated="right"
                labelPosition="left"
                primary
                size="large"
                onClick={this.handleClick}
              >
              View More
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
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
