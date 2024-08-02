import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import Logo from '../../assets/images/easyshop.png';
import Bars from '../../assets/images/bars.png';
import { Link, Navigate } from "react-router-dom";
import MegaMenuAll from '../home/MegaMenuAll';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import {UserContext} from '../../route/AppRoute';

const NavMenuDesktop = (props) => {
    const [sideNavState, setSideNavState] = useState("sideNavClose");
    const [contentOverState, setContentOverState] = useState("ContentOverlayClose");
    const [searchKey, setSearchKey] = useState("");
    const [searchRedirectStatus, setSearchRedirectStatus] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        let product_code = props.product_code;
        axios.get(AppURL.CartCount(product_code)).then((response) => {
            setCartCount(response.data);
        });
    }, [props.product_code , user]);

    const logout = () => {
        localStorage.clear();
    }

    const handleSearchChange = (event) => {
        setSearchKey(event.target.value);
    }

    const handleSearchClick = () => {
        if (searchKey.length >= 2) {
            setSearchRedirectStatus(true);
        }
    }

    const searchRedirect = () => {
        if (searchRedirectStatus) {
            return <Navigate to={`/productbysearch/${searchKey}`} />
        }
    }

    const handleMenuBarClick = () => {
        toggleSideNav();
    }

    const handleContentOverlayClick = () => {
        toggleSideNav();
    }

    const toggleSideNav = () => {
        if (sideNavState === "sideNavOpen") {
            setSideNavState("sideNavClose");
            setContentOverState("ContentOverlayClose");
        } else {
            setSideNavState("sideNavOpen");
            setContentOverState("ContentOverlayOpen");
        }
    }

    const buttons = localStorage.getItem('token') ? (
        <div>
            <Link to="/favourite" className="btn">
                <i className="fa h4 fa-heart"></i>
                <sup><span className="badge text-white bg-danger">3</span></sup>
            </Link>
            <Link to="/notification" className="btn">
                <i className="fa h4 fa-bell"></i>
                <sup><span className="badge text-white bg-danger">5</span></sup>
            </Link>
            <Link to="/profile" className="h4 btn">PROFILE</Link>
            <Link to="/" onClick={logout} className="h4 btn">LOGOUT</Link>
            <Link to="/cart" className="cart-btn">
                <i className="fa fa-shopping-cart"></i> {cartCount} Items
            </Link>
        </div>
    ) : (
        <div>
            <Link to="/favourite" className="btn">
                <i className="fa h4 fa-heart"></i>
                <sup><span className="badge text-white bg-danger">3</span></sup>
            </Link>
            <Link to="/notification" className="btn">
                <i className="fa h4 fa-bell"></i>
                <sup><span className="badge text-white bg-danger">5</span></sup>
            </Link>
            <Link to="/login" className="h4 btn">LOGIN</Link>
            <Link to="/register" className="h4 btn">REGISTER</Link>
            <Link to="/cart" className="cart-btn">
                <i className="fa fa-shopping-cart"></i> 0 Items
            </Link>
        </div>
    );

    return (
        <Fragment>
            <div className="TopSectionDown">
                <Navbar fixed={"top"} className="navbar" bg="light">
                    <Container fluid={"true"} className="fixed-top shadow-sm p-2 mb-0 bg-white">
                        <Row>
                            <Col lg={4} md={4} sm={12} xs={12}>
                                <img onClick={handleMenuBarClick} className="bar-img" src={Bars} />
                                <Link to="/"> <img className="nav-logo" src={Logo} /> </Link>
                            </Col>
                            <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                                <div className="input-group w-100">
                                    <input onChange={handleSearchChange} type="text" className="form-control" />
                                    <Button onClick={handleSearchClick} type="button" className="btn site-btn">
                                        <i className="fa fa-search"> </i>
                                    </Button>
                                </div>
                            </Col>
                            <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                                {buttons}
                            </Col>
                        </Row>
                        {searchRedirect()}
                    </Container>
                </Navbar>
            </div>
            <div className={sideNavState}>
                <MegaMenuAll />
            </div>
            <div onClick={handleContentOverlayClick} className={contentOverState}></div>
        </Fragment>
    );
}

export default NavMenuDesktop;
