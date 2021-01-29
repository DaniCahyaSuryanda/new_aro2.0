import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import menuitemID from "json/lang/id/Menajemen Peran/manajemen.json";
import menuitemEN from "json/lang/en/Menajemen Peran/manajemen.json";

const configApp = JSON.parse(sessionStorage.getItem("config"));

const Manajemenperan = () => {
  const [menuitem, setMenuitem] = useState(null);

  useEffect(() => {
    if (menuitem === null) {
      if (configApp.lang === "id") {
        setMenuitem(menuitemID);
      } else if (configApp.lang === "en") {
        setMenuitem(menuitemEN);
      } else {
        setMenuitem(menuitemID);
      }
    }
  }, [menuitem]);
  return (
    <>
      {menuitem && (
        <CRow>
          {menuitem.map((itemMenu) => (
            <CCol xs="12" md="6" xl="6">
              <CCard>
                <CCardHeader color={itemMenu.Color} textColor="white">
                  {itemMenu.Namamenu}
                </CCardHeader>

                <CCardBody>
                  <CButton
                    color={itemMenu.Color}
                    variant="outline"
                    className="mr-3 ml-3"
                    to={itemMenu.Addlink}
                  >
                    <CIcon name={itemMenu.Iconadd} /> {itemMenu.Buttonadd}
                  </CButton>
                  <CButton
                    color={itemMenu.Color}
                    variant="outline"
                    to={itemMenu.Otorlink}
                  >
                    <CIcon name={itemMenu.Iconotor} /> {itemMenu.ButtonOtor}
                  </CButton>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      )}
    </>
  );
};

export default Manajemenperan;
