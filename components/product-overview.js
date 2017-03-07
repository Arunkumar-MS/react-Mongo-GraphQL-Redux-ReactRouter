import React, { Component, PropTypes } from 'react';
import { Link , browserHistory} from 'react-router';
import { connect } from 'react-redux';
import {
    DisableDelete
} from '../config';
import {
    deleteProduct,
    getProductById
} from '../actions/product';

class ProductOverview extends Component {
  componentDidMount() {
    const args = {
      id: this.props.params.id
    };
    getProductById(args, this.props.dispatch);

  }
  componentWillReceiveProps(nextProps) {
    document.body.classList.toggle('overlay', nextProps.isLoading)
  }
  componentWillUnmount() {
  document.body.classList.remove('overlay')
  }
  deleteItem = (id) => {
    deleteProduct({id}, this.props.dispatch);
    browserHistory.goBack();
  };
  render() {
    const cssClassName = this.props.isLoading ? 'loader' : null;
    const product = this.props.product;
    return(
      <div className="main-product-overview-wrapper">
      <div className="product-overview">
        <div className="product-image">
        <img src={product.url}/>
        </div>
        <div>
          <h3>{product.title}</h3>
          <div>  Price :{product.price} </div>
          <div>  quantity :{product.quantity} </div>
        </div>
        </div>
        <div className="discription">
          <strong>Product discription</strong>
          <p>{product.discription}</p>

          <div className="overview-submit-ctl">
            <Link to={`/edit/${this.props.product.id}`} className="btn btn-primary">Edit</Link>
            <button onClick={() => this.deleteItem(this.props.params.id)} disabled={ DisableDelete } type="button" className="btn btn-primary">Delete</button>
            <Link className="btn btn-primary" to="/"> Back to Home </Link>
          </div>
        </div>
        <div className={cssClassName}></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.product,
  isLoading: state.product.isLoading
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductOverview)
