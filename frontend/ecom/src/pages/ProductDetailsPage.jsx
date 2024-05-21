import React, { Component, Fragment } from 'react';
import AppURL from '../api/AppURL';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import SuggestedProduct from '../components/ProductDetails/SuggestedProduct';
import axios from 'axios';
import SliderLoading from '../components/PlaceHolder/SliderLoading';

class ProductDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: props.match?.params?.code, // Ensure match and params are defined before accessing code
      ProductData: [],
      isLoading: '',
      mainDiv: 'd-none',
    };
  }

  componentDidMount() {
    window.scroll(0, 0);

    axios
      .get(AppURL.ProductDetails(this.state.code))
      .then((response) => {
        this.setState({
          ProductData: response.data,
          isLoading: 'd-none',
          mainDiv: '',
        });
      })
      .catch((error) => {
        // Handle error
      });
  }

  render() {
    if (this.state.mainDiv === 'd-none') {
      return (
        <Fragment>
          <div className="Desktop">
            <NavMenuDesktop />
          </div>
          <div className="Mobile">
            <NavMenuMobile />
          </div>
          <SliderLoading isLoading={this.state.isLoading} />
          <div className="Desktop">
            <FooterDesktop />
          </div>
          <div className="Mobile">
            <FooterMobile />
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className="Desktop">
            <NavMenuDesktop />
          </div>
          <div className="Mobile">
            <NavMenuMobile />
          </div>
          <ProductDetails data={this.state.ProductData} />
          <SuggestedProduct />
          <div className="Desktop">
            <FooterDesktop />
          </div>
          <div className="Mobile">
            <FooterMobile />
          </div>
        </Fragment>
      );
    }
  }
}

export default ProductDetailsPage;