import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import useSection from '../../hooks/useSection';
import { highlightLastWords } from '../../utils/highlightLastWords';
import apiClient from '../../api/apiClient';

const Infrastructure = () => {

    const section = useSection('infrastructure')
    const [infra, setInfra] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    const toggleText = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        apiClient.get("/infrastructure").then(res => setInfra(res.data));
    }, []);


    return (
        <>
            <Breadcrumb
                title="Infrastructure"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Infrastructure", active: true }
                ]}
            />

            <div className="club-area py-120">
                <div className="container">
                    {/* Heading */}
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                {section && (
                                    <>
                                        <span className="site-title-tagline">
                                            <i className="far fa-book-open-reader"></i> {section.tagline}
                                        </span>
                                        <h2 className="site-title">
                                            {highlightLastWords(section.heading, 1)}
                                        </h2>
                                        <p>
                                            {section.paragraph}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Clubs List */}
                    <div className="row">
                        {infra.map((inf, index) => (
                            <div className="col-md-6 col-lg-4" key={inf._id}
                                data-aos="flip-left"
                                data-aos-delay={index * 100}>
                                <div className="club-item wow ">
                                    <div className="club-img mb-2">
                                        <img src={import.meta.env.VITE_API_URL_IMG + inf.image} alt={inf.title} />
                                    </div>
                                    <div className="club-content ">
                                        <div className="d-flex align-items-center justify-content-between ">
                                            <h3 className="club-title mb-0" onClick={() => toggleText(index)}>
                                                {inf.title}
                                            </h3>
                                            <button className="theme-btn arrow-btn" onClick={() => toggleText(index)}>
                                                <i className={`fa-solid fa-arrow-down-from-arc ${openIndex === index ? "rotate" : ""}`}></i>
                                            </button>
                                        </div>
                                        <div className={`club-text-wrapper ${openIndex === index ? "show" : ""}`}>
                                            <p className="club-text mt-2">{inf.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Infrastructure