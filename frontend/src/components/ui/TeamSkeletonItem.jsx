// import React from "react";

// const TeamSkeletonItem = () => {
//   return (
//     <div className="col-md-6 col-lg-3">
//       <div className="team-item team-skeleton">

//         {/* IMAGE */}
//         <div className="team-img">
//           <div className="team-skeleton-img"></div>
//         </div>

//         {/* SOCIAL ICONS */}
//         <div className="team-social">
//           {[...Array(4)].map((_, i) => (
//             <span key={i} className="team-skeleton-circle"></span>
//           ))}
//         </div>

//         {/* CONTENT */}
//         <div className="team-content">
//           <div className="team-bio">
//             <div className="team-skeleton-line w-70"></div>
//             <div className="team-skeleton-line w-50 mt-2"></div>
//           </div>
//         </div>

//         {/* SHARE BUTTON */}
//         {/* <span className="team-social-btn-skeleton">
//           <span className="team-skeleton-circle-sm"></span>
//         </span> */}

//       </div>
//     </div>
//   );
// };

// const TeamSkeleton = () => {
//   return (
//     <>
//       {[...Array(4)].map((_, i) => (
//         <TeamSkeletonItem key={i} />
//       ))}
//     </>
//   );
// };

// export default TeamSkeleton;


const TeamSkeleton = () => {
  return (
    <div className="team-area py-80">
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

        {/* Cards Skeleton */}
        <div className="row">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="col-md-6 col-lg-3" key={i}>
              <div className="team-item">

                <div className="team-img">
                  <div className="skeleton skeleton-team-img"></div>
                </div>

                <div className="team-social skeleton-social">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <span key={j} className="skeleton skeleton-social-icon"></span>
                  ))}
                </div>

                <div className="team-content">
                  <div className="team-bio">
                    <h5 className="skeleton skeleton-name"></h5>
                    <span className="skeleton skeleton-role"></span>
                  </div>
                </div>

                {/* <span className="team-social-btn skeleton skeleton-circle"></span> */}

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TeamSkeleton;

