import api from '../api';
import {
    getProducts,
    deleteProducts,
    addProduct,
    productsById,
    editProduct
} from '../query';

import {
GET_PRODUCTS,
DELETE_PRODUCTS,
EDIT_PRODUCTS,
ADD_NEW_PRODUCT,
GET_PRODUCT,
UPDATING,
GET_PRODUCT_BY_ID
} from '../constents';
export function updateProduct(args, dispatch){
  return api(editProduct, args).then(results => {
    if(results.errors){
        return;
    }
    dispatch({
          type: EDIT_PRODUCTS,
          value: results.data.save
      });
    dispatch({type: ADD_NEW_PRODUCT, value: true});

  });
}

export function getProductById(args, dispatch){
  dispatch({
    type: UPDATING,
    value: true
  });
  return api(productsById, args).then(results => {
    if(results.errors){
        return;
    }
    dispatch({
          type: GET_PRODUCT_BY_ID,
          value: results.data.GetProductsById
      });
      dispatch({
        type: UPDATING,
        value: false
      });

  });
}
export function addNewProduct(args, dispatch) {
  dispatch({
        type: ADD_NEW_PRODUCT,
        value: false
    });
  return api(addProduct, args).then(results => {

    if(results.errors){
        return;
    };
    dispatch({
          type: ADD_NEW_PRODUCT,
          value: true
      });

  });

};

export function getProduct(dispatch) {
  dispatch({
    type: UPDATING,
    value: true
  });
    return api(getProducts).then(results => {
      if(results.errors){
        dispatch({
              type: 'nextSlot'
          });
          return;
      }
      dispatch({
        type: UPDATING,
        value: false
      });
      dispatch({
            type: GET_PRODUCTS,
            value: results.data.Products
        });

    });
};

export function deleteProduct(args, dispatch) {
  return api(deleteProducts, args ).then(results => {
    if(results.errors){
      dispatch({
            type: 'nextSlot',
            value: value
        });
        return;
    };
    getProduct(dispatch);
  });
}
