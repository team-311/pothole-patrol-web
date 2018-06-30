import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGetLatestPotholesThunk } from '../../store';
import { Link } from 'react-router-dom';
import { Header, Container, Table, Button, Icon, Pagination } from 'semantic-ui-react';
import moment from 'moment'
import qs from 'query-string'

class AllPotholeView extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
    };
    this.getPriority = this.getPriority.bind(this);
  }

  componentDidMount() {
    const { page } = qs.parse(this.props.location.search)
    this.setState({
      page: Number(page) || 1,
    }, () => {
      this.props.getLatestPotholes(this.state.page);
    })
  }

  handlePageChange = (e, { activePage }) => {
    this.setState({
      page: activePage
    }, () => {
      this.props.getLatestPotholes(this.state.page);
      this.props.history.push(`${this.props.match.path}?page=${this.state.page}`)
    })
  };

  getPriority(num) {
    if (num <= 10) {
      return 'Low';
    } else if (num >= 20) {
      return 'Medium';
    } else {
      return 'High';
    }
  }

  render() {
    const { requests, lastPage } = this.props.potholes;
    return (
      <Container>
        <Header size="huge" textAlign="center">
          All Potholes
        </Header>
        <Table
          celled
          striped
          compact="very"
          selectable
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Service Number</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">ADDRESS</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">STATUS</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">PRIORITY</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">OPENED</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">WARD</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {requests.map(request => (
              <Table.Row key={request.id} onClick={() => this.props.history.push(`/potholes/${request.id}`)}>
                <Table.Cell textAlign="center" collapsing>{request.serviceNumber}</Table.Cell>
                <Table.Cell textAlign="left">{request.streetAddress}</Table.Cell>
                <Table.Cell textAlign="left">{request.status}</Table.Cell>
                <Table.Cell textAlign="center">{this.getPriority(request.priority)}</Table.Cell>
                <Table.Cell textAlign="left">{moment(request.createdAt).format('MM/DD/YYYY')}</Table.Cell>
                <Table.Cell textAlign="center">{request.ward}</Table.Cell>
              </Table.Row>
            ))}
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
    potholes: state.potholes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLatestPotholes: page => dispatch(createGetLatestPotholesThunk(page)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPotholeView);
