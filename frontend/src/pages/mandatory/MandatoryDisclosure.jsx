import React, { useEffect, useState } from "react";
import Breadcrumb from '../../components/ui/Breadcrumb';
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import apiClient from "../../api/apiClient";

const MandatoryDisclosure = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient.get("/disclosure")
            .then(res => {
                setTables(res.data || []);
            })
            .catch(err => {
                console.error("Disclosure fetch error", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Breadcrumb
                title="Mandatory Disclosure"
                bgImage={aboutBg}
                items={[
                    { label: "Home", path: "/" },
                    { label: "Mandatory Disclosure", active: true }
                ]}
            />

            <div className="mandatory-disclosure py-5">
                <div className="container">
                    <div className="tuition-wrap">
                        
                        {/* Loading State */}
                        {loading && (
                            <div className="d-flex justify-content-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && tables.length === 0 && (
                            <div className="alert alert-info text-center py-4 shadow-sm" role="alert">
                                <i className="fa-regular fa-folder-open me-2"></i>
                                No mandatory disclosure documents found. 
                            </div>
                        )}

                        {/* Tables Mapping */}
                        {tables.map((table, index) => {
                            // Skip render if no columns
                            if (!table.columns || table.columns.length === 0) return null;

                            return (
                                <div key={table._id || index} className="mb-5 table-container">
                                    {/* Table Title with a distinct border/style */}
                                    <div className="d-flex align-items-center mb-3 border-start border-4 border-primary ps-3" data-aos="fade-right">
                                        <h4 className="mb-0 text-dark fw-bold" >
                                            {table.title || table.label || "Document List"}
                                        </h4>
                                    </div>

                                    <div className="table-responsive  rounded " data-aos="fade-up">
                                        <table className="table table-hover table-striped table-bordered align-middle mb-0">
                                            <thead className="table-dark ">
                                                <tr>
                                                    {/* FIX: S.No width reduced to minimum */}
                                                    <th className="text-center py-2" style={{ width: "5%", whiteSpace: "nowrap" }}>
                                                        S.No
                                                    </th>
                                                    
                                                    {table.columns.map((col, i) => (
                                                        <th key={i} className="py-2" style={{ minWidth: "150px" }}>
                                                            {col}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {table.rows?.map((row, rIndex) => (
                                                    <tr key={rIndex}>
                                                        <td className="text-center  text-muted">
                                                            {rIndex + 1}
                                                        </td>
                                                        
                                                        {row.cells?.map((cell, cIndex) => {
                                                            if (cIndex >= table.columns.length) return null;
                                                            
                                                            return (
                                                                <td key={cIndex} className="py-2">
                                                                    <div className="d-flex align-items-center  flex-wrap gap-2">
                                                                        {/* Text Content */}
                                                                        <span className="text-dark">
                                                                            {cell?.text || ""}
                                                                        </span>
                                                                        
                                                                        {/* File Button */}
                                                                        {cell?.file && (
                                                                            <a
                                                                                href={import.meta.env.VITE_API_URL_IMG + cell.file}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className={`btn btn-sm px-3 rounded-3 d-inline-flex align-items-center ${
                                                                                    cell.fileType === "pdf" 
                                                                                    ? "btn-outline-danger" 
                                                                                    : "btn-outline-primary"
                                                                                }`}
                                                                                style={{ whiteSpace: "nowrap", transition: "all 0.3s" }}
                                                                            >
                                                                                <i className={`me-2 ${
                                                                                    cell.fileType === "pdf" 
                                                                                    ? "fa-solid fa-file-pdf" 
                                                                                    : "fa-solid fa-image"
                                                                                }`}></i>
                                                                                {cell.fileType === "pdf" ? "Open PDF" : "View Img"}
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MandatoryDisclosure;