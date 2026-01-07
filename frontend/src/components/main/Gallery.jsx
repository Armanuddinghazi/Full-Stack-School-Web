import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

const API_URL = import.meta.env.VITE_API_URL_IMG;

const Gallery = () => {

    const [gallery, setGallery] = useState([]);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        apiClient.get("/gallery")
            .then(res => setGallery(res.data));
    }, []);

    return (
        <>
            <div className="gallery-area py-120">
                <div className="container">

                    {/* Heading */}
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center" data-aos="fade-up">
                                <span className="site-title-tagline">
                                    <i className="far fa-book-open-reader"></i> Gallery
                                </span>
                                <h2 className="site-title">
                                    Our Photo <span>Gallery</span>
                                </h2>
                                <p>
                                    It is a long established fact that a reader will be distracted
                                    by the readable content of a page when looking at its layout.
                                </p>
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
            </div>


            {activeImage && (
                <div className="gallery-modal" onClick={() => setActiveImage(null)}>
                    <div className="gallery-modal-content">
                        <img src={activeImage} alt="Preview" />
                        <span className="close-btn">&times;</span>
                    </div>
                </div>
            )}

        </>
    );
};

export default Gallery;
