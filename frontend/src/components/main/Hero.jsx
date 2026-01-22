import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { highlightLastWords } from "../../utils/highlightLastWords";
import HeroSkeleton from "../ui/HeroSkeleton";

// Swiper Imports (No jQuery)
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Parallax } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";


const Hero = () => {
  const BASE_URL = import.meta.env.VITE_API_URL_IMG;

  const [slides, setSlides] = useState([]);
  const [heroLoading, setHeroLoading] = useState(true);

  // 🔹 Shuffle Function (Fisher-Yates Algorithm)
  // const shuffleArray = (array) => {
  //   const shuffled = [...array];
  //   for (let i = shuffled.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  //   }
  //   return shuffled;
  // };

  useEffect(() => {
    let mounted = true;

    const fetchHero = async () => {
      try {
        const res = await apiClient.get("/hero");
        if (mounted) {
          const rawData = Array.isArray(res.data) ? res.data : [];
          // setSlides(shuffleArray(rawData));
          setSlides(rawData);
        }
      } catch (err) {
        console.error("Hero API error:", err);
        if (mounted) setSlides([]);
      } finally {
        if (mounted) setHeroLoading(false);
      }
    };

    fetchHero();

    return () => {
      mounted = false;
    };
  }, []);

  const getBackgroundImage = (img) => {
    if (!img) return "";
    if (img.startsWith("data:")) return `url(${img})`;
    if (img.startsWith("http")) return `url(${img})`;
    return `url(${BASE_URL}${img.startsWith("/") ? img : `/${img}`})`;
  };

  return (
    <div className="hero-section">
      <style>
        {`
          /* Navigation Buttons Customization */
.swiper-button-prev, .swiper-button-next {
            color: #fff;
            background: rgba(0,0,0,0.3);
            width: 55px;
            height: 55px;
            border-radius: 50%;
            transition: 0.3s;
            z-index: 20;
          }
            .swiper-button-prev svg, .swiper-button-next svg {
            width: 14px;
            }
          .swiper-button-prev:after, .swiper-button-next:after { font-size: 20px; font-weight: bold; }
          .swiper-button-prev:hover, .swiper-button-next:hover { background: var(--theme-color, #ff5e14); }

          /* 🔹 Content Animation Logic */
          .hero-content { opacity: 0; transform: translateY(30px); transition: all 0.5s ease-out; }
          
          /* When Slide is Active */
          .swiper-slide-active .hero-content { opacity: 1; transform: translateY(0); }
          
          .swiper-slide-active .hero-sub-title { animation: fadeInUp 1s ease forwards; }
          .swiper-slide-active .hero-title { animation: fadeInUp 1s ease 0.3s forwards; opacity: 0; }
          .swiper-slide-active .para-text { animation: fadeInUp 1s ease 0.5s forwards; opacity: 0; }
          .swiper-slide-active .hero-btn { animation: fadeInUp 1s ease 0.7s forwards; opacity: 0; }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* ===== SKELETON ===== */}
      {heroLoading && (
        <div className="hero-skeleton-wrapper" style={{ height: "650px", overflow: "hidden" }}>
          <HeroSkeleton />
        </div>
      )}

      {/* ===== SLIDER ===== */}
      {!heroLoading && slides.length > 0 && (
        <Swiper
          modules={[Navigation, Autoplay, EffectFade, Parallax]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={1200}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          navigation={true}
          // effect={"fade"} 
          // fadeEffect={{ crossFade: true }}
          className="hero-slider"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={slide._id || i}>
              <div
                className="hero-single"
                style={{
                  backgroundImage: getBackgroundImage(slide.image),
                  width: "100%",
                }}
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

                        <p className="para-text">{slide.description}</p>

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
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Hero;