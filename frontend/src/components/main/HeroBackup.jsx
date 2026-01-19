import React, { useState, useEffect, useRef } from "react";
import $ from '../../utils/jquery'
import "owl.carousel/dist/owl.carousel.min.js";
import { Link } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { highlightLastWords } from "../../utils/highlightLastWords";
import HeroSkeleton from "../ui/HeroSkeleton";

const Hero = () => {

  const [slides, setSlides] = useState([]);
  const [heroLoading, setHeroLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const fetchHero = async () => {
      try {
        const res = await apiClient.get("/hero");
        if (mounted) {
          setSlides(Array.isArray(res.data) ? res.data : []);
        }
      } catch (err) {
        console.error("Hero API error:", err);
        setSlides([]);
      } finally {
          if (mounted) setHeroLoading(false);
      }
    };

    fetchHero();

    return () => {
      mounted = false;
    };
  }, []);

  // useEffect(() => {
  //   apiClient.get("/hero")
  //     .then(res => setSlides(Array.isArray(res.data) ? res.data : []))
  //     .catch(() => setSlides([]));
  // }, []);

  useEffect(() => {
    if (heroLoading || slides.length === 0) return;
    // if (!slides.length) return;
 const $slider = $(sliderRef.current);
    // const $slider = $(".hero-slider");

    if ($slider.hasClass("owl-loaded")) {
      $slider.trigger("destroy.owl.carousel");
      $slider.removeClass("owl-loaded");
      $slider.find(".owl-stage-outer").children().unwrap();
    }

    $slider.owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 900,
      items: 1,
      navText: [
        "<i class='fas fa-angle-left'></i>",
        "<i class='fas fa-angle-right'></i>",
      ],
      onInitialized: addAnimation,
      onTranslated: addAnimation,
    });
    function addAnimation() {
      $(".hero-content").removeClass("animate");
      $(".owl-item.active .hero-content").addClass("animate");
    }
    return () => {
      if ($slider.hasClass("owl-loaded")) {
        $slider.trigger("destroy.owl.carousel");
      }
    };
  }, [heroLoading, slides]);

  // if (!slides) return <p>Loading...</p>;


  return (
    <div className="hero-section">
      {/* ===== SKELETON ===== */}
      {heroLoading && (
        <div className="hero-skeleton-wrapper">
          {[...Array(2)].map((_, i) => (
            <HeroSkeleton key={`hero-skeleton-${i}`} />
          ))}
        </div>
      )}

      {!heroLoading && slides.length > 0 && (

        <div ref={sliderRef} className="hero-slider owl-carousel owl-theme">

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
                        {slide.title}
                      </h6>
                      <h2 className="hero-title">
                        {highlightLastWords(slide.subtitle, 1)}
                      </h2>
                      <p>
                        {slide.description}
                      </p>
                      <div className="hero-btn">
                        <Link to="/about" className="theme-btn">
                          About More <i className="fas fa-arrow-right-long"></i>
                        </Link>
                        <Link to="/contact" className="theme-btn theme-btn2">
                          Contact Us <i className="fas fa-arrow-right-long"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Hero;
