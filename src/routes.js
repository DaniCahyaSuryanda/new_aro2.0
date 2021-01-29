import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));
const Parambackoffice = React.lazy(() =>
  import("./views/backoffice/paramsbackoffice/Parambackoffice")
);
const Transaksibackoffice = React.lazy(() =>
  import("./views/backoffice/transaksibackoffice/transaksibackoffice")
);
const AkunAdd = React.lazy(() => import("./views/backoffice/akun/AkunAdd"));
const Akunaddvalidasi = React.lazy(() =>
  import("./views/backoffice/akun/AkunAddValidasi")
);
const Akunedit = React.lazy(() => import("./views/backoffice/akun/AkunEdit"));
const Akuneditvalidasi = React.lazy(() =>
  import("./views/backoffice/akun/AkunEditValidasi")
);
const JenisJurnalAdd = React.lazy(() =>
  import("./views/backoffice/JenisJurnal/JurnaltypeAdd")
);
const JJAddValidasi = React.lazy(() =>
  import("./views/backoffice/JenisJurnal/JurnaltypeAddValidasi")
);
const JJEdit = React.lazy(() =>
  import("./views/backoffice/JenisJurnal/Jurnaltypeedit")
);
const JJeditvalidasi = React.lazy(() =>
  import("./views/backoffice/JenisJurnal/JurnaltypeeditValidasi")
);
const Reportstrucutreadd = React.lazy(() =>
  import("./views/backoffice/strukturlaporan/repotstructureadd")
);
const Reportstrucutreaddvalidasi = React.lazy(() =>
  import("./views/backoffice/strukturlaporan/reportstructuraddvalidasi")
);
const Reportstrucutreedit = React.lazy(() =>
  import("./views/backoffice/strukturlaporan/reportstructureedit")
);
const Reportstrucutreeditvalidasi = React.lazy(() =>
  import("./views/backoffice/strukturlaporan/reportstructureeditvalidasi")
);
const JournalAdd = React.lazy(() =>
  import("./views/backoffice/Jurnalumum/JournalAdd")
);
const Journaladdvalidasi = React.lazy(() =>
  import("./views/backoffice/Jurnalumum/JournalAddValidasi")
);
const LaporanUmum = React.lazy(() => import("./views/laporan/LaporanUmum"));
const Editorlaporan = React.lazy(() =>
  import("./views/pemeliharaan/Editorlaporan/Editorlaporan")
);
const Manajemenperan = React.lazy(() =>
  import("./views/pemeliharaan/manajemenperan_Menu/Manajemenperan")
);
const Addnewoffice = React.lazy(() =>
  import("./views/pemeliharaan/manajemenKantor/Addnewoffice")
);
const Addnewofficevalidasi = React.lazy(() =>
  import("./views/pemeliharaan/manajemenKantor/Addnewofficevalidasi")
);
const Editoffice = React.lazy(() =>
  import("./views/pemeliharaan/manajemenKantor/Editoffice")
);
const LoginPage = React.lazy(() =>
  import("./views/auth/Login")
);

const ID = [
  {
    path: "/",
    exact: true,
    name: "",
  },
  {
    path: "/dashboard",
    name: "Beranda",
    component: Dashboard,
  },
  {
    path: "/backoffice",
    name: "Back Office",
    component: Parambackoffice,
    exact: true,
  },
  {
    path: "/backoffice/paramsbackoffice",
    name: "Parameter Back Office",
    component: Parambackoffice,
  },
  {
    path: "/backoffice/transaksibackoffice",
    name: "Transaksi Back Office",
    component: Transaksibackoffice,
  },
  // { path: '/akun', name: 'Back Office', component: Parambackoffice, exact: true },
  {
    path: "/backoffice/akun/AkunAdd",
    name: "Pembuatan Akun",
    component: AkunAdd,
  },
  {
    path: "/backoffice/akun/AkunAddValidasi",
    name: "Otorisasi Pembuatan Akun",
    component: Akunaddvalidasi,
  },
  {
    path: "/backoffice/akun/AkunEdit",
    name: "Pengkinian Akun",
    component: Akunedit,
  },
  {
    path: "/backoffice/akun/AkunEditValidasi",
    name: "Otorisasi Pengkinian Akun",
    component: Akuneditvalidasi,
  },
  // { path: '/JenisJurnal', name: 'Parameter Back Office', component: Parambackoffice, exact: true },
  {
    path: "/backoffice/JenisJurnal/JurnaltypeAdd",
    name: "Pembuatan Jenis Jurnal",
    component: JenisJurnalAdd,
  },
  {
    path: "/backoffice/JenisJurnal/JurnaltypeAddValidasi",
    name: "Otorisasi Pembuatan Jenis Jurnal",
    component: JJAddValidasi,
  },
  {
    path: "/backoffice/JenisJurnal/Jurnaltypeedit",
    name: "Pengkinian Jenis Jurnal",
    component: JJEdit,
  },
  {
    path: "/backoffice/JenisJurnal/JurnaltypeeditValidasi",
    name: "Otorisasi Pengkinian Jenis Jurnal",
    component: JJeditvalidasi,
  },
  {
    path: "/backoffice/strukturlaporan/reportstructureadd",
    name: "Pembuatan Struktur Akun",
    component: Reportstrucutreadd,
  },
  {
    path: "/backoffice/strukturlaporan/reportstructuraddvalidasi",
    name: "Otorisasi Pembuatan Struktur Akun",
    component: Reportstrucutreaddvalidasi,
  },
  {
    path: "/backoffice/strukturlaporan/reportstructureedit",
    name: "Pengkinian Struktur Akun",
    component: Reportstrucutreedit,
  },
  {
    path: "/backoffice/strukturlaporan/reportstructureeditvalidasi",
    name: "Otorisasi Pengkinian Struktur Akun",
    component: Reportstrucutreeditvalidasi,
  },
  {
    path: "/backoffice/Jurnalumum/JournalAdd",
    name: "Pembuatan Jurnal Umum",
    component: JournalAdd,
  },
  {
    path: "/backoffice/Jurnalumum/JournalAddValidasi",
    name: "Otorisasi Pembuatan Jurnal Umum",
    component: Journaladdvalidasi,
  },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/laporanumum", exact: true, component: LaporanUmum },
  {
    path: "/laporanumum/LaporanUmum",
    name: "Laporan Umum",
    component: LaporanUmum,
  },
  {
    path: "/pemeliharaan",
    name: "Pemeliharaan",
    // component: Manajemenperan,
    exact: true,
  },
  {
    path: "/pemeliharaan/Editorlaporan",
    name: "Editor Laporan ",
    component: Editorlaporan,
  },
  {
    path: "/pemeliharaan/manajemenperan_Menu/Manajemenperan",
    name: "Manajemen Peran",
    component: Manajemenperan,
  },
  {
    path: "/pemeliharaan/manajemenKantor/Addnewoffice",
    name: "Pembuatan Kantor Baru",
    component: Addnewoffice,
  },
  {
    path: "/pemeliharaan/manajemenKantor/Addnewofficevalidasi",
    name: "Otorisasi Pembuatan Kantor Baru",
    component: Addnewofficevalidasi,
  },
  {
    path: "/pemeliharaan/manajemenKantor/Editoffice",
    name: "Otorisasi Pembuatan Kantor Baru",
    component: Editoffice,
  },
  {
    path: "/auth/login",
    name: "Masuk",
    component: LoginPage,
  },
];

const EN = [
  {
    path: "/",
    exact: true,
    name: "",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/backoffice",
    name: "Back Office",
    component: Parambackoffice,
    exact: true,
  },
  {
    path: "/backoffice/paramsbackoffice",
    name: "Back Office Parameter",
    component: Parambackoffice,
  },
  {
    path: "/backoffice/transaksibackoffice",
    name: "Back Office Transaction",
    component: Transaksibackoffice,
  },
  // { path: '/akun', name: 'Back Office', component: Parambackoffice, exact: true },
  {
    path: "/backoffice/akun/AkunAdd",
    name: "Create New Account",
    component: AkunAdd,
  },
  {
    path: "/backoffice/akun/AkunAddValidasi",
    name: "Authorization New Account",
    component: Akunaddvalidasi,
  },
  {
    path: "/backoffice/akun/AkunEdit",
    name: "Updating Account",
    component: Akunedit,
  },
  {
    path: "/backoffice/akun/AkunEditValidasi",
    name: "Authorization Updating Account",
    component: Akuneditvalidasi,
  },
  // { path: '/JenisJurnal', name: 'Parameter Back Office', component: Parambackoffice, exact: true },
  {
    path: "/backoffice/JenisJurnal/JurnaltypeAdd",
    name: "Create New Journal",
    component: JenisJurnalAdd,
  },
  {
    path: "/backoffice/JenisJurnal/JurnaltypeAddValidasi",
    name: "Authorization New Journal Type",
    component: JJAddValidasi,
  },
  {
    path: "/backoffice/JenisJurnal/Jurnaltypeedit",
    name: "Updating Journal Type",
    component: JJEdit,
  },
  {
    path: "/backoffice/JenisJurnal/JurnaltypeeditValidasi",
    name: "Authorization Updating Journal Type",
    component: JJeditvalidasi,
  },
  {
    path: "/backoffice/strukturlaporan/reportstructureadd",
    name: "Create New Structure Account",
    component: Reportstrucutreadd,
  },
  {
    path: "/backoffice/strukturlaporan/reportstructuraddvalidasi",
    name: "Authorization Structure Account",
    component: Reportstrucutreaddvalidasi,
  },
  {
    path: "/backoffice/strukturlaporan/reportstructureedit",
    name: "Updating Structure Account",
    component: Reportstrucutreedit,
  },
  {
    path: "/backoffice/strukturlaporan/reportstructureeditvalidasi",
    name: "Authorization Updating Structure Account",
    component: Reportstrucutreeditvalidasi,
  },

  {
    path: "/backoffice/Jurnalumum/JournalAdd",
    name: "Journal Add Create",
    component: JournalAdd,
  },
  {
    path: "/backoffice/Jurnalumum/JournalAddValidasi",
    name: "Authorization New Journal",
    component: Journaladdvalidasi,
  },

  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },

  { path: "/laporanumum", exact: true, component: LaporanUmum },
  {
    path: "/laporanumum/LaporanUmum",
    name: "General Report",
    component: LaporanUmum,
  },

  {
    path: "/pemeliharaan",
    name: "Maintenance",
    // component: Manajemenperan,
    exact: true,
  },
  {
    path: "/pemeliharaan/Editorlaporan",
    name: "Report Editor ",
    component: Editorlaporan,
  },
  {
    path: "/pemeliharaan/manajemenperan_Menu/Manajemenperan",
    name: "Role Management",
    component: Manajemenperan,
  },
  {
    path: "/pemeliharaan/manajemenKantor/Addnewoffice",
    name: "Create New Office",
    component: Addnewoffice,
  },
  {
    path: "/pemeliharaan/manajemenKantor/Addnewofficevalidasi",
    name: "Authorization New Office",
    component: Addnewofficevalidasi,
  },
  {
    path: "/pemeliharaan/manajemenKantor/Editoffice",
    name: "Updating Office",
    component: Editoffice,
  },
  {
    path: "/auth/login",
    name: "Login",
    component: LoginPage,
    tipe: "auth"
  },
];

const routes = {
  id: ID,
  en: EN,
};
export default routes;
