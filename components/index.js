import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {Router, Route, browserHistory } from 'react-router';
import reducers from '../reducers';
import App from './app';
import AddProduct from './add-new-product';
import ProductOverview from './product-overview';
import Edit from './edit';

const store = createStore(reducers);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/add" component={AddProduct} />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/product-overview/:id" component={ProductOverview} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
