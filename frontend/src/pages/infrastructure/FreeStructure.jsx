import { useState, useEffect } from "react";
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";

const BASE_URL = import.meta.env.VITE_API_URL_IMG;

const FreeStructure = ({ uploadedResume }) => {


    const [resume, setResume] = useState(uploadedResume);

    useEffect(() => {
        const saved = localStorage.getItem("uploadedResume");
        if (saved) setResume(saved);
    }, []);

    if (!resume) return null;

    const fileUrl = `${BASE_URL}${resume}`;
    const isPdf = resume.endsWith(".pdf")

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

            <div className=" upload-resume py-50">
                <div className="container">
                    <div className=" mt-3">
                        <h4 className="mb-3">Uploaded Resume:</h4>
                        <div className="resume-box">
                            {isPdf ? (
                                <iframe
                                    src={fileUrl}
                                    width="100%"
                                    height="600px"
                                    title="Resume PDF"
                                />
                            ) : (
                                <img
                                    src={fileUrl}
                                    alt="Resume"
                                    style={{ maxWidth: "100%" }}
                                />
                            )}

                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="theme-btn mt-3"
                            >
                               <i className="fa-sharp fa-solid fa-plus"></i> Open in New Tab
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FreeStructure;
