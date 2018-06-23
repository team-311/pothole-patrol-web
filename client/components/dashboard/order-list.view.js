import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGetLatestOrdersThunk } from '../../store';

class OrderListView extends Component {
  constructor () {
    super()
    this.state = {
      page: 1
    }
  }

  componentDidMount() {
    this.props.getLatestOrders(1)
  }

  handleClick = () => {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1
      }
    }, () => {
      this.props.getLatestOrders(this.state.page)
    })
  }

  render () {
    const {orders, lastPage} = this.props.orders
    return (
      <div>
        {
          orders.map(orders => <p key={order.id}>{order.status}</p>)
        }
        <p>Page {this.state.page} out of {lastPage}</p>
        <button onClick={this.handleClick} type="button">Next page</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLatestOrders: (page) => dispatch(createGetLatestOrdersThunk(page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListView)
