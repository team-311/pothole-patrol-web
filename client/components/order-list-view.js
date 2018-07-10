import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGetLatestOrdersThunk } from '../store';
import { Table, Button, Container, Header, Icon, Pagination } from 'semantic-ui-react';
import { OrderRowItem } from './';
import history from '../history';
import moment from 'moment';
import qs from 'query-string'

class OrderListView extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const { page } = qs.parse(this.props.location.search)
    this.setState({
      page: Number(page) || 1
    }, () => {
      this.props.getLatestOrders(this.state.page)
    })
  }

  handlePageChange = (_, { activePage }) => {
    this.setState({
      page: activePage
    }, () => {
      this.props.getLatestOrders(this.state.page);
      this.props.history.push(`${this.props.match.path}?page=${this.state.page}`)
    })
  }

  render() {
    const { orders, lastPage } = this.props;
    return (
      <Container>
        <Header size="huge" textAlign="center">Recent Orders</Header>
        <Table celled
          striped
          compact="very"
          selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Id</Table.HeaderCell>
              <Table.HeaderCell singleLine textAlign="center">
                Status
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Date Created
              </Table.HeaderCell>
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
              const authorizerName = order.user ? order.user.name : 'Not Assigned'

              return (
                <OrderRowItem
                  key={order.id}
                  id={order.id}
                  status={order.status}
                  date={date}
                  authorizer={authorizerName}
                  crew={order.crew.name}
                  history={this.props.history}
                />
              );
            })}
          </Table.Body>
        </Table>
        <div className="pagination-component">
          <Pagination
            activePage={this.state.page}
            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            totalPages={lastPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    lastPage: state.orders.lastPage,
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
