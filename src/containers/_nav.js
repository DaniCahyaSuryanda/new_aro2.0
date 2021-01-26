import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Back Office",
    route: "/backoffice",
    icon: <CIcon name="cil-puzzle" customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Parameter Back Office",
        to: "/backoffice/paramsbackoffice",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Transaksi Back Office",
        to: "/backoffice/transaksibackoffice",
      },
    ],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Laporan Umum",
    route: "/laporan",
    icon: <CIcon name="cil-notes" customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "View Laporan",
        to: "/laporan/LaporanUmum",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Editor Laporan",
      //   to: "laporan/Editorlaporan/Editorlaporan",
      //   //  icon: <CIcon name="cil-layers" customClasses="c-sidebar-nav-icon" />,
      // },
    ],
  },
];

export default _nav;
