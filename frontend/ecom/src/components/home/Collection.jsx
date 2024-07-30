import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import axios from "axios";
import CollectionLoading from "../PlaceHolder/CollectionLoading";
import { Link } from "react-router-dom";

const Collection = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainDiv, setMainDiv] = useState("d-none");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(AppURL.ProductListByRemark("COLLECTION"));
        setProductData(response.data);
        setIsLoading("d-none");
        setMainDiv(" ");
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching product data.");
        setIsLoading("d-none");
        setMainDiv(" ");
      }
    };
    fetchProductData();
  }, []);

  const CollectionList = productData;
  const MyView = CollectionList.map((item, i) => (
    <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6} key={i}>
      <Link className="text-link" to={"/productdetails/" + item.id}>
        <Card className="image-box card w-100">
          <img className="center w-75" src={item.image} />
          <Card.Body>
            <p className="product-name-on-card">{item.title}</p>
            <p className="product-price-on-card">
              Price :
              {item.special_price === "na" ? (
                `$${item.price}`
              ) : (
                <>
                  <strike className="text-secondary">${item.price}</strike> ${item.special_price}
                </>
              )}
            </p>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  ));

  return (
    <>
      <CollectionLoading isLoading={isLoading} />

      <div className={mainDiv}>
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>PRODUCT COLLECTION</h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>

          <Row>{MyView}</Row>
        </Container>
      </div>
    </>
  );
};

export default Collection;