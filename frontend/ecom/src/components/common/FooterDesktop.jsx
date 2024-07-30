import React, { useState, useEffect, Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Apple from '../../assets/images/apple.png';
import Google from '../../assets/images/google.png';
import AppURL from '../../api/AppURL';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

const FooterDesktop = () => {
  const [state, setState] = useState({
    address: '',
    android_app_link: '',
    ios_app_link: '',
    facbook_link: '',
    twitter_link: '',
    instagram_link: '',
    copyright_text: '',
    loaderDiv: '',
    mainDiv: 'd-none',
  });

  useEffect(() => {
    const fetchSiteInfo = async () => {
      try {
        const response = await axios.get(AppURL.AllSiteInfo);
        if (response.status === 200) {
          const JsonData = response.data[0];
          setState({
            address: JsonData['address'],
            android_app_link: JsonData['android_app_link'],
            ios_app_link: JsonData['ios_app_link'],
            facbook_link: JsonData['facbook_link'],
            twitter_link: JsonData['twitter_link'],
            instagram_link: JsonData['instagram_link'],
            copyright_text: JsonData['copyright_text'],
            loaderDiv: 'd-none',
            mainDiv: '',
          });
        }
      } catch (error) {
        console.error(error);
             }
    };
    fetchSiteInfo();
  }, []);

  return (
    <Fragment>
      <div className="footerback m-0 mt-5 pt-3 shadow-sm">
        <Container>
          <Row className="px-0 my-5">
            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
              <div className={state.loaderDiv}>
                <div className="ph-item">
                  <div className="ph-col-12">
                    <div className="ph-row">
                      <div className="ph-col-4"></div>
                      <div className="ph-col-8 empty"></div>
                      <div className="ph-col-6"></div>
                      <div className="ph-col-6 empty"></div>
                      <div className="ph-col-12"></div>
                      <div className="ph-col-12"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={state.mainDiv}>
                <h5 className="footer-menu-title">OFFICE ADDRESS</h5>
                {ReactHtmlParser(state.address)}
              </div>

              <h5 className="footer-menu-title">SOCIAL LINK</h5>
              <a href={state.facbook_link} target="_blank" rel="noopener noreferrer">
                <i className="fab m-1 h4 fa-facebook"></i>
              </a>
              <a href={state.instagram_link} target="_blank" rel="noopener noreferrer">
                <i className="fab m-1 h4 fa-instagram"></i>
              </a>
              <a href={state.twitter_link} target="_blank" rel="noopener noreferrer">
                <i className="fab m-1 h4 fa-twitter"></i>
              </a>
            </Col>

            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
              <h5 className="footer-menu-title">THE COMPANY</h5>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
              <br />
              <Link to="/" className="footer-link">
                Company Profile
              </Link>
              <br />
              <Link to="/contact" className="footer-link">
                Contact Us
              </Link>
              <br />
            </Col>

            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
              <h5 className="footer-menu-title">MORE INFO</h5>
              <Link to="/purchase" className="footer-link">
                How To Purchase
              </Link>
              <br />
              <Link to="/privacy" className="footer-link">
                Privacy Policy
              </Link>
              <br />
              <Link to="/refund" className="footer-link">
                Refund Policy
              </Link>
              <br />
            </Col>

            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
              <h5 className="footer-menu-title">DOWNLOAD APPS</h5>
              <a href={state.android_app_link} target="_blank" rel="noopener noreferrer">
                <img src={Google} alt="Google Play" />
              </a>
              <br />
              <a href={state.ios_app_link} target="_blank" rel="noopener noreferrer">
                <img className="mt-2" src={Apple} alt="App Store" />
              </a>
              <br />
              Change Your Language
              <br />
              <div id="google_translate_element"></div>
            </Col>
          </Row>
        </Container>

        <Container fluid={true} className="text-center m-0 pt-3 pb-1 bg-dark">
          <Container>
            <Row>
              <h6 className="text-white">{ReactHtmlParser(state.copyright_text)}</h6>
            </Row>
          </Container>
        </Container>
      </div>
    </Fragment>
  );
};

export default FooterDesktop;






























