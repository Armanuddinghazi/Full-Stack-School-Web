import React from "react";

import scholarshipIcon from "../../assets/img/icon/scholarship.svg";
import teacherIcon from "../../assets/img/icon/teacher.svg";
import libraryIcon from "../../assets/img/icon/library.svg";
import moneyIcon from "../../assets/img/icon/money.svg";

const FeatureArea = () => {
  return (
    <div className="feature-area fa-negative">
      <div className="col-xl-10 ms-auto">
        <div className="feature-wrapper">
          <div className="row g-4">

            {/* Feature 01 */}
            <div className="col-md-6 col-lg-3" >
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
            </div>

            {/* Feature 02 */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-item">
                <span className="count">02</span>
                <div className="feature-icon">
                  <img src={teacherIcon} alt="Skilled Lecturers" />
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">Skilled Lecturers</h4>
                  <p>
                    It is a long established fact that a reader will be distracted.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 03 */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-item">
                <span className="count">03</span>
                <div className="feature-icon">
                  <img src={libraryIcon} alt="Book Library Facility" />
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">Book Library Facility</h4>
                  <p>
                    It is a long established fact that a reader will be distracted.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 04 */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-item">
                <span className="count">04</span>
                <div className="feature-icon">
                  <img src={moneyIcon} alt="Affordable Price" />
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">Affordable Price</h4>
                  <p>
                    It is a long established fact that a reader will be distracted.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureArea;
