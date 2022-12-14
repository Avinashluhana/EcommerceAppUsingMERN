// import { composeWithDevTools } from "redux-devtools-extension";

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from "./Redux/reducer/productReducer";
import {
  profileReducer,
  userReducer,
  forgotPassword,
  allUsersReducer,
  userDetailsReducer,
} from "./Redux/reducer/userReducer";
import { cartReducer } from "./Redux/reducer/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./Redux/reducer/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPassword,
  cart: cartReducer,
  newReview: newReviewReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,

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
