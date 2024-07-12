import React, { useState, useEffect, Fragment } from 'react';
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
    <Fragment>
      <NavMenuDesktop user={user} setUser={setUser} />
     
        <Routes>
          <Route path="/" element={<HomePage key={Date.now()} />} />
          <Route path="/login" element={<UserLoginPage key={Date.now()} />} />
          <Route path="/register" element={<RegisterPage key={Date.now()} />} />
          <Route path="/forget" element={<ForgetPasswordPage key={Date.now()} />} />
          <Route path="/reset/:id" element={<ResetPasswordPage key={Date.now()} />} />
          <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} key={Date.now()} />} />
          <Route path="/contact" element={<ContactPage key={Date.now()} />} />
          <Route path="/purchase" element={<PurchasePage key={Date.now()} />} />
          <Route path="/privacy" element={<PrivacyPage key={Date.now()} />} />
          <Route path="/refund" element={<RefundPage key={Date.now()} />} />
          <Route path="/about" element={<AboutPage key={Date.now()} />} />
          <Route path="/productdetails/:code" element={<ProductDetailsPage user={user} key={Date.now()} />} />
          <Route path="/notification" element={<NotificationPage key={Date.now()} />} />
          <Route path="/favourite" element={<FavouritePage user={user}  key={Date.now()} />} />
          <Route path="/cart" element={<CartPage key={Date.now()} />} />
          <Route path="/productcategory/:category" element={<ProductCategoryPage key={Date.now()} />} />
          <Route path="/productsubcategory/:category/:subcategory" element={<ProductSubCategoryPage key={Date.now()} />} />
          <Route path="/productbysearch/:searchkey" element={<SearchPage key={Date.now()} />} />
        </Routes>
    
    </Fragment>
  );
};

export default AppRoute;
