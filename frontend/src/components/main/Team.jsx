import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

const API_URL = import.meta.env.VITE_API_URL_IMG;

const Team = () => {

  const [team, setTeam] = useState([]);

  useEffect(() => {
    apiClient.get("/team")
      .then(res => setTeam(res.data));
  }, []);


  return (
    <div className="team-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center" data-aos="fade-up">
              <span className="site-title-tagline">
                <i className="far fa-book-open-reader"></i> Our Teachers
              </span>
              <h2 className="site-title">
                Meet With Our <span>Teachers</span>
              </h2>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {team.map((item, index) => (
            <div key={item._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="col-md-6 col-lg-3">
              <div
                className="team-item "
              >
                <div className="team-img">
                  <img
                    src={`${API_URL}${item.image}`}
                    alt={item.name}
                  />
                </div>

                <div className="team-social">
                   <a href="#"><i className="fab fa-facebook-f"></i></a>
                   <a href="#"><i className="fab fa-whatsapp"></i></a>
                   <a href="#"><i className="fab fa-linkedin-in"></i></a>
                   <a href="#"><i className="fab fa-youtube"></i></a>
                  {/* {item.facebook && <a href={item.facebook}><i className="fab fa-facebook-f"></i></a>}
                  {item.whatsapp && <a href={item.whatsapp}><i className="fab fa-whatsapp"></i></a>}
                  {item.linkedin && <a href={item.linkedin}><i className="fab fa-linkedin-in"></i></a>}
                  {item.youtube && <a href={item.youtube}><i className="fab fa-youtube"></i></a>} */}
                </div>

                <div className="team-content">
                  <div className="team-bio">
                    <h5>
                      {item.name}
                    </h5>
                    <span>{item.role}</span>
                  </div>
                </div>

                <span className="team-social-btn">
                  <i className="far fa-share-nodes"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
