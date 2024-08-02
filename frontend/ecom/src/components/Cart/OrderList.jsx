import React, { useState, useEffect, useCallback, Fragment, useContext  } from 'react';
import AppURL from '../../api/AppURL';
import axios from 'axios';
import { Navbar, Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import { Navigate } from 'react-router-dom';
import {UserContext} from '../../route/AppRoute';


const OrderList = (props) => {
  const [productData, setProductData] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [reviewModal, setReviewModal] = useState(false);
  const [message, setMessage] = useState('');
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const email = props.user.email;
    axios.get(AppURL.OrderListByUser(email))
      .then(response => {
        setProductData(response.data);
      })
      .catch(error => {
        console.error(error);
        if (error.response) {
          // Server responded with a status other than 200 range
          setMessage(error.response.data.message || 'Server Error');
      } else if (error.request) {
          // Request was made but no response received
          setMessage('Network Error');
      } else {
          // Something happened in setting up the request
          setMessage('Error: ' + error.message);
      }
      });
  }, [props.user.email]);

  const reviewModalOpen = (product_code, product_name) => {
    setReviewModal(true);
    setProductCode(product_code);
    setProductName(product_name);
  };

  const reviewModalClose = () => {
    setReviewModal(false);
  };

  const postReview = useCallback(() => {
    if (name.length === 0) {
      cogoToast.error("Name Is Required", { position: 'top-right' });
    } else if (comment.length === 0) {
      cogoToast.error("Comment Is Required", { position: 'top-right' });
    } else if (rating.length === 0) {
      cogoToast.error("Rating Is Required", { position: 'top-right' });
    } else if (comment.length > 50) {
      cogoToast.error("Comments can't be more than 150 characters", { position: 'top-right' });
    } else {
      const formData = new FormData();
      formData.append('product_code', productCode);
      formData.append('product_name', productName);
      formData.append('reviewer_name', name);
      formData.append('reviewer_photo', "");
      formData.append('reviewer_rating', rating);
      formData.append('reviewer_comments', comment);

      axios.post(AppURL.PostReview, formData)
        .then(response => {
          if (response.data === 1) {
            cogoToast.success("Review Submitted", { position: 'top-right' });
            reviewModalClose();
          } else {
            cogoToast.error("Your Request is not done! Try Again", { position: 'top-right' });
          }
        })
        .catch(error => {
          cogoToast.error("Your Request is not done! Try Again", { position: 'top-right' });
        });
    }
  }, [name, rating, comment, productCode, productName]);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  const myList = productData;
  const myView = myList.map((productList, i) => (
    <div key={i}>
      <Col md={6} lg={6} sm={6} xs={6}>
        <h5 className="product-name">{productList.product_name}</h5>
        <h6> Quantity = {productList.quantity} </h6>
        <p>{productList.size} | {productList.color}</p>
        <h6>Price = {productList.unit_price} x {productList.quantity} = {productList.total_price}$</h6>
        <h6>Status = {productList.order_status} </h6>
      </Col>
      <Button onClick={() => reviewModalOpen(productList.product_code, productList.product_name)} className="btn btn-danger">Post Review</Button>
      <hr></hr>
    </div>
  ));

  return (
    <Fragment>
      <Container>
        <div className="section-title text-center mb-55">
          <h2>Order History By ( {props.user.name} )</h2>
        </div>
        <Card>
          <Card.Body>
            <Row>
              {myView}
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <Modal show={reviewModal} onHide={reviewModalClose}>
        <Modal.Header closeButton>
          <h6><i className="fa fa-bell"></i> Post Your Review</h6>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
            <label className="form-label">Your Name</label>
            <input onChange={(e) => setName(e.target.value)} className="form-control" type="text" placeholder={props.user.name} />
          </div>
          <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
            <label className="form-label">Select Product Rating</label>
            <select onChange={(e) => setRating(e.target.value)} className="form-control">
              <option value="">Choose</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
            <label className="form-label">Your Comment</label>
            <textarea onChange={(e) => setComment(e.target.value)} rows={2} className="form-control" type="text" placeholder="Your Comment" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={postReview}>Post</Button>
          <Button variant="secondary" onClick={reviewModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default OrderList;
