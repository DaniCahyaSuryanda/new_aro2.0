import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from "@coreui/react";

import Logo from "../assets/img/logoaro.png";
// sidebar nav config
import navID from "./sidebarMenu/_navID";
import navEN from "./sidebarMenu/_navEN";

const configApp = JSON.parse(sessionStorage.getItem("config"));
// import CIcon from '@coreui/icons-react'

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    if (navigation.length === 0) {
      if (configApp.lang === "id") {
        setNavigation(navID);
      } else if (configApp.lang === "en") {
        setNavigation(navEN);
      } else {
        setNavigation(navID);
      }
    }
  }, [navigation]);

  return (
    <>
      {navigation.length !== 0 && (
        <CSidebar
          show={show}
          onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
        >
          <CSidebarBrand className="d-md-down-none" to="/">
            <CImg src={Logo} className="c-sidebar-brand-full" height={35} />

            <CImg
              className="c-sidebar-brand-minimized"
              src={Logo}
              height={20}
            />
          </CSidebarBrand>
          <CSidebarNav>
            <CCreateElement
              items={navigation}
              components={{
                CSidebarNavDivider,
                CSidebarNavDropdown,
                CSidebarNavItem,
                CSidebarNavTitle,
              }}
            />
          </CSidebarNav>
          <CSidebarMinimizer className="c-d-md-down-none" />
        </CSidebar>
      )}
    </>
  );
};

export default React.memo(TheSidebar);
