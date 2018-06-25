import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGetOrderThunk } from '../../store';
import { Grid, Card, Table, Button, List } from 'semantic-ui-react';
import PotholeRow from './PotholeRow';
import moment from 'moment';

class SingleOrderView extends Component {
  constructor() {
    super();
    this.id = null;
  }

  componentDidMount = () => {
    this.id = this.props.match.params.id;
    this.props.getOrder(this.id);
  };

  render() {
    const order = this.props.order.potholes ? this.props.order : {crew: {name: ''}, status: '', user: {firstName: '', lastName: ''}}
    const potholes = order.potholes
      ? order.potholes.filter(pothole => {
          return !pothole.status.endsWith('Dup');
        })
      : [];
    const formattedDate = moment(order.createdAt).format('dddd MMMM D Y');
    const [day, month, dayNumber, year] = formattedDate.split(' ');
    const date = [month, ' ', dayNumber, ', ', year].join('');
    return (
      <Grid>
        <Grid.Column width={4}>
          <Card>
            <Card.Content>
              <Card.Header>Viewing Order #{this.id}</Card.Header>
              <Card.Meta>
                <span className="date">Ordered on {date}</span>
              </Card.Meta>
              <Card.Content extra>
                <List>
                <List.Header>Status: {order.status}</List.Header>
                  <List.Item>
                    <List.Icon name="users" />
                    <List.Content>Crew: {order.crew.name}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="user circle" />
                    <List.Content>
                      Commissioner:
                      {order.user.firstName
                        ? ' ' + order.user.firstName + ' ' + order.user.lastName
                        : 'Unknown authorizer'}{' '}
                    </List.Content>
                  </List.Item>
                </List>
              </Card.Content>
              <Card.Content extra>
                <div>
                  <Button basic color="green">
                    Contact Crew
                  </Button>
                </div>
              </Card.Content>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={9}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="6">
                  This Order's Potholes
                </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Service #</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Open Since</Table.HeaderCell>
                <Table.HeaderCell>Most Recent Action</Table.HeaderCell>
                <Table.HeaderCell>Ward</Table.HeaderCell>
                <Table.HeaderCell>Zip</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {potholes.length ? potholes.map(pothole => {
                return <PotholeRow key={pothole.id} pothole={pothole} />;
              }) : <Table.Row colSpan="6"><Table.Cell>No potholes to view (yet)</Table.Cell></Table.Row>}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.orders.order,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrder: id => dispatch(createGetOrderThunk(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleOrderView);
