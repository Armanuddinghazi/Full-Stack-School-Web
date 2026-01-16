import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { applyTheme } from "../../utils/applyTheme";
import { DEFAULT_THEME } from "../../utils/themeDefaults";
import { THEME_FIELDS } from "../../utils/themeKeys";

const ThemeAdmin = () => {
    const [theme, setTheme] = useState(DEFAULT_THEME);
    const [themeId, setThemeId] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const localTheme = localStorage.getItem("theme");

        if (localTheme) {
            setTheme(JSON.parse(localTheme));
        } else {
            apiClient.get("/theme").then(res => {
                if (res.data) {
                    setThemeId(res.data._id);
                    const cleanTheme = extractTheme(res.data);
                    setTheme(cleanTheme);
                    localStorage.setItem("theme", JSON.stringify(cleanTheme));
                }
            });
        }
    }, []);

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const saveTheme = async () => {
        try {
            setSaving(true);
            await apiClient.post("/theme", {
                _id: themeId,
                ...theme
            });
            localStorage.setItem("theme", JSON.stringify(theme));
            toast.success("Theme Saved Successfully ");
        }
        catch (error) {
            console.error('error',error);
            toast.error("Failed to save theme");
        } finally {
            setSaving(false);
        }
    };

    const resetTheme = () => {
        localStorage.removeItem("theme");
        Object.keys(DEFAULT_THEME).forEach(key => {
            const cssVar = `--${key.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}`;
            document.documentElement.style.removeProperty(cssVar);
        });

        setTheme(DEFAULT_THEME);

        toast.success("Theme reset successfully");
    };


    return (
        <>
            <div className="container py-4">
                {/* Header */}
                <div className="d-flex justify-content-between custom-card-header align-items-center mb-4">
                    <h4 className="mb-0">
                        🎨 Theme Customizer
                    </h4>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        {/* Form Card */}
                        <div className="theme-admin">

                            <div className="theme-grid">
                                {THEME_FIELDS.map(({ key, label }) => (
                                    <div className="color-card" key={key}>
                                        <span>{label}</span>
                                        <input
                                            type="color"
                                            value={theme[key]}
                                            onChange={e =>
                                                setTheme({ ...theme, [key]: e.target.value })
                                            }
                                        />
                                    </div>
                                ))}

                            </div>

                            <div className="theme-actions">
                                <button className="save-btn " onClick={saveTheme}
                                    disabled={saving}>
                                    {saving ? (
                                        <>
                                            <i className="fa fa-spinner fa-spin"></i> Saving...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-regular fa-bookmark"></i> Save
                                        </>
                                    )}
                                    </button>
                                <button className="reset-btn " onClick={resetTheme}>
                                    <i className="fa-solid fa-rotate "></i>
                                    Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ThemeAdmin;


function extractTheme(data) {
    const clean = {};
    THEME_FIELDS.forEach(k => clean[k] = data[k] || DEFAULT_THEME[k]);
    return clean;
}