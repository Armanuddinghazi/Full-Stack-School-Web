import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import { highlightLastWords } from "../../utils/highlightLastWords";
import useSection from "../../hooks/useSection";


const Features = () => {

  const section = useSection('features')
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    apiClient.get("/features").then(res => setFeatures(res.data));
  }, []);

  return (
    <div className="feature-area fa2 py-120">
      <div className="container">

        {/* Heading */}
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center" data-aos="fade-up">
              {section && (
                <>
                  <span className="site-title-tagline">
                    <i className="far fa-book-open-reader"></i> {section.tagline}
                  </span>
                  <h2 className="site-title">
                    {highlightLastWords(section.heading, 1)}
                  </h2>
                  <p>
                    {section.paragraph}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Feature Cards */}
          <div className="row g-4">
            {features.map((item, index) => (
              <div key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100} className="col-md-6 col-lg-3">
                <div className={`feature-item fade-up ${item.active ? "active" : ""}`}>
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

      export default Features;
