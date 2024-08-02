import React  from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Category = ({ ProductData, Category }) => {
  // Map over the product data and generate the view
  const MyView = ProductData.map((ProductList, i) => {
    return (
      <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6} key={i}>
        <Link className="text-link" to={`/productdetails/${ProductList.id}`}>
          <Card className="image-box card w-100">
            <img className="center w-75" src={ProductList.image} alt={ProductList.title} />
            <Card.Body>
              <p className="product-name-on-card">{ProductList.title}</p>
              <p className="product-price-on-card">
                Price : {ProductList.special_price === "na" 
                  ? `$${ProductList.price}` 
                  : <><strike className="text-secondary">${ProductList.price}</strike> ${ProductList.special_price}</>}
              </p>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    );
  });

  return (
    <Container className="text-center" fluid={true}>
      <div className="section-title text-center mb-55">
        <h2>{Category}</h2>
      </div>
      <Row>
        {MyView}
      </Row>
    </Container>
  );
};

export default Category;
