// import { composeWithDevTools } from "redux-devtools-extension";

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newReviewReducer,
  productDetailsReducer,
  productReducer,
} from "./Redux/reducer/productReducer";
import {
  profileReducer,
  userReducer,
  forgotPassword,
} from "./Redux/reducer/userReducer";
import { cartReducer } from "./Redux/reducer/cartReducer";
import {
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./Redux/reducer/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPassword,
  cart: cartReducer,
  review: newReviewReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,

});

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
