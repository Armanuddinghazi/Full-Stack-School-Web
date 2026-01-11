import React, { useEffect, useState } from "react";
import Breadcrumb from '../../components/ui/Breadcrumb'
import aboutBg from "../../assets/img/breadcrumb/01.jpg";
import apiClient from "../../api/apiClient";

const BACKUP = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        apiClient.get("/disclosure").then(res => {
            setTables(res.data);
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

            <div className="tuition-fee py-50">
                <div className="container">
                    <div className="tuition-wrap">
                    {tables.map((table) => (
                        <div className="tuition-fee-table" key={table._id}>
                            <h4 className="my-4" data-aos="fade-right">{table.title}</h4>
                            <div className="table-responsive" data-aos="fade-right">
                                <table className="table table-light">
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
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
                                                    <td key={cIndex}>{cell}</td>
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

export default BACKUP