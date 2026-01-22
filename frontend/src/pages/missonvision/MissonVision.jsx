import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Or use your apiClient
import apiClient from '../../api/apiClient';

const MissionVision = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiClient.get('/mission-vision');
                setData(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching mission/vision:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <section className="mv-section">
            <div className="container py-5">
                <div className="row g-4">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <div key={item._id} className="col-lg-6 col-md-12" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="mv-card text-center text-md-start d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">
                                    <div className="icon-box flex-shrink-0">
                                        <i className={item.icon}></i>
                                    </div>
                                    <div>
                                        <h3 className="mv-title">{item.title}</h3>
                                        <p className="mv-text">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No Mission or Vision data added yet.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MissionVision;