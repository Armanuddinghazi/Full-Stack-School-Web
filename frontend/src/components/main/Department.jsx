import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// icons
import monitor from "../../assets/img/icon/monitor.svg";
import law from "../../assets/img/icon/law.svg";
import data from "../../assets/img/icon/data.svg";
import health from "../../assets/img/icon/health.svg";
import art from "../../assets/img/icon/art.svg";

const departments = [
  {
    icon: monitor,
    title: "Business And Finance",
    desc: "There are many variations of passages the majority have some injected humour.",
  },
  {
    icon: law,
    title: "Law And Criminology",
    desc: "There are many variations of passages the majority have some injected humour.",
  },
  {
    icon: data,
    title: "IT And Data Science",
    desc: "There are many variations of passages the majority have some injected humour.",
  },
  {
    icon: health,
    title: "Health And Medicine",
    desc: "There are many variations of passages the majority have some injected humour.",
  },
  {
    icon: art,
    title: "Art And Design",
    desc: "There are many variations of passages the majority have some injected humour.",
  },
];

const Department = () => {
  return (
    <div className="department-area bg py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center" data-aos="fade-up">
              <span className="site-title-tagline">
                <i className="far fa-book-open-reader"></i> Department
              </span>
              <h2 className="site-title">
                Browse Our <span>Department</span>
              </h2>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}          
          spaceBetween={20}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 4 },
          }}
        >
          {departments.map((item, index) => (
            <SwiperSlide key={index} >
              <div className="department-item">
                <div className="department-icon">
                  <img src={item.icon} alt={item.title} />
                </div>
                <div className="department-info">
                  <h4 className="department-title">
                    <a href="#">{item.title}</a>
                  </h4>
                  <p>{item.desc}</p>
                  {/* <div className="department-btn">
                    <a href="#">
                      Read More <i className="fas fa-arrow-right-long"></i>
                    </a>
                  </div> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Department;
