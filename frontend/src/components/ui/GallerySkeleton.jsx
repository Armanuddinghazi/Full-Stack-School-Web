const GallerySkeleton = () => {
  return (
    <div className="gallery-area py-120">
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

        {/* Gallery Grid Skeleton */}
        <div className="row">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="col-md-4" key={i}>
              <div className="gallery-item">
                <div className="gallery-img">
                  <div className="skeleton skeleton-gallery-img"></div>
                </div>

                <div className="gallery-content">
                  <div className="skeleton skeleton-gallery-btn"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default GallerySkeleton;
