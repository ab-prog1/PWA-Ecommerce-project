import React, { useState, Fragment } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppURL from '../../api/AppURL';
import Forget from '../../assets/images/forget.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Forget Password Form Submit Method 
  const formSubmit = (e) => {
    e.preventDefault();
    const data = { email };

    axios.post(AppURL.UserForgetPassword, data).then(response => {
      setMessage(response.data.message);
      toast.success(response.data.message, {
        position: "top-right"
      });
    }).catch(error => {
      setMessage(error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-right"
      });
    });
  };

  return (
    <Fragment>
      <Container>
        <Row className="p-2">
          <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
            <Row className="text-center">
              <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                <Form className="onboardForm" onSubmit={formSubmit}>
                  <h4 className="section-title-login"> FORGET PASSWORD ? </h4>
                  <input className="form-control m-2" type="email" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
                  <Button type="submit" className="btn btn-block m-2 site-btn-login"> Reset Password </Button>
                </Form>
              </Col>
              <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                <img className="onboardBanner" src={Forget} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default ForgetPassword;
