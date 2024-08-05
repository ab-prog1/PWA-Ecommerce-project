import React, { useState, useEffect , useContext} from 'react';
import AppURL from '../api/AppURL';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import SliderLoading from '../components/PlaceHolder/SliderLoading';
import axios from 'axios';
import {UserContext} from '../route/AppRoute';


const ProductDetailsPage = ({ match, props }) => {
  const [code, setCode] = useState(match?.params?.code || '');
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainDiv, setMainDiv] = useState('d-none');
  const { user, setUser } = useContext(UserContext);



  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(AppURL.ProductDetails(code))
      .then(response => {
        setProductData(response.data);
        setIsLoading(false);
        setMainDiv('');
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [code, user]);

  return (
    <>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>

      <div className="Mobile">
        <NavMenuMobile />
      </div>

      {mainDiv === 'd-none' ? (
        <SliderLoading isLoading={isLoading} />
      ) : (
        <>
          <ProductDetails data={productData} user={user} />
        </>
      )}

      <div className="Desktop">
        <FooterDesktop />
      </div>

      <div className="Mobile">
        <FooterMobile />
      </div>
    </>
  );
};

export default ProductDetailsPage;
