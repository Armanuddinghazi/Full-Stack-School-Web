import react from "react";
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import scholarshipImg from '../../assets/img/scholarship/01.jpg'

const FreeStructure = () => {
    return (
        <>
            <Breadcrumb
                title="Free Structure"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Free Structure", active: true }
                ]}
            />

            <div className="scholarship py-120">
                <div className="container">
                    <div className="scholarship-content">
                        <div className="scholarship-img" data-aos="zoom-in-up">
                            <img src={scholarshipImg} alt="" />
                        </div>
                    </div>
                </div>
             </div>
            </>
            );
};

            export default FreeStructure;
