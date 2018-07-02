import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGetPotholesThunk } from '../../store';
import { Header, Container, Table, Icon, Pagination, Dropdown, Form } from 'semantic-ui-react';
import moment from 'moment'
import qs from 'query-string'

const statusOptions = [
  {key: 'open', value: 'open', text: 'Open'},
  {key: 'completed', value: 'completed', text: 'Completed'}
]

const sortOptions = [
  { key: 'opened.asc', value: 'opened.asc', text: 'Earliest' },
  { key: 'opened.desc', value: 'opened.desc', text: 'Latest' }
]

const wardOptions = new Array(50).fill(0).map((item, i) => {
  return {
    key: i + 1,
    value: i + 1,
    text: i + 1,
  }
})

class AllPotholeView extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      filters: {
        status: '',
        ward: null,
      },
      sort: '',
      query: '',
    };
    this.getPriority = this.getPriority.bind(this);
  }

  componentDidMount() {
    const { page, sort, status, ward } = qs.parse(this.props.location.search)
    this.setState({
      page: Number(page) || 1,
      sort: sort || '',
      filters: {
        status: status || '',
        ward: ward || null,
      }
    }, () => {
      const query = this.buildQuery()
      this.props.getPotholes(query, this.state.page);
      this.setState({query})
    })
  }

  handlePageChange = (e, { activePage }) => {
    this.setState({
      page: activePage
    }, () => {
      this.props.getPotholes(this.state.query, this.state.page);
      const search = (this.state.query) ? `${this.state.query}&page=${this.state.page}` : `page=${this.state.page}`
      this.props.history.push(`${this.props.match.url}?${search}`)
    })
  }

  handleFilterChange = (e, target) => {
    if (this.state.filters[target.name] !== target.value) {
      this.setState((state) => {
        return {
          filters: {...state.filters, [target.name]: target.value}
        }
      }, () => {
        const query = this.buildQuery()
        this.props.getPotholes(query, 1)
        this.props.history.push(`${this.props.match.path}?${query}`)
        this.setState({query})
      })
    }
  }

  handleSortChange = (e, { value }) => {
    this.setState({
      sort: value,
      page: 1,
    }, () => {
      const query = this.buildQuery()
      this.props.getPotholes(query, 1)
      this.props.history.push(`${this.props.match.path}?${query}`)
      this.setState({query})
    })
  }

  buildQuery = () => {
    const queryObj = {}
    if (this.state.sort) queryObj.sort = this.state.sort
    Object.keys(this.state.filters).forEach(key => {
      if (this.state.filters[key]) {
        queryObj[key] = this.state.filters[key]
      }
    })

    if (Object.keys(queryObj).length > 0) return qs.stringify(queryObj)
    else return null
  }

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
          <div className="data-querying">
            <div className="data-filtering">
              <div>
                <label>Filter by Status</label>
                <Dropdown
                  placeholder="--"
                  options={statusOptions}
                  value={this.state.filters.status}
                  onChange={this.handleFilterChange}
                  name="status"
                  selection
                />
              </div>
              <div>
                <label>Filter by Ward</label>
                <Dropdown
                  placeholder="--"
                  options={wardOptions}
                  value={this.state.filters.ward}
                  onChange={this.handleFilterChange}
                  name="ward"
                  search
                  selection
                />
              </div>
            </div>
            <div className="data-sorting">
              <label>Sort by Date Opened</label>
              <Dropdown
                placeholder="--"
                selection
                options={sortOptions}
                value={this.state.sort}
                onChange={this.handleSortChange}
              />
            </div>
          </div>
          <Table
            celled
            striped
            compact="very"
            selectable
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">SERVICE NUMBER</Table.HeaderCell>
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
                  <Table.Cell textAlign="center">{request.serviceNumber}</Table.Cell>
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
    getPotholes: (query, page) => dispatch(createGetPotholesThunk(query, page)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPotholeView);
