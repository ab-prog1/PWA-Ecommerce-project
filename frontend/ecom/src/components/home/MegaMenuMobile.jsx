import React, { useEffect } from 'react';

const MegaMenuMobile = () => {
  useEffect(() => {
    const MegaMenu = () => {
      const acc = document.getElementsByClassName("accordionMobile");
      const accNum = acc.length;
      for (let i = 0; i < accNum; i++) {
        acc[i].addEventListener("click", function () {
          this.classList.toggle("active");
          const panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      }
    };
    MegaMenu();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div className="accordionMenuDivMobile">
      <div className="accordionMenuDivInsideMobile">
        <button className="accordionMobile">
          <img className="accordionMenuIconMobile" src="https://image.flaticon.com/icons/png/128/739/739249.png" alt="icon" />&nbsp; Men's Clothing
        </button>
        <div className="panelMobile">
          <ul>
            <li><a href="#" className="accordionItemMobile">Mans Tshirt 1</a></li>
            <li><a href="#" className="accordionItemMobile">Mans Tshirt 2</a></li>
          </ul>
        </div>

        {/* Repeat the above structure for other items as needed */}
        
      </div>
    </div>
  );
};

export default MegaMenuMobile;
