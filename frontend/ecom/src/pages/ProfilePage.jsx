import React, { useEffect, Fragment } from 'react';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import Profile from '../components/common/Profile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';

const ProfilePage = ({ user, setUser }) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Fragment>
      <div className="Desktop">
        <NavMenuDesktop setUser={setUser} user={user} />
      </div>

      <div className="Mobile">
        <NavMenuMobile setUser={setUser} user={user} />
      </div>

      <Profile user={user} />

      <div className="Desktop">
        <FooterDesktop />
      </div>

      <div className="Mobile">
        <FooterMobile />
      </div>
    </Fragment>
  );
};

export default ProfilePage;
