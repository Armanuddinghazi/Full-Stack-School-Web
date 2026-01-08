import React, { useState, useEffect } from "react";

import scholarshipIcon from "../../assets/img/icon/scholarship.svg";
import teacherIcon from "../../assets/img/icon/teacher.svg";
import libraryIcon from "../../assets/img/icon/library.svg";
import moneyIcon from "../../assets/img/icon/money.svg";
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
            {/* Feature 01 */ }
            {/* <div className="col-md-6 col-lg-3" >
              <div className="feature-item">
                <span className="count">01</span>
                <div className="feature-icon">
                  <img src={scholarshipIcon} alt="Scholarship Facility" />
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">Scholarship Facility</h4>
                  <p>
                    It is a long established fact that a reader will be distracted.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureArea;
