import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
          <Route path="/productdetails/:code" element={<ProductDetailsPage key={Date.now()} />} />
          <Route path="/notification" element={<NotificationPage key={Date.now()} />} />
          <Route path="/favourite" element={<FavouritePage key={Date.now()} />} />
          <Route path="/cart" element={<CartPage key={Date.now()} />} />
          <Route path="/productcategory/:category" element={<ProductCategoryPage key={Date.now()} />} />
          <Route path="/productsubcategory/:category/:subcategory" element={<ProductSubCategoryPage key={Date.now()} />} />
          <Route path="/productbysearch/:searchkey" element={<SearchPage key={Date.now()} />} />
        </Routes>
    
    </Fragment>
  );
};

export default AppRoute;



// import React, { Component, Fragment } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import AppURL from '../api/AppURL';
// import ContactPage from '../pages/ContactPage';
// import HomePage from '../pages/HomePage';
// import PrivacyPage from '../pages/PrivacyPage';
// import PurchasePage from '../pages/PurchasePage';
// import RefundPage from '../pages/RefundPage';
// import UserLoginPage from '../pages/UserLoginPage';
// import ProductDetailsPage from '../pages/ProductDetailsPage';
// import NotificationPage from '../pages/NotificationPage';
// import FavouritePage from '../pages/FavouritePage';
// import CartPage from '../pages/CartPage';
// import AboutPage from '../pages/AboutPage';
// import ProductCategoryPage from '../pages/ProductCategoryPage';
// import ProductSubCategoryPage from '../pages/ProductSubCategoryPage';
// import SearchPage from '../pages/SearchPage';
// import RegisterPage from '../pages/RegisterPage';
// import ResetPasswordPage from '../pages/ResetPasswordPage';
// import ForgetPasswordPage from '../pages/ForgetPasswordPage';
// import ProfilePage from '../pages/ProfilePage';
// import axios from 'axios';
// import NavMenuDesktop from '../components/common/NavMenuDesktop';



// class AppRoute extends Component {
//   constructor() {
//     super();
//     this.state = {
//       user: {}
//     };
//   }

//   componentDidMount() {
//     axios
//       .get(AppURL.UserData)
//       .then((response) => {
//         this.setUser(response.data);
//       })
//       .catch((error) => {});
//   }

//   setUser = (user) => {
//     this.setState({ user: user });
//   };

//   render() {
//     return (
//       <Fragment>
//         <NavMenuDesktop user={this.state.user} setUser={this.setUser} />
//         <Routes>
//           <Route exact path="/"  element={<HomePage {...props} key={Date.now()}/>} />
//           <Route exact path="/" render={(props) => <HomePage {...props} key={Date.now()} /> } />
//           <Route
//             exact
//             path="/login"
//             element={<UserLoginPage user={this.state.user} setUser={this.setUser}  />}
//           />
//           <Route exact path="/contact" element={<ContactPage />} />
//           <Route exact path="/purchase" element={<PurchasePage />} />
//           <Route exact path="/privacy" element={<PrivacyPage />} />
//           <Route exact path="/refund" element={<RefundPage />} />
//           <Route exact path="/about" element={<AboutPage />} />
//           <Route
//             exact
//             path="/productdetails/:code"
//             element={<ProductDetailsPage />}
//           />
//           <Route exact path="/notification" element={<NotificationPage />} />
//           <Route exact path="/favourite" element={<FavouritePage />} />
//           <Route exact path="/cart" element={<CartPage />} />
//           <Route
//             exact
//             path="/productcategory/:category"
//             element={<ProductCategoryPage />}
//           />
//           <Route
//             exact
//             path="/productsubcategory/:category/:subcategory"
//             element={<ProductSubCategoryPage />}
//           />
//           <Route
//             exact
//             path="/productbysearch/:searchkey"
//             element={<SearchPage />}
//           />
//           <Route
//             exact
//             path="/register"
//             element={<RegisterPage user={this.state.user} setUser={this.setUser} />}
//           />
//           <Route exact path="/forget" element={<ForgetPasswordPage />} />
//           <Route exact path="/reset/:id" element={<ResetPasswordPage />} />
//           <Route
//             exact
//             path="/profile"
//             element={<ProfilePage user={this.state.user} setUser={this.setUser}  />}
//           />
//         </Routes>
//       </Fragment>
//     );
//   }
// }

// export default AppRoute;
