import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";

const tableOptions = [
    { key: "general_info", label: "General Information" },
    { key: "documents_info", label: "Documents & Information" },
    { key: "result_x", label: "Result Class X" },
    { key: "result_xii", label: "Result Class XII" },
    { key: "staff_teaching", label: "Staff Teaching" },
];

const DisclosureAdmin = () => {
    const [tableKey, setTableKey] = useState("general_info");
    const [title, setTitle] = useState("");
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const normalizeRows = (rowsData, cols) => {
        return rowsData.map((r) => ({
            cells: Array.from({ length: cols.length }).map(
                (_, i) => r.cells?.[i] || ""
            ),
        }));
    };

    const fetchTable = async (key) => {
        try {
            setLoading(true);
            setTitle("");
            setColumns([]);
            setRows([]);

            const res = await apiClient.get(`/disclosure/${key}`);

            if (res.data) {
                setTitle(res.data.title || "");
                setColumns(res.data.columns || []);
                setRows(normalizeRows(res.data.rows || [], res.data.columns || []));
            }
        } catch (err) {
            toast.error("Failed to load table");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTable(tableKey);
    }, [tableKey]);

    const save = async () => {
        try {
            await apiClient.post("/disclosure", {
                tableKey,
                title,
                columns,
                rows,
            });
            toast.success("Table updated successfully");
        } catch (err) {
            toast.error("Save failed");
        }
    };

    return (
        <>

            <div className="container py-4">
                {/* Header */}
                <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                    <h5 className="mb-0">
                        <i className="fa-solid fa-images me-2 text-primary"></i>
                        Mandatory Disclosure Admin
                    </h5>
                </div>
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        {/* Form Card */}
                        <div className="card custom-card mb-4">
                            <div className="card-header card-header-custom d-flex align-items-center bg-primary text-white fw-semibold">
                                <i className="fa-solid fa-pen-to-square me-2"></i>
                                <h5 className="mb-0">Mandatory Table</h5>
                            </div>

                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-lg-6">
                                        <label htmlFor="">Select Table Name</label>
                                        <select
                                            className="form-select mb-3"
                                            value={tableKey}
                                            onChange={(e) => setTableKey(e.target.value)}
                                        >
                                            {tableOptions.map((t) => (
                                                <option key={t.key} value={t.key}>{t.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="">Title</label>
                                        <input
                                            className="form-control mb-3"
                                            placeholder="Table Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>

                                    <h5 className="mb-0">Columns</h5>
                                    <div className="col-lg-12">
                                        {columns.map((col, i) => (
                                            <div key={i} className="d-flex  mb-2">
                                                <input
                                                    className="form-control me-2"
                                                    value={col}
                                                    placeholder={`Columns ${i + 1}`}
                                                    onChange={(e) => {
                                                        const temp = [...columns];
                                                        temp[i] = e.target.value;
                                                        setColumns(temp);
                                                        setRows(normalizeRows(rows, temp));
                                                    }}
                                                />
                                                <button
                                                    className="btn btn-danger light "
                                                    onClick={() => {
                                                        const newCols = columns.filter((_, idx) => idx !== i);
                                                        setColumns(newCols);
                                                        setRows(normalizeRows(rows, newCols));
                                                    }}
                                                >
                                                    <i className="fa-slab fa-regular fa-xmark"></i>
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            className="btn btn-primary light py-2 btn-radius-8 mb-3 mt-2"
                                            onClick={() => {
                                                const newCols = [...columns, ""];
                                                setColumns(newCols);
                                                setRows(normalizeRows(rows, newCols));
                                            }}
                                        >
                                            <i className="fa-solid fa-plus me-1"></i> Add Column
                                        </button>
                                    </div>


                                    {/* ROWS */}
                                    <h5>Rows</h5>
                                    <div className="col-lg-12">
                                        {rows.map((row, rIndex) => (
                                            <div key={rIndex} className="border p-2 mb-2 btn-radius-8">
                                                {columns.map((_, cIndex) => (
                                                    <input
                                                        key={cIndex}
                                                        className="form-control mb-1"
                                                        // placeholder={`Column ${cIndex + 1}`}
                                                        value={row.cells[cIndex]}
                                                        onChange={(e) => {
                                                            const temp = [...rows];
                                                            temp[rIndex].cells[cIndex] = e.target.value;
                                                            setRows(temp);
                                                        }}
                                                    />
                                                ))}
                                                <button
                                                    className="btn btn-danger light btn-radius-8 py-2 mt-1 btn-sm"
                                                    onClick={() =>
                                                        setRows(rows.filter((_, i) => i !== rIndex))
                                                    }
                                                >
                                                    <i className="fa-sharp fa-solid fa-trash"></i> Delete Row
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            className="btn btn-success light py-2 btn-radius-8 mt-2"
                                            onClick={() =>
                                                setRows([...rows, { cells: Array(columns.length).fill("") }])
                                            }
                                        >
                                            <i className="fa-solid fa-plus me-1"></i> Add Row
                                        </button>
                                    </div>

                                    <br /><br />


                                </div>
                            </div>
                            <div className="card-footer text-center">
                                {/* <button className="btn btn-primary py-2 btn-radius-8" onClick={save}>
                                    <i class="fa-duotone fa-solid fa-arrow-down-to-arc"></i>  Save Table
                                </button> */}
                                <button className="btn btn-primary py-2 btn-radius-8" onClick={save} disabled={loading}>
                                   <i class="fa-duotone fa-solid fa-arrow-down-to-arc"></i> {loading ? "Saving..." : "Save Table"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default DisclosureAdmin;
