import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppURL from '../../api/AppURL';
import axios from 'axios';
import FeaturedLoading from '../PlaceHolder/FeaturedLoading';

const FeaturedProducts = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState("d-none");
  const [mainDiv, setMainDiv] = useState("d-none");

  useEffect(() => {
    axios.get(AppURL.ProductListByRemark("FEATURED"))
      .then(response => {
        setProductData(response.data);
        setIsLoading("d-none");
        setMainDiv("");
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const myView = productData.map((item, i) => (
    <Col className="p-1" key={i} xl={2} lg={2} md={2} sm={4} xs={6}>
      <Link className="text-link" to={`/productdetails/${item.id}`}>
        <Card className="image-box card">
          <img className="center" src={item.image} alt={item.title} />
          <Card.Body>
            <p className="product-name-on-card">{item.title}</p>
            <p className="product-price-on-card">
              Price : {item.special_price === "na" ?
                `$${item.price}` :
                <>
                  <strike className="text-secondary">${item.price}</strike> ${item.special_price}
                </>
              }
            </p>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  ));

  return (
    <>
      <FeaturedLoading isLoading={isLoading} />
      <div className={mainDiv}>
        <Container className="text-center" fluid>
          <div className="section-title text-center mb-55">
            <h2>FEATURED PRODUCT</h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>
          <Row>
            {myView}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FeaturedProducts;
