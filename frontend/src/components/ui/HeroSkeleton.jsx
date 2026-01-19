
// const HeroSkeleton = () => {
//   return (
//     <div className="hero-single skeleton-hero">
//       <div className="container">
//         <div className="row align-items-center">
//           <div className="col-md-12 col-lg-7">
//             <div className="hero-content">

//               <div className="skeleton skeleton-subtitle"></div>
//               <div className="skeleton skeleton-title"></div>
//               <div className="skeleton skeleton-title short"></div>

//               <div className="skeleton skeleton-text"></div>
//               <div className="skeleton skeleton-text short"></div>

//               <div className="hero-btn">
//                 <span className="skeleton skeleton-btn"></span>
//                 <span className="skeleton skeleton-btn outline"></span>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSkeleton;


import React from "react";

const HeroSkeleton = () => {
  return (
    <div className="hero-skeleton-container">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 col-lg-7">
            <div className="skeleton-content-wrapper">
              
              {/* Subtitle Icon & Text */}
              <div className="skeleton-box sk-subtitle"></div>

              {/* Main Title */}
              <div className="skeleton-box sk-title"></div>

              {/* Description Paragraph */}
              <div className="skeleton-box sk-desc-line"></div>
              <div className="skeleton-box sk-desc-line"></div>
              <div className="skeleton-box sk-desc-line short"></div>

              {/* Buttons */}
              <div className="sk-btn-group">
                <div className="skeleton-box sk-btn"></div>
                <div className="skeleton-box sk-btn"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
