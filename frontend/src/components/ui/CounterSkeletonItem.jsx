import React from "react";

const CounterSkeletonItem = () => {
  return (
    <div className="col-lg-3 col-sm-6 mb-3">
      <div className="counter-box-skeleton ">

         <div className="icon mb-4 d-flex">
          <div className="skeleton skeleton-circle-counter"></div>
        </div>

        <div className="mb-4">
          <div className="skeleton skeleton-line-counter w-50 h-lg mb-3"></div>
          <div className="skeleton skeleton-line-counter w-70"></div>
        </div>
       </div>
    </div>
  );
};

const CounterSkeleton = () => {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <CounterSkeletonItem key={i} />
      ))}
    </>
  );
};

export default CounterSkeleton;
