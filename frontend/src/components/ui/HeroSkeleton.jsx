// import React from 'react'

// const HeroSkeleton = () => {
//   return (
//     <>
//    <div className="hero-single hero-skeleton">
//       <div className="container">
//         <div className="row align-items-center">
//           <div className="col-lg-7">
//             <div className="hero-content">
//               <div className="sk sk-subtitle"></div>
//               <div className="sk sk-title"></div>
//               <div className="sk sk-text"></div>
//               <div className="sk sk-btn"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   )
// }

// export default HeroSkeleton


const HeroSkeleton = () => {
  return (
    <div className="hero-single skeleton-hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 col-lg-7">
            <div className="hero-content">

              <div className="skeleton skeleton-subtitle"></div>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-title short"></div>

              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text short"></div>

              <div className="hero-btn">
                <span className="skeleton skeleton-btn"></span>
                <span className="skeleton skeleton-btn outline"></span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
