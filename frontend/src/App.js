import { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import About from "./component/About/About";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignup from "./component/User/LoginSignup";
import Profile from "./component/User/Profile";
import store from "./store";
import { loadUser } from "./Redux/actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";

import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./component/Orders/MyOrders";
import OrderDetails from "./component/Orders/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList.js";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState();

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/about" element={<About />} exact />
          <Route path="/product/:id" element={<ProductDetails />} exact />
          <Route path="/products" element={<Products />} exact />
          <Route path="/products/:keyword" element={<Products />} exact />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginSignup />} exact />
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Profile />} exact />
            <Route path="/" element={<Home />} exact />
            <Route path="/me/update" element={<UpdateProfile />} exact />
            {isAuthenticated && user.role === "admin" && (
              <Route path="/shipping" element={<Shipping />} exact />
            )}
            <Route path="/admin/products" element={<ProductList />} exact />

            <Route path="/password/update" element={<UpdatePassword />} exact />
            <Route path="/order/confirm" element={<ConfirmOrder />} exact />
            {stripeApiKey && (
              <Route
                exact
                path="/process/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}
            <Route path="/success" element={<OrderSuccess />} exact />
            <Route path="/orders" element={<MyOrders />} exact />
            <Route path="/order/:id" element={<OrderDetails />} exact />
            <Route path="/admin/orders" element={<Dashboard />} exact />
            <Route path="/admin/users" element={<Dashboard />} exact />
          </Route>
          {/* admin Routes */}

          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} exact />
          </Route>

          <Route path="/password/forgot" element={<ForgotPassword />} exact />
          <Route
            path="/password/reset/:token"
            element={<ResetPassword />}
            exact
          />
          <Route path="/cart" element={<Cart />} exact />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
