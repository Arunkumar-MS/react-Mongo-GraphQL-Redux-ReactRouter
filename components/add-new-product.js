import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {addNewProduct} from '../actions/product';
import {RESET_FlAGS} from '../constents';

class AddProduct extends Component {
  addProduct = () => {
    const args = {
      title:this.refs.title.value,
      url: this.refs.url.value,
      discription:this.refs.discription.value,
      price: this.refs.price.value,
      quantity: this.refs.qty.value
    };
    addNewProduct(args, this.props.dispatch);

  }
  resetToDefault = () => {
    this.refs.title.value = null;
    this.refs.url.value = null;
    this.refs.discription.value= null;
    this.refs.price.value= null;
    this.refs.qty.value= null;

  }
  componentDidMount() {
    this.props.dispatch({type: RESET_FlAGS});
  }
  componentWillReceiveProps(nextProps) {
    nextProps.added ? this.resetToDefault() : null;
  }
  render() {

    return(
      <div className="main-add-product-wrapper">
        <div className="main-add-product">
        <table>
        <tbody>
          <tr>
            <td>  <label> Product Title </label></td>
            <td><input ref ="title" type="text" className="form-control" /></td>
          </tr>
          <tr>
            <td>  <label> Product Price </label></td>
            <td><input ref ="price" type="text" className="form-control" /></td>
          </tr>
          <tr>
            <td>  <label> Product Quantity </label></td>
            <td><input ref ="qty" type="text" className="form-control" /></td>
          </tr>
          <tr>
            <td>  <label> Product Url </label></td>
            <td><input ref ="url" type="text" className="form-control" /></td>
          </tr>
          <tr>
            <td>  <label> Product discription </label></td>
            <td><textarea ref ="discription" rows="4" className="form-control" cols="50"></textarea>
            </td>
          </tr>
        </tbody>
        </table>
        <div className="submit-ctl">
          <button onClick = {() => this.addProduct()}type="button" className="btn btn-primary addBtn">Add</button>
          <Link className="btn btn-primary" to="/"> Back to Home </Link>
        </div>
        {this.props.added ? (<label> Added Succefully </label>) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  added: state.product.added
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct)
