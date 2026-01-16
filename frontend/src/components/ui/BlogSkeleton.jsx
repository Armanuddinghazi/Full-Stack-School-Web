const BlogSkeleton = () => {
  return (
    <div className="blog-area py-120">
      <div className="container">

        {/* Heading Skeleton */}
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              {/* <span className="skeleton skeleton-tagline mx-auto"></span> */}
              <h2 className="skeleton skeleton-title mx-auto"></h2>
              <p className="skeleton skeleton-text mx-auto"></p>
              <p className="skeleton skeleton-text short mx-auto"></p>
            </div>
          </div>
        </div>

        {/* Blog Card Skeletons */}
        <div className="row">
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="blog-item">

                <div className="blog-date skeleton skeleton-date">
                </div>

                <div className="blog-item-img">
                  <div className="skeleton skeleton-blog-img"></div>
                </div>

                <div className="blog-item-info">

                  <div className="blog-item-meta">
                    <ul>
                      <li className="skeleton skeleton-meta"></li>
                      <li className="skeleton skeleton-meta"></li>
                    </ul>
                  </div>

                  <h4 className="skeleton skeleton-blog-title"></h4>

                  <a className="skeleton skeleton-btn"></a>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogSkeleton;
