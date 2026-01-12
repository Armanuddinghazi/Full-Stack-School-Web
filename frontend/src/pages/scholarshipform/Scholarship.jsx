import {useState, useEffect} from 'react'
import scholarshipImg from '../../assets/img/scholarship/01.jpg'
import scholarshipIcon from '../../assets/img/icon/scholarship.svg'
import scholarshipIcon2 from '../../assets/img/icon/scholarship-2.svg'
import scholarshipIcon3 from '../../assets/img/icon/scholarship-3.svg'
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import apiClient from '../../api/apiClient'

const Scholarship = () => {
    const [section, setSection] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const secRes = await apiClient.get("/scholarshipSection");
        const cardRes = await apiClient.get("/scholarshipCards");
        setSection(secRes.data);
        setCards(cardRes.data);
    };
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
                            <img src={import.meta.env.VITE_API_URL_IMG + section.image} alt="" />
                        </div>
                        <div className="my-4" data-aos="fade-right">
                            <h3 className="mb-2">{section.title}</h3>
                            <p>{section.description}</p>
                        </div>
                        <div className="mb-4">
                            {/* <h3 className="mb-5 " data-aos="fade-right">Scholarships Sources</h3> */}
                            <div className="row">
                                {cards.map((card, index) => (
                                    <div className="col-lg-4"
                                        key={card._id}
                                        data-aos="flip-right"
                                        data-aos-delay={index * 100}>
                                        <div className="scholarship-item">
                                            <div className="scholarship-icon">
                                                <img src={import.meta.env.VITE_API_URL_IMG + card.icon}
                                                    alt={card.cardTitle} />
                                            </div>
                                            <h4>
                                                {/* College Scholarships */}
                                                {card.cardTitle}
                                            </h4>
                                            <p>
                                                {card.cardContent}
                                                {/* There are many variations of passages available but the majority have suffered alteration in some form by injected humour randomised words which don't look even slightly believable. */}
                                            </p>
                                        </div>
                                    </div>
                                ))}   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Scholarship