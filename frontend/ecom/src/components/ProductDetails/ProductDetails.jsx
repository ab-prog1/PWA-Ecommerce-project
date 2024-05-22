import React, { useState, useEffect, Fragment } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Product1 from '../../assets/images/product/product1.png'
import Product2 from '../../assets/images/product/product2.png'
import Product3 from '../../assets/images/product/product3.png'
import Product4 from '../../assets/images/product/product4.png'

const ProductDetails = ({ data }) => {
     const [productAllData, setProductAllData] = useState({});
   
     useEffect(() => {
       if (data) {
         setProductAllData(data);
       }
     }, [data]);
   
     if (!productAllData.productList || !productAllData.productDetails) {
       return null; // or handle the case where productList or productDetails is not available
     }
   
     const {
       productList,
       productDetails
     } = productAllData;
   
     if (!productList[0] || !productDetails[0]) {
       return null; // or handle the case where the first item in productList or productDetails is not available
     }
   
     const {
       title,
       brand,
       category,
       subcategory,
       image,
       price,
       product_code,
       remark,
       special_price,
       star
     } = productList[0]; // Access the first item in the productList array
   
     const {
       image_one,
       image_two,
       image_three,
       image_four,
       color,
       size,
       product_id,
       short_description,
       long_description
     } = productDetails[0]; // Access the first item in the productDetails array
   
     // Rest of your component code
   

  return (
    <Fragment>
      <Container fluid={true} className="BetweenTwoSection">
        <Row className="p-2">
          <Col className="shadow-sm bg-white pb-3 mt-4" md={12} lg={12} sm={12} xs={12}>
            <Row>
              <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                <img className="w-100" src={image_one} alt="product" />
                <Container className="my-3">
                  <Row>
                    <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                      <img className="w-100" src={image_one} alt="product" />
                    </Col>
                    <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                      <img className="w-100" src={image_two} alt="product" />
                    </Col>
                    <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                      <img className="w-100" src={image_three} alt="product" />
                    </Col>
                    <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                      <img className="w-100" src={image_four} alt="product" />
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                <h5 className="Product-Name"> {title} </h5>
                <h6 className="section-sub-title"> {short_description} </h6>
                <div className="input-group">
                  <div className="Product-price-card d-inline">Regular Price ${price}</div>
                  <div className="Product-price-card d-inline">50% Discount</div>
                  <div className="Product-price-card d-inline">New Price ${special_price}</div>
                </div>
                <h6 className="mt-2">Category : <b>{category}</b></h6>
                <h6 className="mt-2">SubCategory : <b>{subcategory}</b></h6>
                <h6 className="mt-2">Brand : <b>{brand}</b></h6>
                <h6 className="mt-2">Product Code : <b>{product_code}</b></h6>
                <div className="input-group mt-3">
                  <button className="btn site-btn m-1"> <i className="fa fa-shopping-cart"></i> Add To Cart</button>
                  <button className="btn btn-primary m-1"> <i className="fa fa-car"></i> Order Now</button>
                  <button className="btn btn-primary m-1"> <i className="fa fa-heart"></i> Favourite</button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6} lg={6} sm={12} xs={12}>
                <h6 className="mt-2">DETAILS</h6>
                <p> {long_description} </p>
              </Col>
              <Col md={6} lg={6} sm={12} xs={12}>
                <h6 className="mt-2">REVIEWS</h6>
                <p className="p-0 m-0"><span className="Review-Title">Kazi Ariyan</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </span> </p>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                <p className="p-0 m-0"><span className="Review-Title">Kazi Ariyan</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </span> </p>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                <p className="p-0 m-0"><span className="Review-Title">Kazi Ariyan</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </span> </p>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default ProductDetails;
