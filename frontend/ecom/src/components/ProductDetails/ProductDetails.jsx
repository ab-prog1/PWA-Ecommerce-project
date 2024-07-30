import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import InnerImageZoom from 'react-inner-image-zoom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, Navigate } from 'react-router-dom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import SuggestedProduct from './SuggestedProduct';
import ReviewList from './ReviewList';
import cogoToast from 'cogo-toast';
import AppURL from '../../api/AppURL';
import axios from 'axios';

const ProductDetails = ({ data, user }) => {
    const [previewImg, setPreviewImg] = useState('0');
    const [isSize, setIsSize] = useState(null);
    const [isColor, setIsColor] = useState(null);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productCode, setProductCode] = useState(null);
    const [addToCart, setAddToCart] = useState('Add To Cart');
    const [orderNow, setOrderNow] = useState('Order Now');
    const [pageRedirectStatus, setPageRedirectStatus] = useState(false);
    const [pageRefreshStatus, setPageRefreshStatus] = useState(false);
    const [addToFav, setAddToFav] = useState('Favourite');

    useEffect(() => {
        if (data.productList.length) {
            const product = data.productList[0];
            setPreviewImg(previewImg === '0' ? product.image : previewImg);
            setProductCode(product.product_code);
            setIsSize(product.size !== 'na' ? 'YES' : 'NO');
            setIsColor(product.color !== 'na' ? 'YES' : 'NO');
        }
    }, [data.productList, previewImg]);

    const imgOnClick = (event) => {
        const imgSrc = event.target.getAttribute('src');
        setPreviewImg(imgSrc);
    };

    const addToCartHandler = async () => {
        if (isColor === 'YES' && !color) {
            cogoToast.error('Please Select Color', { position: 'top-right' });
        } else if (isSize === 'YES' && !size) {
            cogoToast.error('Please Select Size', { position: 'top-right' });
        } else if (!quantity) {
            cogoToast.error('Please Select Quantity', { position: 'top-right' });
        } else if (!localStorage.getItem('token')) {
            cogoToast.warn('Please You have to Login First', { position: 'top-right' });
        } else {
            setAddToCart('Adding...');
            const formData = new FormData();
            formData.append('color', color);
            formData.append('size', size);
            formData.append('quantity', quantity);
            formData.append('product_code', productCode);
            formData.append('email', user.email);

            try {
                const response = await axios.post(AppURL.addToCart, formData);
                if (response.data === 1) {
                    cogoToast.success('Product Added Successfully', { position: 'top-right' });
                    setAddToCart('Add To Cart');
                    setPageRefreshStatus(true);
                } else {
                    cogoToast.error('Your Request is not done! Try Again', { position: 'top-right' });
                    setAddToCart('Add To Cart');
                }
            } catch {
                cogoToast.error('Your Request is not done! Try Again', { position: 'top-right' });
                setAddToCart('Add To Cart');
            }
        }
    };

    const orderNowHandler = async () => {
        if (isColor === 'YES' && !color) {
            cogoToast.error('Please Select Color', { position: 'top-right' });
        } else if (isSize === 'YES' && !size) {
            cogoToast.error('Please Select Size', { position: 'top-right' });
        } else if (!quantity) {
            cogoToast.error('Please Select Quantity', { position: 'top-right' });
        } else if (!localStorage.getItem('token')) {
            cogoToast.warn('Please You have to Login First', { position: 'top-right' });
        } else {
            setAddToCart('Adding...');
            const formData = new FormData();
            formData.append('color', color);
            formData.append('size', size);
            formData.append('quantity', quantity);
            formData.append('product_code', productCode);
            formData.append('email', user.email);

            try {
                const response = await axios.post(AppURL.addToCart, formData);
                if (response.data === 1) {
                    cogoToast.success('Product Added Successfully', { position: 'top-right' });
                    setOrderNow('Order Now');
                    setPageRedirectStatus(true);
                } else {
                    cogoToast.error('Your Request is not done! Try Again', { position: 'top-right' });
                    setAddToCart('Add To Cart');
                }
            } catch {
                cogoToast.error('Your Request is not done! Try Again', { position: 'top-right' });
                setAddToCart('Add To Cart');
            }
        }
    };

    const addToFavHandler = async () => {
        setAddToFav('Adding...');
        if (!localStorage.getItem('token')) {
            cogoToast.warn('Please You have to Login First', { position: 'top-right' });
        } else {
            try {
                const response = await axios.get(AppURL.AddFavourite(productCode, user.email));
                if (response.data === 1) {
                    cogoToast.success('Product Is not in Favourite', { position: 'top-right' });
                    setAddToFav('Favourite');
                } else {
                    cogoToast.error('Your Request is not done! Try Again', { position: 'top-right' });
                    setAddToFav('Favourite');
                }
            } catch {
                cogoToast.error('Your Request is not done! Try Again', { position: 'top-right' });
                setAddToFav('Favourite');
            }
        }
    };

    const priceOption = (price, special_price) => (
        special_price === 'na'
            ? <p className="product-price-on-card">Price : ${price}</p>
            : <p className="product-price-on-card">Price : <strike className="text-secondary">${price}</strike> ${special_price}</p>
    );

    const renderPageRedirect = () => {
        if (pageRedirectStatus) return <Navigate to="/cart" />;
    };

    const renderPageRefresh = () => {
        if (pageRefreshStatus) {
            const URL = window.location;
            return <Navigate to={URL} />;
        }
    };

    const { productList, productDetails } = data;
    if (!productList.length || !productDetails.length) return null;

    const product = productList[0];
    const details = productDetails[0];
    const { title, brand, category, subcategory, image, price, product_code, remark, special_price, star } = product;
    const { image_one, image_two, image_three, image_four, color: colors, size: sizes, product_id, short_description, long_description } = details;

    const colorOptions = colors !== 'na' ? colors.split(',').map(c => <option key={c} value={c}>{c}</option>) : [];
    const sizeOptions = sizes !== 'na' ? sizes.split(',').map(s => <option key={s} value={s}>{s}</option>) : [];

    return (
        <>
            <Container fluid className="BetweenTwoSection">
                <div className="breadbody">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={`/productcategory/${category}`}>{category}</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={`/productsubcategory/${category}/${subcategory}`}>{subcategory}</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={`/productdetails/${product_id}`}>{title}</Link></Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Row className="p-2">
                    <Col className="shadow-sm bg-white pb-3 mt-4" md={12}>
                        <Row>
                            <Col className="p-3" md={6}>
                                <InnerImageZoom className="detailimage" zoomScale={1.8} zoomType="hover" src={previewImg} zoomSrc={previewImg} />
                                <Container className="my-3">
                                    <Row>
                                        {[image_one, image_two, image_three, image_four].map((img, index) => (
                                            <Col key={index} className="p-0 m-0" md={3}>
                                                <img onClick={imgOnClick} className="w-100 smallimage product-sm-img" src={img} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            </Col>
                            <Col className="p-3" md={6}>
                                <h5 className="Product-Name">{title}</h5>
                                <p className="text-secondary">Brand: {brand}</p>
                                <p className="text-secondary">Category: {category}</p>
                                <p className="text-secondary">Subcategory: {subcategory}</p>
                                {priceOption(price, special_price)}
                                <Form>
                                    {isColor === 'YES' && (
                                        <Form.Group className="mb-3" controlId="formBasicColor">
                                            <Form.Label>Color</Form.Label>
                                            <Form.Control as="select" onChange={e => setColor(e.target.value)}>
                                                <option value="">Select Color</option>
                                                {colorOptions}
                                            </Form.Control>
                                        </Form.Group>
                                    )}
                                    {isSize === 'YES' && (
                                        <Form.Group className="mb-3" controlId="formBasicSize">
                                            <Form.Label>Size</Form.Label>
                                            <Form.Control as="select" onChange={e => setSize(e.target.value)}>
                                                <option value="">Select Size</option>
                                                {sizeOptions}
                                            </Form.Control>
                                        </Form.Group>
                                    )}
                                    <Form.Group className="mb-3" controlId="formBasicQuantity">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control type="number" min="1" onChange={e => setQuantity(e.target.value)} />
                                    </Form.Group>
                                    <Button className="btn btn-danger me-2" onClick={addToCartHandler}>{addToCart}</Button>
                                    <Button className="btn btn-danger" onClick={orderNowHandler}>{orderNow}</Button>
                                </Form>
                                <div className="mb-3">
                                    <Button className="btn btn-outline-danger" onClick={addToFavHandler}>{addToFav}</Button>
                                </div>
                                <h6>Product Code: {product_code}</h6>
                                <h6>Remark: {remark}</h6>
                                <p>{short_description}</p>
                                <p>{long_description}</p>
                                <ReviewList product_id={product_id} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {renderPageRedirect()}
                {renderPageRefresh()}
            </Container>
            <SuggestedProduct />
        </>
    );
};

export default ProductDetails;
