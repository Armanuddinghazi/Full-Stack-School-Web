import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

const RedirectToLatestBlog = () => {
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get("/blogs").then(res => {
      if (res.data.length) {
        navigate(`/blog/${res.data[0]._id}`);
      }
    });
  }, []);

  return null;
};

export default RedirectToLatestBlog;
