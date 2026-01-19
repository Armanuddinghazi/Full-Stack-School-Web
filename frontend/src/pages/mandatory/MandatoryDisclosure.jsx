import React, { useEffect, useState } from "react";
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import apiClient from "../../api/apiClient";

const MandatoryDisclosure = () => {
    const [tables, setTables] = useState([]);

   useEffect(() => {
    apiClient.get("/disclosure")
      .then(res => setTables(res.data || []))
      .catch(err => console.error("Disclosure fetch error", err));
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

            <div className="mandatory-disclousre py-50">
                <div className="container">

                    <div className="tuition-wrap">
                        {tables.map((table) => (
                            <div key={table._id} className="mb-5">
                                <h4 className="mb-3" data-aos="fade-right">{table.title}</h4>

                                <div className="table-responsive" data-aos="fade-right">
                                    <table className="table table-light  table-bordered">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>S.No</th>
                                                {table.columns.map((col, i) => (
                                                    <th key={i}>{col}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {table.rows.map((row, rIndex) => (
                                                <tr key={rIndex}>
                                                    <td>{rIndex + 1}</td>
                                                    {row.cells.map((cell, cIndex) => (
                                                        <td key={cIndex}>
                                                            <div className="d-flex ">
                                                                <span>{cell?.text}</span>
                                                            {cell?.file && (
                                                                    <a
                                                                        href={import.meta.env.VITE_API_URL_IMG + cell.file}
                                                                        target="_blank"
                                                                        className={`btn btn-sm ${cell.fileType === "pdf" ? "btn-success": "btn-primary"}  btn-radius-8  light ms-2`}
                                                                    >
                                                                        <i class={`fa-light me-1 ${cell.fileType === "pdf" ? "fa-file-pdf" : "fa-image"}`}></i>
                                                                        {cell.fileType === "pdf" ? "View PDF" : "View Image"}
                                                                    </a>
                                                                )}                                                      
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MandatoryDisclosure