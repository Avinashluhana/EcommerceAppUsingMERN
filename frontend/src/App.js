import { useEffect } from "react";
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

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
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
            <Route path="/password/update" element={<UpdatePassword />} exact />
          </Route>
          <Route path="/password/forgot" element={<ForgotPassword />} exact />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
