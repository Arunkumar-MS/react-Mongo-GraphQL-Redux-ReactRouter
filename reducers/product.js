
import {
    GET_PRODUCTS,
    DELETE_PRODUCTS,
    EDIT_PRODUCTS,
    ADD_NEW_PRODUCT,
    GET_PRODUCT,
    UPDATING,
    GET_PRODUCT_BY_ID,
    RESET_FlAGS
} from '../constents';

const initialState = {
  products: [],
  isLoading: false,
  added: false,
  product: {
    discription: "",
    id:"",
    price: "",
    quantity: "",
    title: "",
    url: ""
  }
}

export default function product(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return ({...state, products: action.value });
        case UPDATING:
            return ({...state, isLoading: action.value });
        case ADD_NEW_PRODUCT:
            return ({...state, added: action.value });
        case GET_PRODUCT_BY_ID:
            return ({...state, product: action.value[0]});
        case RESET_FlAGS:
            return ({...state, added: false });
        case EDIT_PRODUCTS:
            return ({...state, product: action.value});
        default:
            return state
    }
}
