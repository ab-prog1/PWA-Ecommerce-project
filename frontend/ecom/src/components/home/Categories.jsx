import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import axios from "axios";
import { Link } from "react-router-dom";
import CategoryLoading from "../PlaceHolder/CategoryLoading";

const Categories = () => {
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainDiv, setMainDiv] = useState("d-none");

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(AppURL.AllCategoryDetails);
        setMenuData(response.data);
        setIsLoading("d-none");
        setMainDiv(" ");
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoryData();
  }, []);

  const CatList = menuData;
  const MyView = CatList.map((category, i) => (
    <Col key={i.toString()} className="p-0" xl={2} lg={2} md={2} sm={6} xs={6}>
      <Link className="text-link" to={`/productcategory/${category.category_name}`}>
        <Card className="h-100 w-100 text-center">
          <Card.Body>
            <img className="center" src={category.category_image} alt={category.category_name} />
            <h5 className="category-name">{category.category_name}</h5>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  ));

  return (
    <Fragment>
      <CategoryLoading isLoading={isLoading} />

      <div className={mainDiv}>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>CATEGORIES</h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>

          <Row>{MyView}</Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default Categories;