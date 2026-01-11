import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

const FeatureArea = () => {

  const [features, setFeatures] = useState([]);

  useEffect(() => {
    apiClient.get("/features").then(res => setFeatures(res.data));
  }, []);

  return (
    <div className="feature-area fa-negative">
      <div className="col-xl-10 ms-auto">
        <div className="feature-wrapper">
          <div className="row g-4">

            {features.map((item, index) => (
              <div className="col-md-6 col-lg-3" key={item._id}>
                <div className="feature-item">
                  <span className="count">{item.count}</span>
                  <div className="feature-icon">
                    <img src={import.meta.env.VITE_API_URL_IMG + item.icon} alt={item.title} />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">{item.title}</h4>
                    <p>{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
 
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureArea;
