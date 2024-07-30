import React, { useState, useEffect } from "react";
import AppURL from "../../api/AppURL";
import axios from "axios";
import { Link } from "react-router-dom";

const MegaMenuAll = () => {
  const [MenuData, setMenuData] = useState([]);

  useEffect(() => {
    axios
      .get(AppURL.AllCategoryDetails)
      .then((response) => {
        setMenuData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const MenuItemClick = (event) => {
    event.target.classList.toggle("active");
    var panel = event.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  };

  const MyView = MenuData.map((category, i) => {
    return (
      <div key={i.toString()}>
        <button onClick={MenuItemClick} className="accordionAll">
          <img
            className="accordionMenuIconAll"
            src={category.category_image}
            alt={category.category_name}
          />
          &nbsp; {category.category_name}
        </button>
        <div className="panelAll">
          <ul>
            {category.subcategory_name.map((subCategory, j) => {
              return (
                <li key={j.toString()}>
                  <Link
                    to={
                      "/productsubcategory/" +
                      category.category_name +
                      "/" +
                      subCategory.subcategory_name
                    }
                    className="accordionItem"
                  >
                    {subCategory.subcategory_name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  });

  return (
    <div className="accordionMenuDivAll">
      <div className="accordionMenuDivInsideAll">{MyView}</div>
    </div>
  );
};

export default MegaMenuAll;
