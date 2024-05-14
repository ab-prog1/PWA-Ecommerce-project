import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppURL from '../api/AppURL';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import axios from 'axios';
import SubCategory from '../components/ProductDetails/SubCategory';

const ProductSubCategoryPage = () => {
  const { category, subcategory } = useParams();
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);

    axios.get(AppURL.ProductListBySubCategory(category, subcategory))
      .then(response => {
        setProductData(response.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [category, subcategory]);

  return (
    <Fragment>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>

      <div className="Mobile">
        <NavMenuMobile />
      </div>

      <SubCategory Category={category} SubCategory={subcategory} ProductData={productData} />

      <div className="Desktop">
        <FooterDesktop />
      </div>

      <div className="Mobile">
        <FooterMobile />
      </div>
    </Fragment>
  );
};

export default ProductSubCategoryPage;




// import React, { Component } from 'react'
// import { Fragment } from 'react'
// import AppURL from '../api/AppURL'
// import FooterDesktop from '../components/common/FooterDesktop'
// import FooterMobile from '../components/common/FooterMobile'
// import NavMenuDesktop from '../components/common/NavMenuDesktop'
// import NavMenuMobile from '../components/common/NavMenuMobile'
// import axios from 'axios'
// import SubCategory from '../components/ProductDetails/SubCategory'

// class ProductSubCategoryPage extends Component {
//      constructor({match}){
//           super();
//           this.state={
//                Category:match.params.category,
//                SubCategory:match.params.subcategory,
//                ProductData:[] 
//           }
//      }

//      componentDidMount(){
//           window.scroll(0,0)
//           // alert(this.state.Category);
//           axios.get(AppURL.ProductListBySubCategory(this.state.Category,this.state.SubCategory)).then(response =>{
               
//                this.setState({ProductData:response.data});         

//           }).catch(error=>{

//           });

//      } 


//      render() {
//           return (
//                <Fragment> 
//                <div className="Desktop">
//                 <NavMenuDesktop /> 
//                </div>

//                <div className="Mobile">
//                <NavMenuMobile />  
//                </div>                       

//                <SubCategory Category={this.state.Category} SubCategory={this.state.SubCategory} ProductData={this.state.ProductData} />
               
               
//                <div className="Desktop">
//                <FooterDesktop/>
//                </div>

//                <div className="Mobile">
//                <FooterMobile/>
//                </div>
               
//           </Fragment>
//           )
//      }
// }

// export default ProductSubCategoryPage