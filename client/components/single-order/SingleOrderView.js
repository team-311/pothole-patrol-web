import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createGetOrderThunk,
  createGetCrewThunk,
  createUpdateOrderThunk,
} from '../../store';
import {
  Grid,
  Card,
  Table,
  Button,
  List,
  Dropdown,
  Container,
} from 'semantic-ui-react';
import PotholeRow from './PotholeRow';
import moment from 'moment';

const options = [
  { key: 1, text: 'Moses Men', value: 'Moses Men' },
  {
    key: 2,
    text: 'Schuyler Shandies',
    value: 'Schuyler Shandies',
  },
  { key: 3, text: 'Rough Riders', value: 'Rough Riders' },
  { key: 4, text: 'French People', value: 'French People' },
  { key: 5, text: 'The Baristas', value: 'The Baristas' },
];

class SingleOrderView extends Component {
  constructor() {
    super();
    this.id = null;
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount = () => {
    this.id = this.props.match.params.id;
    this.props.getOrder(this.id);
  };

  async handleClick(event, data) {
    event.preventDefault();
    const crewId = data.value;
    await this.props.getCrew(crewId);
    const orderToUpdate = { ...this.props.order, crew: this.props.crew };

    await this.props.updateOrder(orderToUpdate, this.props.order.id);
  }

  render() {
    const order = this.props.order.potholes
      ? this.props.order
      : {
          crew: { name: '' },
          status: '',
          user: { firstName: '', lastName: '' },
        };
    const potholes = order.potholes
      ? order.potholes.filter(pothole => {
          return !pothole.status.endsWith('Dup');
        })
      : [];
    const formattedDate = moment(order.createdAt).format('dddd MMMM D Y');
    const [day, month, dayNumber, year] = formattedDate.split(' ');
    const date = [month, ' ', dayNumber, ', ', year].join('');
    const value = this.props.crew.name;
    return (
      <Container style={{ margin: '2rem 0' }}>
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
                      <List.Content>
                        Crew:
                        <Dropdown text={value} style={{ margin: '0 1rem' }}>
                          <Dropdown.Menu>
                            {options.map(crew => {
                              return (
                                <Dropdown.Item
                                  key={crew.key}
                                  value={crew.key}
                                  onClick={this.handleClick}
                                >
                                  {crew.value}
                                </Dropdown.Item>
                              );
                            })}
                          </Dropdown.Menu>
                        </Dropdown>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="user circle" />
                      <List.Content>
                        Commissioner:
                        {order.user.firstName
                          ? ' ' +
                            order.user.firstName +
                            ' ' +
                            order.user.lastName
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
                {potholes.length ? (
                  potholes.map(pothole => {
                    return <PotholeRow key={pothole.id} pothole={pothole} />;
                  })
                ) : (
                  <Table.Row colSpan="6">
                    <Table.Cell>No potholes to view (yet)</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.orders.order,
    crew: state.orders.crew,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrder: id => dispatch(createGetOrderThunk(id)),
    getCrew: id => dispatch(createGetCrewThunk(id)),
    updateOrder: (order, orderId) =>
      dispatch(createUpdateOrderThunk(order, orderId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleOrderView);
