import React, { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AppURL from '../../api/AppURL';
import axios from 'axios';
import cogoToast from 'cogo-toast';

const Favourite = ({ user }) => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState('');
  const [mainDiv, setMainDiv] = useState('d-none');
  const [pageRefreshStatus, setPageRefreshStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.FavouriteList(user.email))
      .then((response) => {
        setProductData(response.data);
        setIsLoading('d-none');
        setMainDiv(' ');
      })
      .catch((error) => {
        // Handle error
      });
  }, [user.email]);

  const removeItem = (event) => {
    const productCode = event.target.getAttribute('data-code');
    const email = user.email;

    axios
      .get(AppURL.FavouriteRemove(productCode, email))
      .then((response) => {
        cogoToast.success('Product Item Removed', { position: 'top-right' });
        setPageRefreshStatus(true);
      })
      .catch((error) => {
        cogoToast.error('Your Request is not done! Try Again', { position: 'top-right' });
      });
  };

  useEffect(() => {
    if (pageRefreshStatus) {
      navigate(window.location.pathname);
    }
  }, [pageRefreshStatus, navigate]);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  return (
    <Container className="text-center" fluid={true}>
      <div className="section-title text-center mb-55">
        <h2>MY FAVOURITE ITEMS</h2>
        <p>Some Of Our Exclusive Collection, You May Like</p>
      </div>

      <Row>
        {productData.map((productList, i) => (
          <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6} key={i}>
            <Card className="image-box card w-100">
              <img className="center w-75" src={productList.image} />
              <Card.Body>
                <p className="product-name-on-card">{productList.product_name}</p>
                <Button onClick={removeItem} data-code={productList.product_code} className="btn btn-sm">
                  <i className="fa fa-trash-alt"></i> Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favourite;