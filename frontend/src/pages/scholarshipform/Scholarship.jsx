import React from 'react'
import scholarshipImg from '../../assets/img/scholarship/01.jpg'
import scholarshipIcon from '../../assets/img/icon/scholarship.svg'
import scholarshipIcon2 from '../../assets/img/icon/scholarship-2.svg'
import scholarshipIcon3 from '../../assets/img/icon/scholarship-3.svg'
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";

const Scholarship = () => {
    return (
        <>
            <Breadcrumb
                title="Scholarships"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Scholarships", active: true }
                ]}
            />
            <div className="scholarship pt-120">
                <div className="container">
                    <div className="scholarship-content">
                        <div className="scholarship-img" data-aos="zoom-in-up">
                            <img src={scholarshipImg} alt="" />
                        </div>
                        <div className="my-4" data-aos="fade-right">
                            <h3 className="mb-2">Scholarships</h3>
                            <p>We are the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="mb-5 " data-aos="fade-right">Scholarships Sources</h3>
                            <div className="row">
                                <div className="col-lg-4" data-aos="flip-right">
                                    <div className="scholarship-item">
                                        <div className="scholarship-icon">
                                            <img src={scholarshipIcon} alt="" />
                                        </div>
                                        <h4>College Scholarships</h4>
                                        <p>
                                            There are many variations of passages available but the majority have suffered alteration in some form by injected humour randomised words which don't look even slightly believable.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4" data-aos="flip-right" data-aos-delay="100">
                                    <div className="scholarship-item">
                                        <div className="scholarship-icon">
                                            <img src={scholarshipIcon2} alt="" />
                                        </div>
                                        <h4>Talent Hunt Scholarship</h4>
                                        <p>
                                            There are many variations of passages available but the majority have suffered alteration in some form by injected humour randomised words which don't look even slightly believable.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4" data-aos="flip-right" data-aos-delay="200">
                                    <div className="scholarship-item">
                                        <div className="scholarship-icon">
                                            <img src={scholarshipIcon3} alt="" />
                                        </div>
                                        <h4>State Scholarships</h4>
                                        <p>
                                            There are many variations of passages available but the majority have suffered alteration in some form by injected humour randomised words which don't look even slightly believable.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

              {/* scholarship details  */}
        <div className="campus-life-details pb-80">
            <div className="container">
                <div className="details-wrapper">
                    <div className="row">
                        <div className="col-lg-6" data-aos="fade-up" >
                            <div className="details-item">
                                <h3 className="mb-3">Guidance and Advice</h3>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. 
                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered.
                                </p>
                                <a href="#" className="theme-btn mt-4">Apply For Scholarship<i className="fas fa-arrow-right-long"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                            <div className="details-item">
                                <h3 className="mb-3">Scholarships Requirements</h3>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
                                </p>
                                <ul className="content-list mt-2">
                                    <li><i className="fas fa-check-circle"></i>Sed ut perspiciatis unde omnis iste natus error sit doloremque laudantium.</li>
                                    <li><i className="fas fa-check-circle"></i>Totam rem aperiam eaque ipsa quae ab illo inventore veritatis.</li>
                                    <li><i className="fas fa-check-circle"></i>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.</li>
                                    <li><i className="fas fa-check-circle"></i>Dolores eos qui ratione voluptatem sequi nesciunte porro quisquam est.</li>
                                    <li><i className="fas fa-check-circle"></i>Etos qui ratione voluptatem sequi nesciunte porro quisquam est.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
           {/* scholarship details end  */}
        </>
    )
}

export default Scholarship