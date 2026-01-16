const FeatureSkeleton = () => {
    return (
        <>
            <div className="col-md-6 col-lg-3">
                <div className="feature-item skeleton-card">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="skeleton-icon"></div>
                        <div className="skeleton-count"></div>
                    </div>
                    <div className="skeleton-content">
                        <div className="skeleton-line skeleton-title"></div>
                        <div className="skeleton-line skeleton-text"></div>
                        <div className="skeleton-line skeleton-text sm"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeatureSkeleton;