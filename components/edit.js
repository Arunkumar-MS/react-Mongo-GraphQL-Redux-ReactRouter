import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
    getProductById,
    updateProduct
} from '../actions/product';

import {
    RESET_FlAGS
} from '../constents';

class Edit extends Component {
  constructor(props){
    super();
    this.state = {
      product: props.product
    };
  }
  editProduct = () =>{
    console.log(this.state.product);
    updateProduct(this.state.product, this.props.dispatch);
  }
  dataChanged = (data) => {
         this.setState({ product : {...this.state.product, ...data}})
     }
  componentWillReceiveProps(nextProps) {
    this.setState({
      product: nextProps.product
    });
  }
  componentDidMount() {
    const args = {
      id: this.props.params.id
    };
    getProductById(args, this.props.dispatch);
    this.props.dispatch({type: RESET_FlAGS});
  }
  render() {
    const product = this.state.product;
    return(
      <div className="main-add-product-wrapper">
        <div className="main-add-product">
        <table>
        <tbody>
          <tr>
            <td>  <label> Product Title </label></td>
            <td><input onChange={ (event) => this.dataChanged({title: event.target.value})} type="text" className="form-control" value={this.state.product.title} /></td>
          </tr>
          <tr>
            <td>  <label> Product Price </label></td>
            <td><input onChange={ (event) => this.dataChanged({price: event.target.value})} type="text" className="form-control" value={this.state.product.price} /></td>
          </tr>
          <tr>
            <td>  <label> Product Quantity </label></td>
            <td><input onChange={ (event) => this.dataChanged({quantity: event.target.value})} type="text" className="form-control" value={this.state.product.quantity}  /></td>
          </tr>
          <tr>
            <td>  <label> Product Url </label></td>
            <td><input onChange={ (event) => this.dataChanged({url: event.target.value})} type="text" className="form-control" value={this.state.product.url} /></td>
          </tr>
          <tr>
            <td>  <label> Product discription </label></td>
            <td><textarea onChange={ (event) => this.dataChanged({discription: event.target.value})} rows="4" className="form-control" cols="50" value={this.state.product.discription}  ></textarea>
            </td>
          </tr>
        </tbody>
        </table>
        <div className="submit-ctl">
          <button onClick = {() => this.editProduct()}type="button" className="btn btn-primary addBtn">Update</button>
          <Link className="btn btn-primary" to="/"> Back to Home </Link>
        </div>
        {this.props.added ? (<label> Updated Succefully </label>) : null}
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  added: state.product.added,
  product: state.product.product
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit)
