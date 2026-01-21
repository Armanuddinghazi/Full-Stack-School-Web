// import React, { useEffect, useState } from "react";
// import apiClient from "../../api/apiClient";
// import { toast } from "react-toastify";

// const tableOptions = [
//     { key: "general_info", label: "General Information" },
//     { key: "documents_info", label: "Documents & Information" },
//     { key: "result_x", label: "Result Class X" },
//     { key: "result_xii", label: "Result Class XII" },
//     { key: "staff_teaching", label: "Staff Teaching" },
//     { key: "school_infra", label: "School Infrastructure" },
// ];

// const DisclosureAdmin = () => {
//     const [tableKey, setTableKey] = useState("general_info");
//     const [title, setTitle] = useState("");
//     const [columns, setColumns] = useState([]);
//     const [rows, setRows] = useState([]);
//     const [files, setFiles] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const fetchTable = async (key) => {
//         try {
//             setLoading(true);
//             const res = await apiClient.get(`/disclosure/${key}`);
//             if (res.data) {
//                 setTitle(res.data.title || "");

//                 // Ensure columns exist
//                 const fetchedCols = res.data.columns || [];
//                 setColumns(fetchedCols);

//                 const fetchedRows = res.data.rows || [];

//                 const validatedRows = fetchedRows.map(r => {
//                     const baseCells = Array(fetchedCols.length).fill(null).map(() => ({ text: "", file: "", fileType: "" }));

//                     if (r.cells) {
//                         r.cells.forEach((cell, idx) => {
//                             if (idx < baseCells.length) baseCells[idx] = cell;
//                         });
//                     }
//                     return { cells: baseCells };
//                 });

//                 setRows(validatedRows);

//             } else {
//                 setColumns([]);
//                 setRows([]);
//                 setTitle("");
//             }
//         } catch {
//             toast.error("Failed to load table");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTable(tableKey);
//     }, [tableKey]);


//     // ===========================
//     //   COLUMN HANDLERS
//     // ===========================

//     const handleAddColumn = () => {
//         // 1. Add new column header
//         const newCols = [...columns, ""];
//         setColumns(newCols);

//         // 2. Add an empty cell to EVERY existing row
//         const newRows = rows.map(row => ({
//             ...row,
//             cells: [...row.cells, { text: "", file: "", fileType: "" }]
//         }));
//         setRows(newRows);
//     };

//     const handleRemoveColumn = (colIndex) => {
//         const newCols = columns.filter((_, i) => i !== colIndex);
//         setColumns(newCols);

//         const newRows = rows.map(row => ({
//             ...row,
//             cells: row.cells.filter((_, i) => i !== colIndex)
//         }));
//         setRows(newRows);
//     };

//     const handleColumnNameChange = (val, index) => {
//         const newCols = [...columns];
//         newCols[index] = val;
//         setColumns(newCols);
//     };

//     // ===========================
//     //   ROW HANDLERS
//     // ===========================

//     const handleAddRow = () => {
//         const newRow = {
//             cells: Array(columns.length).fill(null).map(() => ({ text: "", file: "", fileType: "" }))
//         };
//         setRows([...rows, newRow]);
//     };

//     const handleRemoveRow = (rowIndex) => {
//         setRows(rows.filter((_, i) => i !== rowIndex));
//     };


//     // ===========================
//     //   CELL DATA HANDLERS
//     // ===========================

//     const handleTextChange = (val, rIndex, cIndex) => {
//         const tempRows = [...rows];
//         if (tempRows[rIndex] && tempRows[rIndex].cells[cIndex]) {
//             tempRows[rIndex].cells[cIndex].text = val;
//             setRows(tempRows);
//         }
//     };

//     const handleFileChange = (file, rIndex, cIndex) => {
//         if (!file) return;
//         const fileType = file.type.includes("pdf") ? "pdf" : "image";

//         const tempRows = [...rows];
//         tempRows[rIndex].cells[cIndex].file = file.name;
//         tempRows[rIndex].cells[cIndex].fileType = fileType;
//         setRows(tempRows);

//         setFiles((prev) => [
//             ...prev,
//             { fieldname: `files`, file, rIndex, cIndex }
//         ]);
//     };

 

//     // Ye function file ko "Save" se pehle hi hata deta hai
//     const handleRemoveFile = (rIndex, cIndex) => {
//         const tempRows = [...rows];
//         tempRows[rIndex].cells[cIndex].file = "";
//         tempRows[rIndex].cells[cIndex].fileType = "";
//         setRows(tempRows);

//         setFiles((prev) => prev.filter(f => !(f.rIndex === rIndex && f.cIndex === cIndex)));
//     };

//     const save = async () => {
//         try {
//             setLoading(true);
//             const fd = new FormData();
//             fd.append("data", JSON.stringify({ tableKey, title, columns, rows }));
//             files.forEach((f) => fd.append(f.fieldname, f.file));

//             await apiClient.post("/disclosure", fd);
//             toast.success("Table saved successfully");
//             setFiles([]);
//         } catch {
//             toast.error("Save failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container py-4">
//             <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
//                 <h5 className="mb-0">
//                     <i className="fa-solid fa-images me-2 text-primary"></i>
//                     Mandatory Disclosure Admin
//                 </h5>
//             </div>

//             <div className="row">
//                 <div className="col-lg-10 m-auto">
//                     <div className="card custom-card mb-4">
//                         <div className="card-header card-header-custom bg-primary text-white">
//                             <h5 className="mb-0">Mandatory Table</h5>
//                         </div>

//                         <div className="card-body">
//                             <div className="row g-3">
//                                 <div className="col-lg-6">
//                                     <label>Select Table Name</label>
//                                     <select className="form-select" value={tableKey} onChange={(e) => setTableKey(e.target.value)}>
//                                         {tableOptions.map((t) => (
//                                             <option key={t.key} value={t.key}>{t.label}</option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 <div className="col-lg-6">
//                                     <label>Title</label>
//                                     <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
//                                 </div>

//                                 {/* COLUMNS MANAGEMENT */}
//                                 <h5 className="mb-0 mt-4">Columns Configuration</h5>
//                                 <div className="col-lg-12">
//                                     {columns.map((col, i) => (
//                                         <div key={i} className="d-flex mb-2">
//                                             <input
//                                                 className="form-control me-2"
//                                                 value={col}
//                                                 placeholder={`Column ${i + 1} Name`}
//                                                 onChange={(e) => handleColumnNameChange(e.target.value, i)}
//                                             />
//                                             <button className="btn btn-danger light" onClick={() => handleRemoveColumn(i)}>
//                                                 <i className="fa-slab fa-regular fa-xmark"></i>
//                                             </button>
//                                         </div>
//                                     ))}
//                                     <button className="btn btn-primary light py-2 btn-radius-8 mb-3 mt-2" onClick={handleAddColumn}>
//                                         <i className="fa-solid fa-plus me-1"></i> Add Column
//                                     </button>
//                                 </div>

//                                 {/* ROWS MANAGEMENT */}
//                                 <h5 className="mb-0 mt-4">Rows Data</h5>
//                                 <div className="col-lg-12">
//                                     {rows.map((row, rIndex) => (
//                                         <div key={rIndex} className="border p-3 mb-3 rounded bg-light">
//                                             <div className="d-flex justify-content-between mb-2">
//                                                 <strong>Row {rIndex + 1}</strong>
//                                                 <button className="btn btn-danger btn-sm light btn-radius-8" onClick={() => handleRemoveRow(rIndex)}>
//                                                     <i className="fa-sharp fa-solid fa-trash"></i> Remove Row
//                                                 </button>
//                                             </div>

//                                             {/* Render Cells based on Columns */}
//                                             {row.cells.map((cell, cIndex) => (
//                                                 <div key={cIndex} className="mb-2">
//                                                     <label className="form-label text-muted" style={{ fontSize: '12px' }}>
//                                                         {columns[cIndex] || `Column ${cIndex + 1}`}
//                                                     </label>
//                                                     <div className="row g-2">
//                                                         <div className="col-lg-6">
//                                                             <input
//                                                                 className="form-control w-100"
//                                                                 placeholder="Text Data"
//                                                                 value={cell.text}
//                                                                 onChange={(e) => handleTextChange(e.target.value, rIndex, cIndex)}
//                                                             />
//                                                         </div>
//                                                         <div className="col-lg-6">
//                                                             <input
//                                                                 type="file"
//                                                                 className="form-control"
//                                                                 onChange={(e) => handleFileChange(e.target.files[0], rIndex, cIndex)}
//                                                             />
//                                                             {/* {cell.file && <small className="txt-success mb-0">{cell.file}</small>} */}

//                                                             {cell.file && (
//                                                                 <div className="d-flex justify-content-between align-items-center mt-1 p-1 border rounded bg-white">
//                                                                     <small className="text-success text-truncate me-2" title={cell.file}>
//                                                                         <i className="fa-solid fa-paperclip me-1"></i> {cell.file}
//                                                                     </small>
//                                                                     <button
//                                                                         className="btn btn-danger light btn-sm p-0 px-2"
//                                                                         onClick={() => handleRemoveFile(rIndex, cIndex)}
//                                                                         type="button"
//                                                                     >
//                                                                         <i className="fa-solid fa-xmark " style={{ fontSize: '13px' }}></i>
//                                                                     </button>
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     ))}

//                                     <button className="btn btn-success light py-2 btn-radius-8 mb-3 mt-2" onClick={handleAddRow}>
//                                         <i className="fa-solid fa-plus me-1"></i> Add Row
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="card-footer text-center">
//                             <button className="btn btn-primary py-2 btn-radius-8" onClick={save} disabled={loading}>
//                                 <i className="fa-duotone fa-solid fa-arrow-down-to-arc"></i> {loading ? "Saving..." : "Save Table"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DisclosureAdmin;

