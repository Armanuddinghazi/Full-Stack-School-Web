import React, { useState, useEffect } from "react";
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import Breadcrumb from '../../components/ui/Breadcrumb'
import apiClient from "../../api/apiClient";

const VideoGallery = () => {

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6);

    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const getThumbnail = (url) => {
        const id = getYouTubeId(url);
        return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "placeholder.jpg";
    };

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await apiClient.get("/videos");
                setVideos(res.data);
            } catch (err) {
                console.error("Error fetching videos", err);
            }
        };
        fetchVideos();
    }, []);


    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 6);
    };

    return (
        <>
            <Breadcrumb
                title="Our Video Gallery"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Our Video Gallery", active: true }
                ]}
            />

            <div className="gallery-area py-120">
                <div className="container">
                    <div className="row g-4">
                        {videos.slice(0, visibleCount).map((item, index) => (
                            <div
                                key={item._id}
                                className="col-md-4"
                                data-aos="fade-up"
                                data-aos-delay={(index + 1) * 100}
                            >
                                <div className="gallery-card video-card">
                                    <div className="gallery-img-wrapper">
                                        <img
                                            src={getThumbnail(item.videoUrl)}
                                            alt={item.title || "Video Thumbnail"}
                                        />

                                        <a
                                            href={item.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                fontSize: "3rem",
                                                color: "#fff",
                                                cursor: "pointer"
                                            }}
                                        >
                                            <i className="fab fa-youtube"></i>
                                        </a>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {visibleCount < videos.length && (
                        <div className="row mt-5">
                            <div className="col-12 text-center"  data-aos="zoom-in">
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
            </div>
        </>
    )
}

export default VideoGallery