import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import FeatureSkeleton from "../ui/FeatureSkeleton";

const FeatureArea = () => {

  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get("/features");
        setFeatures(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="feature-area fa-negative">
      <div className="col-xl-10 ms-auto">
        <div className="feature-wrapper">
          <div className="row g-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                <FeatureSkeleton key={i} />
              ))
              :
              features.map((item) => (
                <div className="col-md-6 col-lg-3" key={item._id}>
                  <div className="feature-item">
                    <span className="count">{item.count}</span>
                    <div className="feature-icon">
                      <img src={import.meta.env.VITE_API_URL_IMG + item.icon} alt={item.title} />
                    </div>
                    <div className="feature-content">
                      <h4 className="feature-title">{item.title}</h4>
                      <p className="mb-0">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureArea;
