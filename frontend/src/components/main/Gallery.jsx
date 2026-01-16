import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import { highlightLastWords } from "../../utils/highlightLastWords";
import useSection from "../../hooks/useSection";
import GallerySkeleton from "../ui/GallerySkeleton";

const API_URL = import.meta.env.VITE_API_URL_IMG;

const Gallery = () => {

    const section = useSection('gallery')
    const [gallery, setGallery] = useState([]);
    const [activeImage, setActiveImage] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchGallery = async () => {
        try {
            const res = await apiClient.get("/gallery");
            setGallery(res.data);
        } catch (err) {
            console.error("gallery fetch error", err);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 5000);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    if (loading) return <GallerySkeleton />;

    return (
        <>
            <div className="gallery-area py-120">
                <div className="container">

                    {/* Heading */}
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center" data-aos="fade-up">
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

                    {/* Gallery Grid */}
                    <div className="row popup-gallery">
                        {gallery.map((item, index) => (
                            <div
                                key={item._id}
                                className="col-md-4"
                                data-aos="fade-up"
                                data-aos-delay={(index + 1) * 100}
                            >
                                <div className="gallery-item">
                                    <div className="gallery-img">
                                        <img
                                            src={`${API_URL}${item.image}`}
                                            alt=""
                                        />
                                    </div>

                                    <div className="gallery-content">
                                        <button
                                            className="gallery-link"
                                            onClick={() =>
                                                setActiveImage(`${API_URL}${item.image}`)
                                            }
                                        >
                                            <i className="fal fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div >


            {activeImage && (
                <div className="gallery-modal" onClick={() => setActiveImage(null)}>
                    <div className="gallery-modal-content">
                        <img src={activeImage} alt="Preview" />
                        <span className="close-btn">&times;</span>
                    </div>
                </div>
            )
            }

        </>
    );
};

export default Gallery;
