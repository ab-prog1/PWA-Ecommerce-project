import React, { useEffect, Fragment, useContext  } from 'react';
import Cart from '../components/Cart/Cart';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import {UserContext} from '../route/AppRoute';

const CartPage = (props) => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user]);

  const User = props.user;

  return (
    <Fragment>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>

      <div className="Mobile">
        <NavMenuMobile />
      </div>

      <Cart user={User} />

      <div className="Desktop">
        <FooterDesktop />
      </div>

      <div className="Mobile">
        <FooterMobile />
      </div>
    </Fragment>
  );
};

export default CartPage;
