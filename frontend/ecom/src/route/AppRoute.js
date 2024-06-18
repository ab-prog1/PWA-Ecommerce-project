import React, { Component, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppURL from '../api/AppURL';
import ContactPage from '../pages/ContactPage';
import HomePage from '../pages/HomePage';
import PrivacyPage from '../pages/PrivacyPage';
import PurchasePage from '../pages/PurchasePage';
import RefundPage from '../pages/RefundPage';
import UserLoginPage from '../pages/UserLoginPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import NotificationPage from '../pages/NotificationPage';
import FavouritePage from '../pages/FavouritePage';
import CartPage from '../pages/CartPage';
import AboutPage from '../pages/AboutPage';
import ProductCategoryPage from '../pages/ProductCategoryPage';
import ProductSubCategoryPage from '../pages/ProductSubCategoryPage';
import SearchPage from '../pages/SearchPage';
import RegisterPage from '../pages/RegisterPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ForgetPasswordPage from '../pages/ForgetPasswordPage';
import ProfilePage from '../pages/ProfilePage';
import axios from 'axios' 
import NavMenuDesktop from '../components/common/NavMenuDesktop';


class AppRoute extends Component {
     constructor(){
          super();
          this.state={
               user:{}
          }
     }

     componentDidMount(){
          axios.get(AppURL.UserData).then(response =>{ 
               this.setUser(response.data)
          }).catch(error=>{

          });
     }


     setUser = (user) => {
          this.setState({user:user})
     }

     render() {
          return (
               <Fragment>
                      <NavMenuDesktop user={this.state.user} setUser={this.setUser} />  
                    <Routes>
                         <Route exact path="/" element={<HomePage /> } />
                         <Route exact path="/login" element={<UserLoginPage />} /> 
                         <Route exact path="/contact" element={<ContactPage/>} /> 
                         <Route exact path="/purchase" element={<PurchasePage />} />
                         <Route exact path="/privacy" element={<PrivacyPage />} /> 
                         <Route exact path="/refund" element={<RefundPage/>} /> 
                         <Route exact path="/about" element={<AboutPage/>} />
                         <Route exact path="/productdetails/:code" element={<ProductDetailsPage/>} /> 
                         <Route exact path="/notification" element={<NotificationPage/>} /> 
                         <Route exact path="/favourite" element={<FavouritePage/>} /> 
                         <Route exact path="/cart" element={<CartPage/>} /> 
                         <Route exact path="/productcategory/:category" element={<ProductCategoryPage/>} /> 
                         <Route exact path="/productsubcategory/:category/:subcategory" element={<ProductSubCategoryPage/>} /> 
                         <Route exact path="/productbysearch/:searchkey" element={<SearchPage/>} />
                         <Route exact path="/register" element={<RegisterPage/>} />
                         <Route exact path="/forget" element={<ForgetPasswordPage/>} />
                         <Route exact path="/reset/:id" element={<ResetPasswordPage/>} />
                         <Route exact path="/profile" element={<ProfilePage user={this.state.user} />} />

                    </Routes>
               </Fragment>
          );
     }
}

export default AppRoute;
