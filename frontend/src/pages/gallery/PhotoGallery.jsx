import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import Breadcrumb from '../../components/ui/Breadcrumb'

const PhotoGallery = () => {
    const API_URL = import.meta.env.VITE_API_URL_IMG;
    const [gallery, setGallery] = useState([]);
    const [activeImage, setActiveImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6);

    const fetchGallery = async () => {
        try {
            const res = await apiClient.get("/gallery");
            setGallery(res.data);
        } catch (err) {
            console.error("gallery fetch error", err);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 6);
    };


    return (
        <>
            <Breadcrumb
                title="Our Photo Gallery"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Our Photo Gallery", active: true }
                ]}
            />

            <div className="gallery-area py-120">
                <div className="container">


                    {/* Gallery Grid */}
                    <div className="row g-4">
                        {gallery.slice(0, visibleCount).map((item, index) => (
                            <div
                                key={item._id}
                                className="col-md-4"
                                data-aos="fade-up"
                                data-aos-delay={(index + 1) * 100}
                            >
                                <div className="gallery-card">
                                    <div className="gallery-img-wrapper">
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

                    {visibleCount < gallery.length && (
                        <div className="row mt-5">
                            <div className="col-12 text-center" data-aos="zoom-in">
                                <button
                                    className="theme-btn"
                                    onClick={handleLoadMore}
                                    
                                >
                                    Load More <i className="fas fa-spinner fa-pulse ms-2" style={{ display: loading ? 'inline-block' : 'none' }}></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div >
            {activeImage && (
                <div className="lightbox-modal" onClick={() => setActiveImage(null)}>
                    <div className="lightbox-content" >
                        <button className="close-btn" >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <img src={activeImage} alt="Full View" />
                    </div>
                </div>
            )}
        </>
    )
}

export default PhotoGallery