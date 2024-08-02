import React, { Fragment, useState, useEffect, createContext, useContext} from 'react';
import { Route, Routes } from 'react-router-dom'; // Removed BrowserRouter as Router
import AppURL from '../api/AppURL';
import AboutPage from '../pages/AboutPage';
import CartPage from '../pages/CartPage';
import ContactPage from '../pages/ContactPage';
import FavouritePage from '../pages/FavouritePage';
import ForgetPasswordPage from '../pages/ForgetPasswordPage';
import HomePage from '../pages/HomePage';
import NotificationPage from '../pages/NotificationPage';
import PrivacyPage from '../pages/PrivacyPage';
import ProductCategoryPage from '../pages/ProductCategoryPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import ProductSubCategoryPage from '../pages/ProductSubCategoryPage';
import ProfilePage from '../pages/ProfilePage';
import PurchasePage from '../pages/PurchasePage';
import RefundPage from '../pages/RefundPage';
import RegisterPage from '../pages/RegisterPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import SearchPage from '../pages/SearchPage';
import UserLoginPage from '../pages/UserLoginPage';
import axios from 'axios';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import OrderListPage from '../pages/OrderListPage';


export  const UserContext = createContext();

const AppRoute = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(AppURL.UserData).then(response => {
      setUser(response.data);
    }).catch(error => {
      // Handle error
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
    <Fragment>
      <NavMenuDesktop />
          <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<UserLoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forget" element={<ForgetPasswordPage />} />
            <Route path="/reset/:id" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/purchase" element={<PurchasePage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/productdetails/:code" element={<ProductDetailsPage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/favourite" element={<FavouritePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/productcategory/:category" element={<ProductCategoryPage />} />
            <Route path="/productsubcategory/:category/:subcategory" element={<ProductSubCategoryPage />} />
            <Route path="/productbysearch/:searchkey" element={<SearchPage />} />
            <Route path="/orderlist" element={<OrderListPage />} />
        </Routes>
        </Fragment>
    </UserContext.Provider>
  );
};

export default AppRoute;
