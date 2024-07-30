import React, { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MegaMenu from './MegaMenu';
import HomeSlider from './HomeSlider';
import AppURL from '../../api/AppURL';
import axios from 'axios';
import SliderLoading from '../PlaceHolder/SliderLoading';

const HomeTop = () => {
    const [menuData, setMenuData] = useState([]);
    const [sliderData, setSliderData] = useState([]);
    const [isLoading, setIsLoading] = useState("");
    const [mainDiv, setMainDiv] = useState("d-none");

    useEffect(() => {
        axios.get(AppURL.AllCategoryDetails)
            .then(response => {
                setMenuData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the category details!", error);
            });

        axios.get(AppURL.AllSlider)
            .then(response => {
                setSliderData(response.data);
                setIsLoading("d-none");
                setMainDiv("");
            })
            .catch(error => {
                console.error("There was an error fetching the slider data!", error);
            });
    }, []);

    return (
        <Fragment>
            <SliderLoading isLoading={isLoading} />
            <div className={mainDiv}>
                <Container className="p-0 m-0 overflow-hidden" fluid={true}>
                    <Row>
                        <Col lg={3} md={3} sm={12}>
                            <MegaMenu data={menuData} />
                        </Col>
                        <Col lg={9} md={9} sm={12}>
                            <HomeSlider data={sliderData} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
};

export default HomeTop;
