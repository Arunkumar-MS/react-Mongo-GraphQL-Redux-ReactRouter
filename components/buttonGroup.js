import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
    DisableDelete
} from '../config';
import {
    deleteProduct,
    getProductById
} from '../actions/product';
 class ButtonActions extends Component {
  static propTypes ={
    row : PropTypes.object
  };
  deleteItem = (id) =>{
    deleteProduct({id}, this.props.dispatch);
  };
  viewDetails = (id) =>{
    getProductById({id}, this.props.dispatch);
  }
  render(){
    const id = this.props.row.id;
    return(
      <div className="btn-group">
      <Link to={`/edit/${id}`} className="btn btn-primary">Edit</Link>
      <Link to={`/product-overview/${id}`} className="btn btn-primary">View</Link>
      <button onClick={() => this.deleteItem(id)} disabled={ DisableDelete } type="button" className="btn btn-primary">Delete</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    dispatch
});


export default connect(
  mapDispatchToProps
)(ButtonActions)
