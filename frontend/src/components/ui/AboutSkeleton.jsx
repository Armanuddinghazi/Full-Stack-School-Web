import React from "react";

const AboutSkeleton = () => {
    return (
        <div className="about-area-skeleton py-120">
            <div className="container">
                <div className="row g-4 align-items-center">

                    {/* LEFT SIDE */}
                    <div className="col-lg-6">
                        <div className="about-left-skeleton">
                            <div className="about-img-skeleton">
                                <div className="row g-4">

                                    <div className="col-md-6">
                                        <div className="skeleton-img-skeleton img-1-skeleton"></div>

                                        <div className="about-experience-skeleton mt-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="skeleton-circle"></div>
                                                <div className="skeleton-line w-90 "></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="skeleton-img-skeleton img-2-skeleton"></div>
                                        <div className="skeleton-img-skeleton img-3-skeleton mt-4"></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="col-lg-6">
                        <div className="about-right">
                            <div className="site-heading-skeleton mb-3">
                                <div className="skeleton-line w-40"></div>
                                <div className="skeleton-line w-90 h-lg"></div>
                            </div>

                            <div className="about-text-skeleton">
                                <div className="skeleton-line w-100"></div>
                                <div className="skeleton-line w-95"></div>
                                <div className="skeleton-line w-85"></div>
                            </div>

                            <div className="about-content-skeleton">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="about-quote-skeleton">
                                            <div className="skeleton-line w-100"></div>
                                            <div className="skeleton-line w-80"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="about-bottom-skeleton">
                                <div className="skeleton-btn"></div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutSkeleton;
