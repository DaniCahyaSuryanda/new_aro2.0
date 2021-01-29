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
        name: "Transaction Back Office",
        to: "/backoffice/transaksibackoffice",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "General Report",
    to: "/laporanumum/LaporanUmum",
    icon: <CIcon name="cil-notes" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Maintenance",
    route: "/pemeliharaan",
    icon: <CIcon name="cil-settings" customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Report Editor",
        to: "/pemeliharaan/Editorlaporan",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Manage Role",
        to: "/pemeliharaan/manajemenperan_Menu/Manajemenperan",
      },
    ],
  },
];

export default _nav;
