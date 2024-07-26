import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import validation from '../../validation/validation';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const nameOnChange = (event) => {
    setName(event.target.value);
  };

  const emailOnChange = (event) => {
    setEmail(event.target.value);
  };

  const messageOnChange = (event) => {
    setMessage(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (message.length === 0) {
      toast.error("Please write your message");
    } else if (name.length === 0) {
      toast.error("Please write down your name");
    } else if (email.length === 0) {
      toast.error("Please write down your email");
    } else if (!validation.NameRegx.test(name)) {
      toast.error("Invalid Name");
    } else {
      const sendBtn = document.getElementById('sendBtn');
      const contactForm = document.getElementById('contactForm');

      sendBtn.innerHTML = "Sending...";
      const MyFormData = new FormData();
      MyFormData.append("name", name);
      MyFormData.append("email", email);
      MyFormData.append("message", message);

      axios.post(AppURL.PostContact, MyFormData).then(function (response) {
        if (response.status === 200 && response.data === 1) {
          toast.success("Message Sent Successfully");
          sendBtn.innerHTML = "Send";
          contactForm.reset();
        } else {
          toast.error("Error");
          sendBtn.innerHTML = "Send";
        }
      }).catch(function (error) {
        toast.error(error.message);
        sendBtn.innerHTML = "Send";
      });
    }
  };

  return (
    <Fragment>
      <Container>
        <Row className="p-2">
          <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
            <Row className="text-center">
              <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                <Form id="contactForm" onSubmit={onFormSubmit} className="onboardForm">
                  <h4 className="section-title-login">CONTACT WITH US</h4>
                  <h6 className="section-sub-title">Please Contact With Us</h6>

                  <input onChange={nameOnChange} className="form-control m-2" type="text" placeholder="Enter Your Name" />
                  <input onChange={emailOnChange} className="form-control m-2" type="email" placeholder="Enter Email" />
                  <Form.Control onChange={messageOnChange} className="form-control m-2" as="textarea" rows={3} placeholder="Message" />
                  <Button id="sendBtn" type="submit" className="btn btn-block m-2 site-btn-login">Send</Button>
                </Form>
              </Col>

              <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                <br /><br />
                <p className="section-title-contact">
                  1635 Franklin Street Montgomery, Near Sherwood Mall. AL 36104
                  Email: Support@easylearningbd.com
                </p>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d162771.1102477064!2d-74.10054944459704!3d40.70681480276415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1627241390779!5m2!1sen!2sbd" 
                  width="550" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy">
                </iframe>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Contact;
