import React, { useEffect, useState } from "react";
import teacherImg from '../../assets/img/icon/teacher-2.svg'
import courseMaterial from '../../assets/img/icon/course-material.svg'
import onlineCourse from '../../assets/img/icon/online-course.svg'
import moneyImg from '../../assets/img/icon/money.svg'
import apiClient from "../../api/apiClient";
import { highlightLastWords } from "../../utils/highlightLastWords";
import ChooseSkeleton from "../ui/ChooseSkeleton";

const API_URL = import.meta.env.VITE_API_URL_IMG;

const icons = [teacherImg, courseMaterial, onlineCourse, moneyImg];

const Choose = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChoose();
  }, []);

  const fetchChoose = async () => {
    const res = await apiClient.get("/chooseus");
    setData(res.data);
      setLoading(false);
  };

  if (loading) return <ChooseSkeleton />;

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
                    <i className="far fa-book-open-reader"></i>  {data.tagline}
                  </span>
                  <h2 className="site-title text-white mb-10">
                    {highlightLastWords(data.heading, 2)}
                  </h2>
                  <p className="text-white">
                    {data.paragraph}
                  </p>
                </div>

                <div className="choose-content-wrap">
                  <div className="row g-4">
                    {data.cards.map((item, index) => (
                      <div className="col-md-6" key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}>
                        <div className="choose-item">
                          <div className="choose-item-icon">
                            <img src={icons[index]} alt="icon" />
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
              <img
                src={`${API_URL}${data.image}`}
                alt="Choose"
                className="img-fluid"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Choose;
