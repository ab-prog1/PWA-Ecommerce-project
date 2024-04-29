import React, { Component, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import ContactPage from '../pages/ContactPage';
import HomePage from '../pages/HomePage';
import PrivacyPage from '../pages/PrivacyPage';
import PurchasePage from '../pages/PurchasePage';
import RefundPage from '../pages/RefundPage';
import UserLoginPage from '../pages/UserLoginPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import NotificationPage from '../pages/NotificationPage';



class AppRoute extends Component {
     render() {
          return (
               <Fragment>
                    <Routes>
                         <Route exact path="/" element={<HomePage />} />
                         <Route exact path="/login" element={<UserLoginPage />} /> 
                         <Route exact path="/contact" element={<ContactPage/>} /> 

                         <Route exact path="/PurchasePage" element={<PurchasePage />} />
                         <Route exact path="/PrivacyPage" element={<PrivacyPage />} /> 
                         <Route exact path="/RefundPage" element={<RefundPage/>} /> 

                         <Route exact path="/productdetails" element={<ProductDetailsPage/>} /> 
                         <Route exact path="/notification" element={<NotificationPage/>} /> 

                      
                    </Routes>
               </Fragment>
          );
     }
}

export default AppRoute;
