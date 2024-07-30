import React from 'react';

const SliderLoading = ({ isLoading }) => {
  return (
    <div className={isLoading}>
      <div className="row">
        <div className="col-3">
          <div className="ph-row">
            {/* Generate multiple placeholder columns */}
            {Array(8).fill(null).map((_, index) => (
              <div className="ph-col-12" key={index}></div>
            ))}
          </div>
        </div>

        <div className="col-9">
          <div className="ph-picture"></div>
        </div>
      </div>
    </div>
  );
};

export default SliderLoading;
