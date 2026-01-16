import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import { highlightLastWords } from "../../utils/highlightLastWords";
import useSection from "../../hooks/useSection";
import TeamSkeleton from "../ui/TeamSkeletonItem";

const API_URL = import.meta.env.VITE_API_URL_IMG;

const Team = () => {

  const section = useSection('team')
  const [team, setTeam] = useState([]);
  const [data, setData] = useState({socialLinks: {}});
  const [loading, setLoading] = useState(true);


  const fetchTeam = async () => {
    try {
      const res = await apiClient.get("/team");
      setTeam(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("team fetch error", err);
      setTeam([]);
    } finally {
          setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  useEffect(() => {
    apiClient.get("/headertop")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

   if (loading) return <TeamSkeleton />;

  return (
    <div className="team-area py-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center" data-aos="fade-up">
              {section && (
                <>
                  <span className="site-title-tagline">
                    <i className="far fa-book-open-reader"></i> {section.tagline}
                  </span>
                  <h2 className="site-title">
                    {highlightLastWords(section.heading, 1)}
                  </h2>
                  <p>
                    {section.paragraph}
                  </p>
                </>
              )}
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
                    <a href={data?.socialLinks?.facebook || "#"} target="_blank">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href={data?.socialLinks?.instagram || "#"} target="_blank">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href={data?.socialLinks?.twitter || "#"} target="_blank">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a href={data?.socialLinks?.whatsapp ? `https://wa.me/${data?.socialLinks?.whatsapp}` : "#"} target="_blank">
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
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
