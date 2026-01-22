

// import React, { useEffect, useState } from "react";
// import apiClient from "../../api/apiClient";
// import { toast } from "react-toastify";

// const DisclosureAdmin = () => {
//     // Dropdown/List States
//     const [tablesList, setTablesList] = useState([]); // Server se aayi hui tables ki list
//     const [searchTerm, setSearchTerm] = useState(""); // Filter ke liye

//     // Selection & Creation States
//     const [tableKey, setTableKey] = useState("");
//     const [newTableName, setNewTableName] = useState(""); // New table create karne ke liye

//     // Table Data States
//     const [title, setTitle] = useState("");
//     const [columns, setColumns] = useState([]);
//     const [rows, setRows] = useState([]);
//     const [files, setFiles] = useState([]); 
//     const [loading, setLoading] = useState(false);

//     // ===========================
//     //    FETCH TABLE LIST (NEW)
//     // ===========================
//     // Hamein backend se saari tables ki list chahiye hogi dropdown ke liye
//     const fetchAllTables = async () => {
//         try {
//             // NOTE: Aapke backend par ek route hona chahiye jo saare existing tables return kare
//             // Example route: /disclosure/list
//             const res = await apiClient.get("/disclosure/list"); 
//             if (res.data) {
//                 setTablesList(res.data); // Expecting array like [{key: 'abc', label: 'ABC'}, ...]

//                 // Agar list me data hai aur koi table selected nahi hai, to pehla select kar lo
//                 if (res.data.length > 0 && !tableKey) {
//                     setTableKey(res.data[0].key);
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching tables list:", error);
//             // toast.error("Could not load tables list");
//         }
//     };

//     useEffect(() => {
//         fetchAllTables();
//     }, []);

//     // ===========================
//     //    FETCH TABLE DATA
//     // ===========================
//     const fetchTable = async (key) => {
//         if (!key) return;
//         try {
//             setLoading(true);
//             setColumns([]);
//             setRows([]);
//             setTitle("");
//             setFiles([]); 

//             const res = await apiClient.get(`/disclosure/${key}`);

//             if (res.data) {
//                 setTitle(res.data.title || "");
//                 const fetchedCols = res.data.columns || [];
//                 setColumns(fetchedCols);
//                 const fetchedRows = res.data.rows || [];

//                 const validatedRows = fetchedRows.map((row) => {
//                     const existingCells = row.cells || [];
//                     const normalizedCells = Array(fetchedCols.length).fill(null).map((_, index) => {
//                         return existingCells[index] ? existingCells[index] : { text: "", file: "", fileType: "" };
//                     });
//                     return { cells: normalizedCells };
//                 });

//                 setRows(validatedRows);
//             } else {
//                 // New table case (backend par data nahi hai)
//                 setColumns([]);
//                 setRows([]);
//             }
//         } catch (error) {
//             console.error("Error fetching table:", error);
//             // New table ho sakta hai isliye error toast ignore kar sakte hain ya custom logic laga sakte hain
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Jab tableKey change ho, data fetch karo
//     useEffect(() => {
//         if (tableKey) {
//             fetchTable(tableKey);
//         }
//     }, [tableKey]);


//     // ===========================
//     //    CREATE NEW TABLE LOGIC
//     // ===========================
//     const handleCreateNewTable = () => {
//         if (!newTableName.trim()) {
//             toast.warning("Please enter a table name");
//             return;
//         }

//         // Name se Key generate karna (e.g., "Class X Result" -> "class_x_result")
//         const generatedKey = newTableName.toLowerCase().trim().replace(/ /g, "_").replace(/[^\w-]+/g, "");

//         // Check if already exists
//         const exists = tablesList.find(t => t.key === generatedKey);
//         if (exists) {
//             toast.info("Table already exists, switching to it.");
//             setTableKey(generatedKey);
//             setNewTableName("");
//             return;
//         }

//         // Setup UI for new table
//         const newEntry = { key: generatedKey, label: newTableName };
//         setTablesList([...tablesList, newEntry]); // Dropdown me add kar diya temporarily
//         setTableKey(generatedKey); // Select kar liya
//         setTitle(newTableName); // Title set kar diya
//         setColumns([]); // Clear old data
//         setRows([]); // Clear old data
//         setNewTableName("");
//         toast.success(`Created new table: ${newTableName}`);
//     };


//     // ===========================
//     //    COLUMN & ROW HANDLERS
//     // ===========================
//     const handleAddColumn = () => {
//         const newCols = [...columns, ""];
//         setColumns(newCols);
//         const newRows = rows.map((row) => ({
//             ...row,
//             cells: [...row.cells, { text: "", file: "", fileType: "" }]
//         }));
//         setRows(newRows);
//     };

//     const handleRemoveColumn = (colIndex) => {
//         const newCols = columns.filter((_, i) => i !== colIndex);
//         setColumns(newCols);
//         const newRows = rows.map((row) => ({
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

//     const handleAddRow = () => {
//         const newRow = {
//             cells: Array(columns.length).fill(null).map(() => ({ text: "", file: "", fileType: "" }))
//         };
//         setRows([...rows, newRow]);
//     };

//     const handleRemoveRow = (rowIndex) => {
//         setRows(rows.filter((_, i) => i !== rowIndex));
//     };

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
//         if (tempRows[rIndex] && tempRows[rIndex].cells[cIndex]) {
//             tempRows[rIndex].cells[cIndex].file = file.name;
//             tempRows[rIndex].cells[cIndex].fileType = fileType;
//             setRows(tempRows);
//             setFiles((prev) => [...prev, { fieldname: `files`, file, rIndex, cIndex }]);
//         }
//     };

//     const handleRemoveFile = (rIndex, cIndex) => {
//         const tempRows = [...rows];
//         if (tempRows[rIndex] && tempRows[rIndex].cells[cIndex]) {
//             tempRows[rIndex].cells[cIndex].file = "";
//             tempRows[rIndex].cells[cIndex].fileType = "";
//             setRows(tempRows);
//             setFiles((prev) => prev.filter(f => !(f.rIndex === rIndex && f.cIndex === cIndex)));
//         }
//     };

//     // ===========================
//     //    SAVE DATA
//     // ===========================
//     const save = async () => {
//         if (!tableKey) {
//             toast.error("No table selected or created.");
//             return;
//         }

//         try {
//             setLoading(true);
//             const fd = new FormData();

//             // Backend ko 'label' bhi bhejna pad sakta hai agar wo naya table save kar raha hai
//             // Find label from list or use title
//             const currentTableObj = tablesList.find(t => t.key === tableKey);
//             const labelToSend = currentTableObj ? currentTableObj.label : title;

//             fd.append("data", JSON.stringify({ 
//                 tableKey, 
//                 label: labelToSend, // Save karte waqt Label bhi bhejein
//                 title, 
//                 columns, 
//                 rows 
//             }));

//             files.forEach((f) => {
//                  fd.append(`files_${f.rIndex}_${f.cIndex}`, f.file);
//             });

//             await apiClient.post("/disclosure", fd);
//             toast.success("Table saved successfully");
//             setFiles([]);

//             // Save hone ke baad list refresh karein taaki naya table permanent ho jaye
//             fetchAllTables();
//         } catch (error) {
//             console.error(error);
//             toast.error("Save failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ===========================
//     //    FILTER LOGIC
//     // ===========================
//     const filteredOptions = tablesList.filter(t => 
//         t.label.toLowerCase().includes(searchTerm.toLowerCase())
//     );

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

//                     {/* SECTION 1: SELECTION & CREATION */}
//                     <div className="card custom-card mb-4">
//                         <div className="card-header bg-dark text-white">
//                             <h6 className="mb-0">Table Management</h6>
//                         </div>
//                         <div className="card-body">
//                             <div className="row g-3 align-items-end">
//                                 {/* Search & Select */}
//                                 <div className="col-lg-5">
//                                     <label className="form-label fw-bold">Select Existing Table</label>

//                                     {/* Search Filter Input */}
//                                     <input 
//                                         type="text" 
//                                         className="form-control mb-2 form-control-sm" 
//                                         placeholder="Filter tables..." 
//                                         value={searchTerm}
//                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                     />

//                                     <select 
//                                         className="form-select" 
//                                         value={tableKey} 
//                                         onChange={(e) => setTableKey(e.target.value)}
//                                     >
//                                         <option value="" disabled>-- Select a Table --</option>
//                                         {filteredOptions.map((t) => (
//                                             <option key={t.key} value={t.key}>{t.label}</option>
//                                         ))}
//                                         {filteredOptions.length === 0 && (
//                                             <option disabled>No tables found</option>
//                                         )}
//                                     </select>
//                                 </div>

//                                 <div className="col-lg-2 text-center fw-bold">
//                                     OR
//                                 </div>

//                                 {/* Create New */}
//                                 <div className="col-lg-5">
//                                     <label className="form-label fw-bold text-success">Create New Table</label>
//                                     <div className="d-flex">
//                                         <input 
//                                             className="form-control me-2" 
//                                             placeholder="Enter New Table Name"
//                                             value={newTableName}
//                                             onChange={(e) => setNewTableName(e.target.value)}
//                                         />
//                                         <button className="btn btn-success" onClick={handleCreateNewTable}>
//                                             Create
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* SECTION 2: TABLE EDITOR (Only shows if a key is selected) */}
//                     {tableKey && (
//                         <div className="card custom-card mb-4">
//                             <div className="card-header card-header-custom bg-primary text-white d-flex justify-content-between align-items-center">
//                                 <h5 className="mb-0">Editing: {tablesList.find(t=>t.key===tableKey)?.label || title}</h5>
//                                 <span className="badge bg-light text-dark">{tableKey}</span>
//                             </div>

//                             <div className="card-body">
//                                 <div className="row g-3">
//                                     <div className="col-lg-12">
//                                         <label className="form-label fw-bold">Page Title (Visible on Website)</label>
//                                         <input 
//                                             className="form-control" 
//                                             value={title} 
//                                             onChange={(e) => setTitle(e.target.value)} 
//                                             placeholder="Enter Table Title"
//                                         />
//                                     </div>

//                                     {/* COLUMNS */}
//                                     <div className="col-12 mt-4">
//                                         <div className="d-flex justify-content-between align-items-center mb-3">
//                                             <h5 className="mb-0">Columns</h5>
//                                             <button className="btn btn-primary btn-sm btn-radius-8" onClick={handleAddColumn}>
//                                                 <i className="fa-solid fa-plus me-1"></i> Add Column
//                                             </button>
//                                         </div>
//                                         <div className="row g-2">
//                                             {columns.map((col, i) => (
//                                                 <div key={i} className="col-md-6 d-flex">
//                                                     <input
//                                                         className="form-control me-2"
//                                                         value={col}
//                                                         placeholder={`Column ${i + 1} Name`}
//                                                         onChange={(e) => handleColumnNameChange(e.target.value, i)}
//                                                     />
//                                                     <button className="btn btn-danger light px-3" onClick={() => handleRemoveColumn(i)}>
//                                                         <i className="fa-solid fa-xmark"></i>
//                                                     </button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* ROWS */}
//                                     <div className="col-12 mt-4">
//                                         <div className="d-flex justify-content-between align-items-center mb-3">
//                                             <h5 className="mb-0">Rows</h5>
//                                             <button className="btn btn-success btn-sm btn-radius-8" onClick={handleAddRow}>
//                                                 <i className="fa-solid fa-plus me-1"></i> Add Row
//                                             </button>
//                                         </div>

//                                         {rows.length === 0 && (
//                                             <div className="text-center p-4 bg-light rounded text-muted">
//                                                 No rows. Add columns first, then add rows.
//                                             </div>
//                                         )}

//                                         {rows.map((row, rIndex) => (
//                                             <div key={rIndex} className="border p-3 mb-3 rounded bg-light shadow-sm">
//                                                 <div className="d-flex justify-content-between mb-2 border-bottom pb-2">
//                                                     <strong>Row {rIndex + 1}</strong>
//                                                     <button className="btn btn-danger btn-sm light btn-radius-8" onClick={() => handleRemoveRow(rIndex)}>
//                                                         Remove
//                                                     </button>
//                                                 </div>
//                                                 {row.cells.map((cell, cIndex) => {
//                                                     if (cIndex >= columns.length) return null;
//                                                     return (
//                                                         <div key={cIndex} className="mb-3">
//                                                             <label className="form-label text-primary" style={{ fontSize: '13px', fontWeight: '500' }}>
//                                                                 {columns[cIndex] || `Column ${cIndex + 1}`}
//                                                             </label>
//                                                             <div className="row g-2">
//                                                                 <div className="col-lg-6">
//                                                                     <input
//                                                                         className="form-control"
//                                                                         placeholder="Text..."
//                                                                         value={cell?.text || ""} 
//                                                                         onChange={(e) => handleTextChange(e.target.value, rIndex, cIndex)}
//                                                                     />
//                                                                 </div>
//                                                                 <div className="col-lg-6">
//                                                                     <input
//                                                                         type="file"
//                                                                         className="form-control"
//                                                                         onChange={(e) => handleFileChange(e.target.files[0], rIndex, cIndex)}
//                                                                     />
//                                                                     {cell?.file && (
//                                                                         <div className="d-flex justify-content-between align-items-center mt-1 p-2 border rounded bg-white">
//                                                                             <small className="text-success text-truncate me-2" style={{maxWidth: '80%'}}>
//                                                                                 <i className="fa-solid fa-paperclip me-1"></i> {cell.file}
//                                                                             </small>
//                                                                             <button className="btn btn-danger light btn-sm py-0 px-2" onClick={() => handleRemoveFile(rIndex, cIndex)} type="button">
//                                                                                 <i className="fa-solid fa-xmark"></i>
//                                                                             </button>
//                                                                         </div>
//                                                                     )}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     );
//                                                 })}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="card-footer text-center">
//                                 <button className="btn btn-primary py-2 px-4 btn-radius-8" onClick={save} disabled={loading}>
//                                     {loading ? <span><i className="fa-solid fa-spinner fa-spin me-2"></i> Saving...</span> : <span><i className="fa-solid fa-save me-2"></i> Save Table</span>}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DisclosureAdmin;




import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";

const DisclosureAdmin = () => {
    // Dropdown/List States
    const [tablesList, setTablesList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Selection & Creation States
    const [tableKey, setTableKey] = useState("");
    const [newTableName, setNewTableName] = useState("");

    // Table Data States
    const [title, setTitle] = useState("");
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // ===========================
    //     FETCH TABLE LIST
    // ===========================
    const fetchAllTables = async () => {
        try {
            const res = await apiClient.get("/disclosure/list");
            if (res.data) {
                setTablesList(res.data);

                const savedKey = localStorage.getItem("activeDisclosureTable");

                if (savedKey && res.data.find(t => t.key === savedKey)) {
                    setTableKey(savedKey); 
                }
            }
        } catch (error) {
            console.error("Error fetching tables list:", error);
        }
    };

    useEffect(() => {
        fetchAllTables();
    }, []);

    // ===========================
    //     FETCH SINGLE TABLE DATA
    // ===========================
    const fetchTable = async (key) => {
        if (!key) return;

        // --- SAVE TO LOCAL STORAGE ---
        localStorage.setItem("activeDisclosureTable", key);

        try {
            setLoading(true);
            setColumns([]);
            setRows([]);
            setTitle("");
            setFiles([]);

            const res = await apiClient.get(`/disclosure/${key}`);

            if (res.data) {
                setTitle(res.data.title || "");
                const fetchedCols = res.data.columns || [];
                setColumns(fetchedCols);
                const fetchedRows = res.data.rows || [];

                const validatedRows = fetchedRows.map((row) => {
                    const existingCells = row.cells || [];
                    const normalizedCells = Array(fetchedCols.length).fill(null).map((_, index) => {
                        return existingCells[index] ? existingCells[index] : { text: "", file: "", fileType: "" };
                    });
                    return { cells: normalizedCells };
                });

                setRows(validatedRows);
            }
        } catch (error) {
            console.error("Error fetching table:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tableKey) {
            fetchTable(tableKey);
        }
    }, [tableKey]);


    // ===========================
    //     CREATE NEW TABLE
    // ===========================
    const handleCreateNewTable = () => {
        if (!newTableName.trim()) {
            toast.warning("Please enter a table name");
            return;
        }

        const generatedKey = newTableName.toLowerCase().trim().replace(/ /g, "_").replace(/[^\w-]+/g, "");

        const exists = tablesList.find(t => t.key === generatedKey);
        if (exists) {
            toast.info("Table already exists, switching to it.");
            setTableKey(generatedKey);
            setNewTableName("");
            return;
        }

        // List update karo
        const newEntry = { key: generatedKey, label: newTableName };
        const updatedList = [...tablesList, newEntry];
        setTablesList(updatedList);

        // Naye table ko select karo
        setTableKey(generatedKey);

        // UI reset
        setTitle(newTableName);
        setColumns([]);
        setRows([]);
        setNewTableName("");

        toast.success(`Created: ${newTableName}. Save karna mat bhulein.`);
    };

    // ===========================
    //     DELETE TABLE (FIXED)
    // ===========================
    const handleDeleteTable = async () => {
        if (!tableKey) return;

        const confirmDelete = window.confirm(`Are you sure you want to delete "${title || tableKey}"?`);
        if (!confirmDelete) return;

        try {
            setLoading(true);

            await apiClient.delete(`/disclosure/${tableKey}`);

            toast.success("Table deleted successfully");

            const updatedList = tablesList.filter(t => t.key !== tableKey);
            setTablesList(updatedList);

            setTableKey("");
            setTitle("");
            setColumns([]);
            setRows([]);
            localStorage.removeItem("activeDisclosureTable");

        } catch (error) {
            console.error("Delete failed", error);
            toast.error("Failed to delete table");
        } finally {
            setLoading(false);
        }
    }

    // ===========================
    //     COLUMN & ROW HANDLERS
    // ===========================
    const handleAddColumn = () => {
        const newCols = [...columns, ""];
        setColumns(newCols);
        const newRows = rows.map((row) => ({
            ...row,
            cells: [...row.cells, { text: "", file: "", fileType: "" }]
        }));
        setRows(newRows);
    };

    const handleRemoveColumn = (colIndex) => {
        const newCols = columns.filter((_, i) => i !== colIndex);
        setColumns(newCols);
        const newRows = rows.map((row) => ({
            ...row,
            cells: row.cells.filter((_, i) => i !== colIndex)
        }));
        setRows(newRows);
    };

    const handleColumnNameChange = (val, index) => {
        const newCols = [...columns];
        newCols[index] = val;
        setColumns(newCols);
    };

    const handleAddRow = () => {
        const newRow = {
            cells: Array(columns.length).fill(null).map(() => ({ text: "", file: "", fileType: "" }))
        };
        setRows([...rows, newRow]);
    };
    const handleRemoveRow = (rowIndex) => {
        setRows(rows.filter((_, i) => i !== rowIndex));
    };

    const handleTextChange = (val, rIndex, cIndex) => {
        const tempRows = [...rows];
        if (tempRows[rIndex]?.cells[cIndex]) {
            tempRows[rIndex].cells[cIndex].text = val;
            setRows(tempRows);
        }
    };
    const handleFileChange = (file, rIndex, cIndex) => {
        if (!file) return;
        const fileType = file.type.includes("pdf") ? "pdf" : "image";
        const tempRows = [...rows];
        if (tempRows[rIndex]?.cells[cIndex]) {
            tempRows[rIndex].cells[cIndex].file = file.name;
            tempRows[rIndex].cells[cIndex].fileType = fileType;
            setRows(tempRows);
            setFiles((prev) => [...prev, { fieldname: `files`, file, rIndex, cIndex }]);
        }
    };

    const handleRemoveFile = (rIndex, cIndex) => {
        const tempRows = [...rows];
        if (tempRows[rIndex]?.cells[cIndex]) {
            tempRows[rIndex].cells[cIndex].file = "";
            tempRows[rIndex].cells[cIndex].fileType = "";
            setRows(tempRows);
            setFiles((prev) => prev.filter(f => !(f.rIndex === rIndex && f.cIndex === cIndex)));
        }
    };

    // ===========================
    //     SAVE DATA
    // ===========================
    const save = async () => {
        if (!tableKey) {
            toast.error("No table selected.");
            return;
        }

        try {
            setLoading(true);
            const fd = new FormData();

            const currentTableObj = tablesList.find(t => t.key === tableKey);
            const labelToSend = currentTableObj ? currentTableObj.label : title;

            fd.append("data", JSON.stringify({
                tableKey,
                label: labelToSend,
                title,
                columns,
                rows
            }));

            files.forEach((f) => {
                fd.append(`files_${f.rIndex}_${f.cIndex}`, f.file);
            });

            await apiClient.post("/disclosure", fd);
            toast.success("Table saved successfully");
            setFiles([]);

            fetchAllTables();
        } catch (error) {
            console.error(error);
            toast.error("Save failed");
        } finally {
            setLoading(false);
        }
    };

    // const filteredOptions = tablesList.filter(t => 
    //     (t.label || t.key).toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const filteredOptions = tablesList.filter(t =>
        (t.label || t.title || t.key || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                <h5 className="mb-0">
                    <i className="fa-solid fa-images me-2 text-primary"></i>
                    Mandatory Disclosure Admin
                </h5>
            </div>

            <div className="row">
                <div className="col-lg-10 m-auto">

                    {/* SECTION 1: SELECTION */}
                    <div className="card custom-card mb-4">
                         <div className="card-header card-header-custom d-flex align-items-center bg-dark text-white fw-semibold">
                                {/* <i className="fa-solid fa-pen-to-square me-2"></i> */}
                                <h5 className="mb-0">Table Management</h5>
                            </div>
                     
                        <div className="card-body">
                            <div className="row g-3 align-items-end">
                                <div className="col-lg-5">
                                    <label className="form-label fw-bold">Select Existing Table</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2 form-control-sm"
                                        placeholder="Filter tables..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <select
                                        className="form-select"
                                        value={tableKey}
                                        onChange={(e) => setTableKey(e.target.value)}
                                    >
                                        <option value="" disabled>-- Select a Table --</option>
                                        {filteredOptions.map((t) => (
                                            <option key={t.key} value={t.key}>{t.label || t.key}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-lg-2 text-center fw-bold">OR</div>
                                <div className="col-lg-5">
                                    <label className="form-label fw-bold txt-success-label">Create New Table</label>
                                    <div className="d-flex align-items-centr create_label">
                                        <input
                                            className="form-control me-2"
                                            placeholder="Enter New Table Name"
                                            value={newTableName}
                                            onChange={(e) => setNewTableName(e.target.value)}
                                        />
                                        <button className="btn d-flex align-items-center gap-1 btn-success dark" onClick={handleCreateNewTable}>
                                            <i class="fa-light fa-calendar-circle-plus"></i>
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: EDITOR */}
                    {tableKey && (
                        <div className="card custom-card mb-4">
                            <div className="card-header card-header-custom bg-primary text-white d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 me-2">
                                        Editing: <span className="fw-bold ">
                                            {tablesList.find(t => t.key === tableKey)?.label || title || "Untitled"}
                                        </span>
                                    </h5>
                                </div>
                                <button className="btn btn-danger btn-sm light btn-radius-8" onClick={handleDeleteTable} disabled={loading}>
                                    <i className="fa-solid fa-trash me-1"></i> Delete Table
                                </button>
                            </div>

                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-lg-12">
                                        <label className="form-label fw-bold">Page Title (Visible on Website)</label>
                                        <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Table Title" />
                                    </div>

                                    {/* Columns & Rows UI (Same as before) */}
                                    <div className="col-12 mt-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="mb-0">Columns</h5>
                                            <button className="btn btn-primary btn-sm btn-radius-8" onClick={handleAddColumn}><i className="fa-solid fa-plus me-1"></i> Add Column</button>
                                        </div>
                                        <div className="row g-2">
                                            {columns.map((col, i) => (
                                                <div key={i} className="col-md-6 d-flex">
                                                    <input className="form-control me-2" value={col} placeholder={`Column ${i + 1}`} onChange={(e) => handleColumnNameChange(e.target.value, i)} />
                                                    <button className="btn btn-danger light px-3" onClick={() => handleRemoveColumn(i)}><i className="fa-solid fa-xmark"></i></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col-12 mt-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="mb-0">Rows</h5>
                                            <button className="btn btn-success light btn-sm btn-radius-8" onClick={handleAddRow}><i className="fa-solid fa-plus me-1"></i> Add Row</button>
                                        </div>
                                        {rows.map((row, rIndex) => (
                                            <div key={rIndex} className="border p-3 mb-3 rounded bg-light shadow-sm">
                                                <div className="d-flex justify-content-between mb-2 border-bottom pb-2">
                                                    <strong>Row {rIndex + 1}</strong>
                                                    <button className="btn btn-danger btn-sm light btn-radius-8" onClick={() => handleRemoveRow(rIndex)}>
                                                        <i className="fa-solid fa-trash me-1"></i>
                                                        Remove</button>
                                                </div>
                                                {row.cells.map((cell, cIndex) => {
                                                    if (cIndex >= columns.length) return null;
                                                    return (
                                                        <div key={cIndex} className="mb-3">
                                                            <label className="form-label text-muted" style={{ fontSize: '13px', fontWeight: '500' }}>{columns[cIndex] || `Column ${cIndex + 1}`}</label>
                                                            <div className="row g-2">
                                                                <div className="col-lg-6">
                                                                    <input className="form-control" placeholder="Text..." value={cell?.text || ""} onChange={(e) => handleTextChange(e.target.value, rIndex, cIndex)} />
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <input type="file" className="form-control" onChange={(e) => handleFileChange(e.target.files[0], rIndex, cIndex)} />
                                                                    {cell?.file && (
                                                                        <div className="d-flex justify-content-between align-items-center mt-1 p-2 border rounded bg-white">
                                                                            <small className="text-success text-truncate me-2"><i className="fa-solid fa-paperclip me-1"></i> {cell.file}</small>
                                                                            <button className="btn btn-danger light btn-sm py-0 px-2" onClick={() => handleRemoveFile(rIndex, cIndex)}><i className="fa-solid fa-xmark"></i></button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer text-center">
                                <button className="btn btn-primary py-2 btn-radius-8" onClick={save} disabled={loading}>
                                    {loading ? <span><i className="fa-solid fa-spinner fa-spin me-2"></i> Saving...</span> : <span><i className="fa-solid fa-save me-2"></i> Save Table</span>}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DisclosureAdmin;
