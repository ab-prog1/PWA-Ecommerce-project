import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppURL from '../api/AppURL';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import Category from '../components/ProductDetails/Category';
import axios from 'axios';

const ProductCategoryPage = () => {
  const { category } = useParams();
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);

    const fetchData = async () => {
      try {
        const response = await axios.get(AppURL.ProductListByCategory(category));
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <Fragment>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>

      <div className="Mobile">
        <NavMenuMobile />
      </div>

      <Category Category={category} ProductData={productData} />

      <div className="Desktop">
        <FooterDesktop />
      </div>

      <div className="Mobile">
        <FooterMobile />
      </div>
    </Fragment>
  );
};

export default ProductCategoryPage;















// import React, { Component, Fragment, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import AppURL from '../api/AppURL'
// import FooterDesktop from '../components/common/FooterDesktop'
// import FooterMobile from '../components/common/FooterMobile'
// import NavMenuDesktop from '../components/common/NavMenuDesktop'
// import NavMenuMobile from '../components/common/NavMenuMobile'
// import Category from '../components/ProductDetails/Category'
// import axios from 'axios'

// //  class ProductCategoryPage extends Component {
//      const ProductCategoryPage = () => {
//           const { category } = useParams();
//           const [ProductData, setProductData] = useState([]);
        
//           useEffect(() => {
//             window.scroll(0,0);
          
//             axios.get(AppURL.ProductListByCategory(Category)).then(response =>{
//              this.setState({setProductData:response.data});         
     
//          }).catch(error=>{
     
//              });
//           }, [category]);
        

     
//           return (
//               <Fragment> 
//                <div className="Desktop">
//                 <NavMenuDesktop /> 
//                </div>

//                <div className="Mobile">
//                <NavMenuMobile />  
//                </div>                       

//                <Category Category={Category} ProductData={ProductData} /> 
             

//                <div className="Desktop">
//                <FooterDesktop/>
//                </div>

//                <div className="Mobile">
//                <FooterMobile/>
//                </div>
               
//           </Fragment>
//           )
//      }


// export default ProductCategoryPage

     // constructor({match}){
          // super();
          // this.state={
               // Category:match.params.category,
               // ProductData:[] 
          // }
     // }

     // componentDidMount(){
          // window.scroll(0,0)
          // alert(this.state.Category);
          // axios.get(AppURL.ProductListByCategory(this.state.Category)).then(response =>{
               
          //      this.setState({ProductData:response.data});         

          // }).catch(error=>{

          // });

     // } 
