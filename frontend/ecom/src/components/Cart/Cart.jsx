import React, { useState, useEffect, Fragment } from 'react';
import {  Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Navigate  } from 'react-router-dom';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import AppURL from '../../api/AppURL';
import { useNavigate } from 'react-router-dom';

const Cart = ({ user }) => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Remove this line if isLoading is not used
    const [mainDiv, setMainDiv] = useState("d-none");
  const [pageRefreshStatus, setPageRefreshStatus] = useState(false);
  const [pageRedirectStatus, setPageRedirectStatus] = useState(false);
  const [confirmBtn, setConfirmBtn] = useState(''); // Remove this line if setConfirmBtn is not used
  const [city, setCity] = useState("");
  const [payment, setPayment] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(AppURL.CartList(user.email))
      .then(response => {
        setProductData(response.data);
        setIsLoading("d-none");
        setMainDiv("");
      })
      .catch(error => {
        cogoToast.error("Failed to load cart items.", { position: 'top-right' });
      });
  }, [user.email]);

  useEffect(() => {
    if (pageRefreshStatus) {
      window.location.reload();
    }
  }, [pageRefreshStatus]);

  useEffect(() => {
    if (pageRedirectStatus) {
      navigate('/orderlist');
    }
  }, [pageRedirectStatus, navigate]);

  const removeItem = id => {
    axios.get(AppURL.RemoveCartList(id))
      .then(response => {
        if (response.data === 1) {
          cogoToast.success("Cart Item Removed", { position: 'top-right' });
          setPageRefreshStatus(true);
        } else {
          cogoToast.error("Request not completed! Try again", { position: 'top-right' });
        }
      })
      .catch(error => {
        cogoToast.error("Request not completed! Try again", { position: 'top-right' });
      });
  };

  const itemPlus = (id, quantity, price) => {
    axios.get(AppURL.CartItemPlus(id, quantity, price))
      .then(response => {
        if (response.data === 1) {
          cogoToast.success("Item Quantity Increased", { position: 'top-right' });
          setPageRefreshStatus(true);
        } else {
          cogoToast.error("Request not completed! Try again", { position: 'top-right' });
        }
      })
      .catch(error => {
        cogoToast.error("Request not completed! Try again", { position: 'top-right' });
      });
  };

  const itemMinus = (id, quantity, price) => {
    axios.get(AppURL.CartItemMinus(id, quantity, price))
      .then(response => {
        if (response.data === 1) {
          cogoToast.success("Item Quantity Decreased", { position: 'top-right' });
          setPageRefreshStatus(true);
        } else {
          cogoToast.error("Request not completed! Try again", { position: 'top-right' });
        }
      })
      .catch(error => {
        cogoToast.error("Request not completed! Try again", { position: 'top-right' });
      });
  };

  const confirmOnClick = () => {
    if (!city) {
      cogoToast.error("Please Select City", { position: 'top-right' });
      return;
    }
    if (!payment) {
      cogoToast.error("Please Select Payment Method", { position: 'top-right' });
      return;
    }
    if (!name) {
      cogoToast.error("Please Enter Your Name", { position: 'top-right' });
      return;
    }
    if (!address) {
      cogoToast.error("Please Enter Your Address", { position: 'top-right' });
      return;
    }

    const invoice = new Date().getTime();
    const formData = new FormData();
    formData.append('city', city);
    formData.append('payment_method', payment);
    formData.append('name', name);
    formData.append('delivery_address', address);
    formData.append('email', user.email);
    formData.append('invoice_no', invoice);
    formData.append('delivery_charge', "00");

    axios.post(AppURL.CartOrder, formData)
      .then(response => {
        if (response.data === 1) {
          cogoToast.success("Order Request Received", { position: 'top-right' });
          setPageRedirectStatus(true);
        } else {
          cogoToast.error("Request not completed! Try again", { position: 'top-right' });
        }
      })
      .catch(error => {
        cogoToast.error("Request not completed! Try again", { position: 'top-right' });
      });
  };

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  const totalPriceSum = productData.reduce((sum, item) => sum + parseInt(item.total_price), 0);

  return (
    <Fragment>
      <Container fluid={true}>
        <div className="section-title text-center mb-55">
          <h2>Product Cart List</h2>
        </div>
        <Row>
          <Col className="p-1" lg={7} md={7} sm={12} xs={12}>
            {productData.map((item, i) => (
              <Card key={i}>
                <Card.Body>
                  <Row>
                    <Col md={3} lg={3} sm={6} xs={6}>
                      <img className="cart-product-img" src={item.image} alt={item.product_name} />
                    </Col>
                    <Col md={6} lg={6} sm={6} xs={6}>
                      <h5 className="product-name">{item.product_name}</h5>
                      <h6> Quantity = {item.quantity} </h6>
                      <p>{item.size} | {item.color}</p>
                      <h6>Price = {item.unit_price} x {item.quantity} = {item.total_price}$</h6>
                    </Col>
                    <Col md={3} lg={3} sm={12} xs={12}>
                      <Button onClick={() => removeItem(item.id)} className="btn mt-2 mx-1 btn-lg site-btn"><i className="fa fa-trash-alt"></i> </Button>
                      <Button onClick={() => itemPlus(item.id, item.quantity, item.unit_price)} className="btn mt-2 mx-1 btn-lg site-btn"><i className="fa fa-plus"></i> </Button>
                      <Button onClick={() => itemMinus(item.id, item.quantity, item.unit_price)} className="btn mt-2 mx-1 btn-lg site-btn"><i className="fa fa-minus"></i> </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col className="p-1" lg={5} md={5} sm={12} xs={12}>
            <div className="card p-2">
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <h5 className="Product-Name text-danger">Total Due: {totalPriceSum} $</h5>
                    </div>
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <label className="form-label">Choose City</label>
                      <select onChange={(e) => setCity(e.target.value)} className="form-control">
                        <option value="">Choose</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Punjab">Punjab</option>
                      </select>
                    </div>
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <label className="form-label">Choose Payment Method</label>
                      <select onChange={(e) => setPayment(e.target.value)} className="form-control">
                        <option value="">Choose</option>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="Stripe">Stripe</option>
                      </select>
                    </div>
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <label className="form-label">Your Name</label>
                      <input onChange={(e) => setName(e.target.value)} className="form-control" type="text" placeholder="" />
                    </div>
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <label className="form-label">Delivery Address</label>
                      <textarea onChange={(e) => setAddress(e.target.value)} rows={2} className="form-control" type="text" placeholder="" />
                    </div>
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                      <Button onClick={confirmOnClick} className="btn site-btn">{confirmBtn}</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Cart;
