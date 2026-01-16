import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ideaIcon from "../../assets/img/icon/exchange-idea.svg";
import apiClient from "../../api/apiClient";
import AboutSkeleton from "../ui/AboutSkeleton";

const API_URL = import.meta.env.VITE_API_URL_IMG;

const AboutArea = () => {

  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/about")
      .then(res => setAbout(res.data))
      .catch(() => setAbout(null))
      .finally(() => {
          setLoading(false)
      }
      );
  }, []);

  // if (!about) return null;
  if (loading) return <AboutSkeleton />;
if (!about) return null;

  return (
    <div className="about-area py-120">
      <div className="container">
        <div className="row g-4 align-items-center">

          {/* LEFT SIDE */}
          <div className="col-lg-6">
            <div className="about-left" data-aos="fade-right">
              <div className="about-img">
                <div className="row g-4">
                  <div className="col-md-6">
                    <img className="img-1" src={`${API_URL}${about.images.img1}`} alt="About" />

                    <div className="about-experience mt-4">
                      <div className="about-experience-icon">
                        <img src={ideaIcon} alt="Experience" />
                      </div>
                      <div>
                        <b className="text-start">
                          {about.experienceText}
                        </b>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <img className="img-2" src={`${API_URL}${about.images.img2}`} alt="About" />
                    <img className="img-3 mt-4" src={`${API_URL}${about.images.img3}`} alt="About" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6">
            <div className="about-right " data-aos="fade-left">
              <div className="site-heading mb-3">
                <span className="site-title-tagline">
                  <i className="far fa-book-open-reader"></i> {about.tagline}
                </span>
                <h2 className="site-title">
                  {about.heading}
                </h2>
              </div>

              <p className="about-text">
                {about.description}
              </p>

              <div className="about-content">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="about-quote">
                      <p>
                        {about.quote}
                      </p>
                      <i className="far fa-quote-right"></i>
                    </div>
                  </div>

                </div>
              </div>

              <div className="about-bottom">
                <Link to="/about" className="theme-btn">
                  Discover More <i className="fas fa-arrow-right-long"></i>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutArea;
