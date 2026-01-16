import { Swiper, SwiperSlide } from "swiper/react";

const DepartmentSkeleton = () => {
  return (
    <div className="department-area bg py-120">
      <div className="container">

        {/* Heading Skeleton */}
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="skeleton skeleton-tagline mx-auto"></span>
              <h2 className="skeleton skeleton-title mx-auto"></h2>
              <p className="skeleton skeleton-text mx-auto"></p>
              <p className="skeleton skeleton-text short mx-auto"></p>
            </div>
          </div>
        </div>

        {/* Slider Skeleton */}
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 4 },
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <SwiperSlide key={i}>
              <div className="department-item">
                <div className="department-icon">
                  <div className="skeleton skeleton-dept-icon"></div>
                </div>

                <div className="department-info">
                  <h4 className="skeleton skeleton-dept-title"></h4>
                  <p className="skeleton skeleton-text"></p>
                  <p className="skeleton skeleton-text short"></p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
};

export default DepartmentSkeleton;
