import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import { Link } from 'react-router-dom';
import Features from './Features';
import apiClient from '../../api/apiClient';
import { highlightLastWords } from '../../utils/highlightLastWords';
import useSection from '../../hooks/useSection';

const HowToApply = () => {

    const section = useSection('applypage')
    const [data, setData] = useState({
        howApply: {
            title: "",
            description: "",
            description2: "",
            leftList: [],
            rightList: [],
            buttonText: "",
            buttonLink: "",
            image: ""
        }
    });

    useEffect(() => {
        apiClient.get("/applypage").then(res => setData(res.data));
    }, []);

    return (
        <>

            <Breadcrumb
                title="How To Apply"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "How To Apply", active: true }
                ]}
            />

            <div className="how-apply pt-120 pb-80">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6" data-aos="fade-right">
                            <div className="content-info wow fadeInUp" data-wow-delay=".25s">
                                {section && (
                                    <>
                                        <span className="site-title-tagline">
                                            <i className="far fa-book-open-reader"></i> {section.tagline}
                                        </span>
                                        <h2 className="site-title">
                                            {highlightLastWords(section.heading, 2)}
                                        </h2>
                                        <p>
                                            {section.paragraph}
                                        </p>
                                    </>
                                )}
                                <p className="content-text">
                                    {data.howApply.description}
                                </p>
                                <p className="content-text mt-2">
                                    {data.howApply.description2}
                                </p>
                                <div className="row my-3">
                                    <div className="col-md-6">
                                        <ul className="content-list">
                                            {(data.howApply?.leftList || []).map((item, i) => (
                                                <li key={i}><i className="fas fa-check-circle" /> {item.text}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="content-list">
                                            {(data.howApply?.rightList || []).map((item, i) => (
                                                <li key={i}><i className="fas fa-check-circle" /> {item.text}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="content-btn">
                                    <Link to="/admission-form" className="theme-btn">Apply Now<i className="fas fa-arrow-right-long"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="fade-left">
                            <div className="content-img wow fadeInRight" data-wow-delay=".25s">
                                    <img src={import.meta.env.VITE_API_URL_IMG + data.howApply.image} alt="apply img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="apply-details d-none">
                <div className="container">
                    <div className="details-wrapper">
                        <div className="row">
                            <div className="col-lg-6" data-aos="fade-up" >
                                <div className="details-left">
                                    <h3 className="mb-3">Things To Know First</h3>
                                    <p>
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
                                    </p>
                                    <p className="mt-2">
                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here making it look like readable English.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                                <div className="details-right">
                                    <h3 className="mb-3">Documents And Financial Aid</h3>
                                    <p>
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                                    </p>
                                    <ul className="content-list mt-2">
                                        <li><i className="fas fa-check-circle"></i>Sed ut perspiciatis unde omnis iste natus error sit doloremque laudantium.</li>
                                        <li><i className="fas fa-check-circle"></i>Totam rem aperiam eaque ipsa quae ab illo inventore veritatis.</li>
                                        <li><i className="fas fa-check-circle"></i>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.</li>
                                        <li><i className="fas fa-check-circle"></i>Dolores eos qui ratione voluptatem sequi nesciunte porro quisquam est.</li>
                                        <li><i className="fas fa-check-circle"></i>Adipisci velit sed quia non numquam eius modi tempora incidunt.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features section start  */}
            <Features />
            {/* Features section end */}
        </>
    )
}

export default HowToApply