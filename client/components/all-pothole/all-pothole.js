import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGetLatestPotholesThunk } from '../../store';
import { Link } from 'react-router-dom';
import { Label, Menu, Table, Button } from 'semantic-ui-react'

class AllPotholeView extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    this.props.getLatestPotholes(1);
    console.log('here')
  }

  handleClick = () => {
    this.setState(
      prevState => {
        return {
          page: prevState.page + 1,
        };
      },
      () => {
        this.props.getLatestPotholes(this.state.page);
      }
    );
  };

  render() {
    const { requests, lastPage } = this.props.potholes;
    console.log(lastPage)
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>STATUS</Table.HeaderCell>
              <Table.HeaderCell>ADDRESS</Table.HeaderCell>
              <Table.HeaderCell>PRIORITY</Table.HeaderCell>
              <Table.HeaderCell>UPDATED AT</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {requests.map(request => (
              <Table.Row key={request.id}>
                <Table.Cell><Link to={`./singlepothole/${request.id}`}>{request.id}</Link></Table.Cell>
                <Table.Cell>{request.status}</Table.Cell>
                <Table.Cell>{request.streetAddress}</Table.Cell>
                <Table.Cell>{request.priority}</Table.Cell>
                <Table.Cell>{request.updatedAt}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button onClick={this.handleClick} type="button">Next Page >></Button>
      </div>
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
