import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Login from '../../assets/images/login.png';
import { Link, Navigate } from 'react-router-dom';
import AppURL from '../../api/AppURL';
import axios from 'axios';


const UserLogin = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };

    axios.post(AppURL.UserLogin, data).then((response) => {
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
      setUser(response.data.user);
    }).catch((error) => {
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
  };

  if (loggedIn || localStorage.getItem('token')) {
    return <Navigate to="/profile" />;
  }

  return (
    <Fragment>
      <Container>
        <Row className="p-2">
          <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
            <Row className="text-center">
              <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                <Form className="onboardForm" onSubmit={formSubmit}>
                  <h4 className="section-title-login">USER SIGN IN</h4>
                  
                  <input
                    className="form-control m-2"
                    type="email"
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    className="form-control m-2"
                    type="password"
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <Button type="submit" className="btn btn-block m-2 site-btn-login">Login</Button>

                  <br /><br />
                  <hr />
                  <p>
                    <b>Forget My Password?</b> <Link to="/forget"><b>Forget Password</b></Link>
                  </p>

                  <p>
                    <b>Don't Have An Account?</b> <Link to="/register"><b>Register</b></Link>
                  </p>
                </Form>
              </Col>
              <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                <img className="onboardBanner" src={Login} alt="Login Banner" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default UserLogin;
