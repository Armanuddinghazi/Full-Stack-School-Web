import { useEffect } from "react";
import { applyTheme } from "../utils/applyTheme";

const useThemeLoader = () => {
   useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      applyTheme(JSON.parse(theme));
    }
  }, []);
};


export default useThemeLoader;
