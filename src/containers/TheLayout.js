import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

import classNames from "classnames";

const TheLayout = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const classes = classNames(
    "c-app c-default-layout",
    darkMode && "c-dark-theme"
  );
  const location = useLocation();
  const [isAuth, setAuth] = useState(null);
  useEffect(() => {
    if (isAuth === null) {
      console.log(location.pathname);
      if (location.pathname.search("auth") !== -1) {
        setAuth(true);
      }
    }
  }, [isAuth]);
  return (
    <div className={classes}>
      {!isAuth && <TheSidebar />}
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
