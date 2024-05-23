import React, { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ProductDetails = ({ data }) => {
  const [productAllData, setProductAllData] = useState({});
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (data) {
      setProductAllData(data);
    }
  }, [data]);

  if (!productAllData.productList || !productAllData.productDetails) {
    return null; // or handle the case where productList or productDetails is not available
  }

  const { productList, productDetails } = productAllData;

  if (!productList[0] || !productDetails[0]) {
    return null; // or handle the case where the first item in productList or productDetails is not available
  }

  const imgOnClick = (imgSrc) => {
    setPreviewImage(imgSrc);
  };

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
  } = productList[0];

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
  } = productDetails[0];

  var ColorDiv = "d-none"
  if(color!="na"){
       let ColorArray = color.split(',');
       var ColorOption = ColorArray.map((ColorList,i)=>{
            return <option value={ColorList}> {ColorList} </option>
       })
       ColorDiv=""
  }
  else{
       ColorDiv="d-none"
  }


  var SizeDiv = "d-none"
  if(size!="na"){
       let SizeArray = size.split(',');
       var SizeOption = SizeArray.map((SizeList,i)=>{
            return <option value={SizeList}> {SizeList} </option>
       })
       SizeDiv=""
  }
  else{
       SizeDiv="d-none"
  }




  return (
    <Fragment>
      <Container fluid className="BetweenTwoSection">
        <Row className="p-2">
          <Col className="shadow-sm bg-white pb-3 mt-4" md={12} lg={12} sm={12} xs={12}>
            <Row>
              <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                <img id="previewImg" className="bigimage" src={previewImage || image_one} />
                <Container className="my-3">
                  <Row>
                    {[image_one, image_two, image_three, image_four].map((imgSrc, index) => (
                      <Col key={index} className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                        <img onClick={() => imgOnClick(imgSrc)} className="w-100 smallimage product-sm-img" src={imgSrc} />
                      </Col>
                    ))}
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
                <div className={ColorDiv}>
               <h6 className="mt-2"> Choose Color  </h6>
               <select className="form-control form-select">
               <option>Choose Color</option>
               {ColorOption}
               </select> 
               </div>


               <div className={SizeDiv}>
               <h6 className="mt-2"> Choose Size  </h6>
               <select className="form-control form-select">
               <option>Choose Size</option>
               {SizeOption}
               </select> 
               </div>

               <div className="" >
               <h6 className="mt-2"> Choose Quantity  </h6>
               <select className="form-control form-select">
               <option>Choose Quantity</option>
               <option value="01">01</option>
               <option value="02">02</option>
               <option value="03">03</option>
               <option value="04">04</option>
               <option value="05">05</option>
               <option value="06">06</option>
               <option value="07">07</option>
               <option value="08">08</option>
               <option value="09">09</option>
               <option value="10">10</option> 

               </select> 
               </div>
                <div className="input-group mt-3">
                  <button className="btn site-btn m-1"> <i className="fa fa-shopping-cart"></i> Add To Cart</button>
                  <button className="btn btn-primary m-1"> <i className="fa fa-car"></i> Order Now</button>
                  <button className="btn btn-primary m-1"> <i className="fa fa-heart"></i> Favourite</button>
                </div>
              </Col>
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
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ProductDetails;
