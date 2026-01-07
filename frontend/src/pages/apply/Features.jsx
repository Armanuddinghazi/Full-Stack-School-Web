import React from "react";
import scholarshipIcon from "../../assets/img/icon/scholarship.svg";
import teacherIcon from "../../assets/img/icon/teacher.svg";
import libraryIcon from "../../assets/img/icon/library.svg";
import moneyIcon from "../../assets/img/icon/money.svg";

const features = [
  {
    id: "01",
    title: "Scholarship Facility",
    desc: "It is a long established fact that a reader will be distracted.",
    icon: scholarshipIcon,
    active: false,
  },
  {
    id: "02",
    title: "Skilled Lecturers",
    desc: "It is a long established fact that a reader will be distracted.",
    icon: teacherIcon,
    active: true,
  },
  {
    id: "03",
    title: "Book Library Facility",
    desc: "It is a long established fact that a reader will be distracted.",
    icon: libraryIcon,
    active: false,
  },
  {
    id: "04",
    title: "Affordable Price",
    desc: "It is a long established fact that a reader will be distracted.",
    icon: moneyIcon,
    active: false,
  },
];

const Features = () => {
  return (
    <div className="feature-area fa2 py-120">
      <div className="container">

        {/* Heading */}
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center" data-aos="fade-up">
              <span className="site-title-tagline">
                <i className="far fa-book-open-reader"></i> Features
              </span>
              <h2 className="site-title">
                Our Awesome <span>Features</span>
              </h2>
              <p>
                It is a long established fact that a reader will be distracted by
                the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="row g-4">
          {features.map((item, index) => (
            <div key={index} 
            data-aos="zoom-in"
      data-aos-delay={index * 100}className="col-md-6 col-lg-3">
              <div className={`feature-item fade-up ${item.active ? "active" : ""}`}>
                <span className="count">{item.id}</span>

                <div className="feature-icon">
                  <img src={item.icon} alt={item.title} />
                </div>

                <div className="feature-content">
                  <h4 className="feature-title">{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Features;
