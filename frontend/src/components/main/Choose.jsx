import React from "react";
import teacherImg from '../../assets/img/icon/teacher-2.svg'
import courseMaterial from '../../assets/img/icon/course-material.svg'
import onlineCourse from '../../assets/img/icon/online-course.svg'
import moneyImg from '../../assets/img/icon/money.svg'
import chooseImg from '../../assets/img/choose/01.jpg'

const Choose = () => {
  const chooseItems = [
    {
      id: 1,
      icon: teacherImg,
      title: "Expert Teachers",
      text: "There are many variation of the suffered.",
    },
    {
      id: 2,
      icon: courseMaterial,
      title: "Courses Material",
      text: "There are many variation of the suffered.",
    },
    {
      id: 3,
      icon: onlineCourse,
      title: "Online Courses",
      text: "There are many variation of the suffered.",
    },
    {
      id: 4,
      icon: moneyImg,
      title: "Affordable Price",
      text: "There are many variation of the suffered.",
    },
  ];

  return (
    <div className="choose-area pt-80 pb-80">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Content */}
          <div className="col-lg-6">
            <div
              className="choose-content wow fadeInUp"
              data-wow-delay=".25s"
            >
              <div className="choose-content-info">
                <div className="site-heading mb-0" data-aos="fade-up">
                  <span className="site-title-tagline">
                    <i className="far fa-book-open-reader"></i> Why Choose Us
                  </span>
                  <h2 className="site-title text-white mb-10">
                    We Are Expert & <span>Do Our Best</span> For Your Goal
                  </h2>
                  <p className="text-white">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when many
                    desktop and web page editors looking at its layout.
                  </p>
                </div>

                <div className="choose-content-wrap">
                  <div className="row g-4">
                    {chooseItems.map((item, index) => (
                      <div key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        className="col-md-6">
                        <div className="choose-item">
                          <div className="choose-item-icon">
                            <img src={item.icon} alt={item.title} />
                          </div>
                          <div className="choose-item-info">
                            <h4>{item.title}</h4>
                            <p>{item.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-lg-6">
            <div
              className="choose-img "
              data-aos="fade-left"
            >
              <img src={chooseImg} alt="Why Choose Us" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Choose;
