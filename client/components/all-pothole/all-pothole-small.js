import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGetLatestPotholesThunk } from '../../store';
import { Link } from 'react-router-dom';
import { Header, Container, Table, Button } from 'semantic-ui-react'

class AllPotholeViewSmall extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    this.props.getLatestPotholes(1);
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
    return (
      <Container>
        <Header size="huge" textAlign="center">Recent Potholes</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">STATUS</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">ADDRESS</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {requests.map(request => (
              <Table.Row key={request.id}>
                <Table.Cell textAlign="center"><Link to={`./singlepothole/${request.id}`}>{request.id}</Link></Table.Cell>
                <Table.Cell textAlign="center">{request.status}</Table.Cell>
                <Table.Cell textAlign="center">{request.streetAddress}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button onClick={this.handleClick} type="button">Next Page >></Button>
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
)(AllPotholeViewSmall);
