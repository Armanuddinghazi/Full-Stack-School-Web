import React from 'react'
import alumniImg from '../../assets/img/alumni/01.jpg'
import alumniImg2 from '../../assets/img/alumni/02.jpg'
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import Team from '../../components/main/Team';


const Alumni = () => {

    return (
        <>
            <Breadcrumb
                title="Alumni"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Alumni", active: true }
                ]}
            />
            <div className="alumni pt-120 pb-80">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6" data-aos="fade-right">
                            <div className="content-img wow fadeInLeft" data-wow-delay=".25s">
                                <img src={alumniImg} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="fade-left"> 
                            <div className="content-info wow fadeInUp" data-wow-delay=".25s">
                                <div className="site-heading mb-3">
                                    <span className="site-title-tagline"><i className="far fa-book-open-reader"></i> Alumni Story</span>
                                    <h2 className="site-title">
                                        Hear From Our <span>Latest 2026</span> Alumni Story!
                                    </h2>
                                </div>
                                <p className="content-text">
                                    There are many variations of passages available but the majority have suffered
                                    alteration in some form by injected humour randomised words which don't look even
                                    slightly believable. If you are going to use passage you need sure there anything
                                    embarrassing first true generator on the Internet.
                                </p>
                                <p className="content-text mt-2">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alunni Details  */}
            <div className="alumni-details pb-80">
            <div className="container">
                <div className="details-wrapper">
                    <div className="row">
                        <div className="col-lg-6" data-aos="fade-up">
                            <div className="details-item">
                                <h3 className="mb-3">Welcome To Our Community</h3>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. 
                                </p>
                                <p className="mt-2">
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here making it look like readable English.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                            <div className="details-item">
                                <h3 className="mb-3">Alumni Updates</h3>
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
                        <div className="col-lg-12" data-aos="zoom-in-up">
                            <div className="details-item">
                                <img src={alumniImg2} alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="fade-up"> 
                            <div className="details-item">
                                <h3 className="my-3">Alumni Stories</h3>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. 
                                </p>
                                <p className="mt-2">
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here making it look like readable English.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                            <div className="details-item">
                                <h3 className="my-3">Our Alumni Challenges</h3>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. 
                                </p>
                                <p className="mt-2">
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here making it look like readable English.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {/* Alunni Details end  */}

            <Team/>
        </>
    )
}

export default Alumni