import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createGetOrderThunk} from '../../store'

class SingleOrderView extends Component {
  constructor(){
    super()
  }

  componentDidMount = () => {
    const id = this.props.match.params.id
    this.props.getOrder(id)
  }

  render(){
    return (
      <div></div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    order: state.orders.order
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (id) => dispatch(createGetOrderThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrderView)
