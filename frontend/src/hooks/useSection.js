import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

const useSection = (key) => {
  const [section, setSection] = useState(null);

  useEffect(() => {
    apiClient.get(`/sections/${key}`)
      .then(res => setSection(res.data))
      .catch(() => setSection(null));
  }, [key]);

  return section;
};

export default useSection;
