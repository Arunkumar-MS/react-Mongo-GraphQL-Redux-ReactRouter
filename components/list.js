import React, { Component, PropTypes } from 'react';
import TableRow from './table-row';
export default class List extends Component {
  static propTypes ={
    products : PropTypes.array
  }
  render(){

    return(
      <table className = "table table-striped product-list">
      <thead>
         <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
         </tr>
      </thead>
      <tbody>
          {!!this.props.products ? this.props.products.map((item) => {
              return (<TableRow key={item.id} row={item}/>);
          }): null}
      </tbody>
      </table>
    );
  }
}
