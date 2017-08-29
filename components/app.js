import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getProduct } from '../actions/product';
import List from './list';

export class App extends Component {

  componentDidMount() {
    getProduct(this.props.dispatch);
  }
  componentWillReceiveProps(nextProps) {
    document.body.classList.toggle('overlay', nextProps.isLoading)
  }
  componentWillUnmount() {
  document.body.classList.remove('overlay')
  }
  render() {
    const cssClassName = this.props.isLoading ? 'loader' : null;
    return(
        <div className="main-table-list">
          <Link to="/add" className="add-new btn btn-primary">Add new Product ></Link>
          <List products ={this.props.products}/>
          <div className={cssClassName}></div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.products,
  isLoading: state.product.isLoading
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

App.propTypes = {
  products: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
