import {useState, useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { highlightLastWords } from "../../utils/highlightLastWords";
import apiClient from "../../api/apiClient";
import useSection from "../../hooks/useSection";
import DepartmentSkeleton from "../ui/DepartmentSkeleton";

const Department = () => {

  const section = useSection('department')
  const [department, setDepartment] = useState([]);
   const [loading, setLoading] = useState(true);

   const fetchDepartment = async () => {
    try {
      const res = await apiClient.get("/department");
      setDepartment(res.data);
    } catch (err) {
      console.error("department fetch error", err);
    } finally {
        setLoading(false);
    }
  };



  useEffect(() => {
    fetchDepartment();
  }, []);

  if (loading) return <DepartmentSkeleton />;

  return (
    <>
      <div className="department-area bg py-120">
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
            {department.map((item, index) => (
              <SwiperSlide key={index} >
                <div className="department-item">
                  <div className="department-icon">
                    <img src={import.meta.env.VITE_API_URL_IMG + item.icon} alt={item.title} />
                  </div>
                  <div className="department-info">
                    <h4 className="department-title">
                      <a href="#">{item.title}</a>
                    </h4>
                    <p>{item.content}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Department;
