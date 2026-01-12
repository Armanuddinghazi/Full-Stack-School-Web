import React from "react";
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";

const FreeStructure = ({ uploadedResume }) => {


    if (!uploadedResume) return null;
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

            <div className="club-area py-120">
                <div className="container">
                    <div className="uploaded-resume mt-3">
                        <p><strong>Uploaded Resume:</strong></p>
                        <div className="resume-box">
                            📄 {uploadedResume}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FreeStructure;
