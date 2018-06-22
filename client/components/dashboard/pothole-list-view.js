import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGetLatestPotholesThunk } from '../../store';

class PotholeListView extends Component {
  constructor () {
    super()
    this.state = {
      page: 1
    }
  }

  componentDidMount() {
    this.props.getLatestPotholes(1)
  }

  handleClick = () => {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1
      }
    }, () => {
      this.props.getLatestPotholes(this.state.page)
    })
  }

  render () {
    const {requests, lastPage} = this.props.potholes
    return (
      <div>
        {
          requests.map(request => <p key={request.id}>{request.serviceNumber} - {request.status}</p>)
        }
        <p>Page {this.state.page} out of {lastPage}</p>
        <button onClick={this.handleClick} type="button">Next page</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    potholes: state.potholes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLatestPotholes: (page) => dispatch(createGetLatestPotholesThunk(page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PotholeListView)
