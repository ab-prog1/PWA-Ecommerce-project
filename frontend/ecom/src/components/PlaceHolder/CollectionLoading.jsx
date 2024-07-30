import React from 'react';
import { Container } from 'react-bootstrap';

const CollectionLoading = ({ isLoading }) => {
  // Generate a list of placeholders
  const placeholders = Array(8).fill(null);

  return (
    <div className={isLoading}>
      <Container className="text-center" fluid>
        <div className="section-title text-center mb-55">
          <h2>PRODUCT COLLECTION</h2>
          <p>Some Of Our Exclusive Collection, You May Like</p>
        </div>

        <div className="row">
          {placeholders.map((_, index) => (
            <div className="col-lg-3 col-md-3 col-sm-4 col-6 p-1" key={index}>
              <a href="" className="card image-box h-100 w-100">
                <div className="ph-picture"></div>
                <div className="ph-item">
                  <div className="ph-col-12">
                    <div className="ph-row">
                      <div className="ph-col-12 small"></div>
                      <div className="ph-col-12 small"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CollectionLoading;
