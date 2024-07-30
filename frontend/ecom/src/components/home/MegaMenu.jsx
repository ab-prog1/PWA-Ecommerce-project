import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MegaMenu = ({ data }) => {

    const MenuItemClick = (event) => {
        event.target.classList.toggle("active");
        const panel = event.target.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    };

    const MyView = data.map((CatList, i) => (
        <div key={i.toString()}>
            <button onClick={MenuItemClick} className="accordion">
                <img className="accordionMenuIcon" src={CatList.category_image} alt={`${CatList.category_name} icon`} />&nbsp; {CatList.category_name}
            </button>
            <div className="panel">
                <ul>
                    {
                        CatList.subcategory_name.map((SubList, j) => (
                            <li key={j.toString()}>
                                <Link to={`productsubcategory/${CatList.category_name}/${SubList.subcategory_name}`} className="accordionItem">
                                    {SubList.subcategory_name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    ));

    return (
        <div className="accordionMenuDiv">
            <div className="accordionMenuDivInside">
                {MyView}
            </div>
        </div>
    );
};

export default MegaMenu;
