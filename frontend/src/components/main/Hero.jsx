import React, { useState, useEffect } from "react";
import $ from '../../utils/jquery'
import "owl.carousel/dist/owl.carousel.min.js";
import { Link } from "react-router-dom";
import apiClient from "../../api/apiClient";

const Hero = () => {

  const [slides, setSlides] = useState([]);

 useEffect(() => {
    apiClient.get("/hero")
      .then(res => setSlides(Array.isArray(res.data) ? res.data : []))
      .catch(() => setSlides([]));
  }, []);

  useEffect(() => {
    if (!slides.length) return;

    const $slider = $(".hero-slider");

    if ($slider.hasClass("owl-loaded")) {
      $slider.trigger("destroy.owl.carousel");
    }

    $slider.owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      items: 1,
      navText: [
        "<i class='fas fa-angle-left'></i>",
        "<i class='fas fa-angle-right'></i>",
      ],
    });
  }, [slides]);

  // if (!hero) return <p>Loading...</p>;


  return (
    <div className="hero-section">
      <div className="hero-slider owl-carousel owl-theme">

        {/* Slide 1 */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className="hero-single"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-12 col-lg-7">
                  <div className="hero-content">
                    <h6 className="hero-sub-title">
                      <i className="far fa-book-open-reader"></i>
                      {/* Welcome To College! */}
                      {slide.title}
                    </h6>
                    <h1 className="hero-title">
                      {slide.subtitle}
                      {/* Start Your Beautiful And Bright Future */}
                    </h1>
                    <p>
                      {slide.description}
                      {/* There are many variations of passages orem psum available but
                      the majority have suffered alteration in some repeat predefined
                      chunks form injected humour. */}
                    </p>
                    <div className="hero-btn">
                      <Link to="/about" className="theme-btn">
                        About More <i className="fas fa-arrow-right-long"></i>
                      </Link>
                      <Link to="/contact" className="theme-btn theme-btn2">
                        Learn More <i className="fas fa-arrow-right-long"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Hero;
