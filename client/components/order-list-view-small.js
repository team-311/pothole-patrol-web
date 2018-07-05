import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOpenOrdersThunk } from '../store';
import { Table, Button, Container, Header, Card, Pagination } from 'semantic-ui-react';
import { OrderRowItem } from './';
import moment from 'moment';

class OrderListViewSmall extends Component {
  constructor() {
    super();
    //this.props.getOpenOrders()
  }

  componentDidMount() {
    this.props.getOpenOrders()
  }

  render() {
    console.log("props (orders): ", this.props.openOrders)
    return (
      <div>
        <div>
          <Header size="huge" textAlign="center" className="currHead">Current Orders:</Header>
          <Table
            celled
            striped
            compact="very"
            selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Status</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Date Created</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Authorizer</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Crew</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {!!this.props.openOrders && (this.props.openOrders.map(order => {
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
                    authorizer={order.user.name}
                    crew={order.crew.name}
                    history={this.props.history}
                  />
                );
              }))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    openOrders: state.openOrders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOpenOrders: () => dispatch(getOpenOrdersThunk()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderListViewSmall);
