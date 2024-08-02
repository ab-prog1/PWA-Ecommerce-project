import React, { useEffect, useContext } from 'react';
import AppURL from '../api/AppURL';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import Categories from '../components/home/Categories';
import Collection from '../components/home/Collection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import HomeTop from '../components/home/HomeTop';
import HomeTopMobile from '../components/home/HomeTopMobile';
import NewArrival from '../components/home/NewArrival';
import axios from 'axios';
import {UserContext} from '../route/AppRoute';



const HomePage = (props) => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVisitorDetails();
  }, [user]);

  const fetchVisitorDetails = async () => {
    try {
      await axios.get(AppURL.VisitorDetails);
    } catch (error) {
      console.error('Error fetching visitor details:', error);
    }
  };

  return (
    <>
      <div className="Desktop">
        <NavMenuDesktop />
        <HomeTop />
      </div>

      <div className="Mobile">
        <NavMenuMobile />
        <HomeTopMobile />
      </div>                       

      <FeaturedProducts />
      <NewArrival />
      <Categories />
      <Collection />

      <div className="Desktop">
        <FooterDesktop />
      </div>

      <div className="Mobile">
        <FooterMobile />
      </div>
    </>
  );
};

export default HomePage;
