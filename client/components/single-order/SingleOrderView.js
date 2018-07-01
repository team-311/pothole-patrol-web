import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createGetOrderThunk,
  createGetCrewListThunk,
  createUpdateOrderThunk,
  createGetLatestPotholesThunk,
} from '../../store';
import {
  Grid,
  Card,
  Table,
  List,
  Dropdown,
  Container,
} from 'semantic-ui-react';
import PotholeRow from './PotholeRow';
import moment from 'moment';

class SingleOrderView extends Component {
  constructor() {
    super();
    this.id = null;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    this.id = this.props.match.params.id;
    this.props.getOrder(this.id);
    this.props.getCrewList();
  };

  async handleChange(e, { value }) {
    const crew = this.props.crewList.find(c => c.id === value);
    const orderToUpdate = { ...this.props.order, crew: crew };

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
    const selectedCrewId = (this.props.order.crew || {}).id;
    return (
      <Container style={{ margin: '2rem 0' }}>
        <Grid stackable>
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
                        <Dropdown
                          onChange={this.handleChange}
                          options={this.props.crewList.map(crew => {
                            return {
                              key: crew.id,
                              text: crew.name,
                              value: crew.id,
                            };
                          })}
                          value={selectedCrewId}
                          style={{ margin: '0 1rem' }}
                        />
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
                    <a
                      href="tel://9999999999"
                      className="ui green basic button"
                    >
                      Contact Crew
                    </a>
                  </div>
                </Card.Content>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan="6">
                    Order Potholes
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
    crewList: state.orders.crewList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrder: id => dispatch(createGetOrderThunk(id)),
    getCrewList: () => dispatch(createGetCrewListThunk()),
    updateOrder: (order, orderId) =>
      dispatch(createUpdateOrderThunk(order, orderId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleOrderView);
