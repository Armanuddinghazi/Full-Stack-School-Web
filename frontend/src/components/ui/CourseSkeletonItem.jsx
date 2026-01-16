const CourseSkeleton = () => {
  return (
    <div className="course-area py-120">
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

        {/* Course Cards Skeleton */}
        <div className="row">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="course-item">

                <div className="course-img">
                  <span className="skeleton skeleton-tag"></span>
                  <div className="skeleton skeleton-course-img"></div>
                  <span className="skeleton skeleton-icon-btn"></span>
                </div>

                <div className="course-content">

                  <div className="course-meta">
                    <span className="skeleton skeleton-meta"></span>
                    <span className="skeleton skeleton-rating"></span>
                  </div>

                  <h4 className="skeleton skeleton-course-title"></h4>

                  <p className="skeleton skeleton-course-text"></p>
                  <p className="skeleton skeleton-course-text short"></p>

                  <div className="course-bottom">
                      <span className="skeleton skeleton-meta"></span>
                      <span className="skeleton skeleton-meta"></span>

                    <span className="skeleton skeleton-price"></span>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CourseSkeleton;
