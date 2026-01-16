import React from 'react'

const ChooseSkeleton = () => {
  return (
    <>
    <div className="choose-area pt-80 pb-80">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Content Skeleton */}
          <div className="col-lg-6">
            <div className="choose-content">
              <div className="choose-content-info">

                <div className="site-heading mb-20">
                  <span className="skeleton skeleton-tagline"></span>
                  <h2 className="skeleton skeleton-title"></h2>
                  <p className="skeleton skeleton-text"></p>
                  <p className="skeleton skeleton-text short"></p>
                </div>

                <div className="choose-content-wrap">
                  <div className="row g-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div className="col-md-6" key={i}>
                        <div className="choose-item choose-items-skeleton skeleton">
                          <div className="choose-item-icon skeleton skeleton-icon"></div>
                          <div className="choose-item-info">
                            <h4 className="skeleton skeleton-card-title"></h4>
                            <p className="skeleton skeleton-card-text"></p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Image Skeleton */}
          <div className="col-lg-6">
            <div className="choose-img">
              <div className="skeleton skeleton-image"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default ChooseSkeleton