import React, { useState, useEffect, useRef, Fragment } from "react";
import { Container, Row, Card } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppURL from "../../api/AppURL";
import axios from "axios";
import NewArrivalLoading from "../PlaceHolder/NewArrivalLoading";
import { Link } from "react-router-dom";

const NewArrival = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [mainDiv, setMainDiv] = useState("d-none");
  const slider = useRef(null);

  const next = () => {
    slider.current.slickNext();
  };

  const previous = () => {
    slider.current.slickPrev();
  };

  useEffect(() => {
    axios
      .get(AppURL.ProductListByRemark("NEW"))
      .then((response) => {
        setProductData(response.data);
        setIsLoading("d-none");
        setMainDiv("");
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const NewList = productData;
  const MyView = NewList.map((item, i) => {
    if (item.special_price === "na") {
      return (
        <div key={i}>
          <Link className="text-link" to={"/productdetails/" + item.id}>
            <Card className="image-box card">
              <img className="center" src={item.image} alt={item.title} />
              <Card.Body>
                <p className="product-name-on-card">{item.title}</p>
                <p className="product-price-on-card">Price: ${item.price}</p>
              </Card.Body>
            </Card>
          </Link>
        </div>
      );
    } else {
      return (
        <div key={i}>
          <Link className="text-link" to={"/productdetails/" + item.id}>
            <Card className="image-box card">
              <img className="center" src={item.image} alt={item.title} />
              <Card.Body>
                <p className="product-name-on-card">{item.title}</p>
                <p className="product-price-on-card">
                  Price:{" "}
                  <strike className="text-secondary">${item.price}</strike>{" "}
                  ${item.special_price}
                </p>
              </Card.Body>
            </Card>
          </Link>
        </div>
      );
    }
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Fragment>
      <NewArrivalLoading isLoading={isLoading} />

      <div className={mainDiv}>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>
              NEW ARRIVAL &nbsp;
              <button className="btn btn-sm ml-2 site-btn" onClick={previous}>
                <i className="fa fa-angle-left"></i>
              </button>
              &nbsp;
              <button className="btn btn-sm ml-2 site-btn" onClick={next}>
                <i className="fa fa-angle-right"></i>
              </button>
            </h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>

          <Row>
            <Slider ref={slider} {...settings}>
              {MyView}
            </Slider>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default NewArrival;
