import { useEffect, useState } from "react";

const PreLoader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const skipped = sessionStorage.getItem("preloaderSkipped");
    if (skipped) {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      setShow(false);
    }, 99500); 

    return () => clearTimeout(timer);
  }, []);

  const cancelPreloader = () => {
    sessionStorage.setItem("preloaderSkipped", true);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="preloader">
      <button className="theme-btn preloaderCls" onClick={cancelPreloader}>
        Cancel Preloader
      </button>

      <div className="preloader-inner">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default PreLoader;
