import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGetLatestOrdersThunk } from '../store';
import { Table, Button } from 'semantic-ui-react';
import { OrderRowItem } from './';
import history from '../history';
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
    if (this.props.isDashboardCard) history.push('/orders');
    else {
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
    }
  };

  render() {
    let { orders, lastPage } = this.props.orders;
    let buttonText = 'View More';
    if (this.props.isDashboardCard) {
      orders = orders.slice(6);
      buttonText = 'View All';
    }
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
        <Button
          primary
          onClick={this.handleClick}
          disabled={this.state.page === 1 && !this.props.isDashboardCard}
        >
          {buttonText}
        </Button>
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
