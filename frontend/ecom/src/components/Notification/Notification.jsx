import React, { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import AppURL from '../../api/AppURL';
import axios from 'axios';
import { Navigate } from 'react-router';

const Notification = () => {
  const [show, setShow] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");
  const [notificationMsg, setNotificationMsg] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationDate, setNotificationDate] = useState("");

  useEffect(() => {
    axios.get(AppURL.NotificationHistory)
      .then(response => {
        setNotificationData(response.data);
        setIsLoading("d-none");
        setMainDiv(" ");
      })
      .catch(error => {
        // Handle error
      });
  }, []);

  const handleClose = () => setShow(false);

  const handleShow = (event) => {
    setShow(true);
    const Nmsg = event.target.getAttribute("data-message");
    const Ntitle = event.target.getAttribute("data-title");
    const Ndate = event.target.getAttribute("data-date");
    setNotificationMsg(Nmsg);
    setNotificationTitle(Ntitle);
    setNotificationDate(Ndate);
  };

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  const MyView = notificationData.map((notification, i) => (
    <Col className="p-1" md={6} lg={6} sm={12} xs={12} key={i}>
      <Card onClick={handleShow} className="notification-card">
        <Card.Body>
          <h6>{notification.title}</h6>
          <p className="py-1 px-0 text-primary m-0">
            <i className="fa fa-bell"></i> Date: {notification.date} | Status: Unread
          </p>
          <Button
            data-title={notification.title}
            data-date={notification.date}
            data-message={notification.message}
            className="btn btn-danger"
          >
            Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <Fragment>
      <Container className="TopSection">
        <Row>{MyView}</Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h6>
            <i className="fa fa-bell"></i> Date: {notificationDate}
          </h6>
        </Modal.Header>
        <Modal.Body>
          <h6>{notificationTitle}</h6>
          <p>{notificationMsg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Notification;
