import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header/Header";
import ImageModal from "./components/Modal/ImageModal";
import { IsMobileContext } from "./context/uiContext";

const MOBILE_WIDTH = 768;

const Layout = ({ children }) => {
  const refObject = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const resizeHandler = () => {
    if (refObject.current)
      setIsMobile(
        MOBILE_WIDTH > refObject.current.getBoundingClientRect().width
      );
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    setIsMobile(MOBILE_WIDTH > refObject.current.getBoundingClientRect().width);
    //eslint-disable-next-line
  }, [refObject.current]);

  return (
    <IsMobileContext.Provider value={isMobile}>
      <div ref={refObject}>
        <Header />
        <ImageModal />
        <main>{children}</main>
      </div>
    </IsMobileContext.Provider>
  );
};

export default Layout;
