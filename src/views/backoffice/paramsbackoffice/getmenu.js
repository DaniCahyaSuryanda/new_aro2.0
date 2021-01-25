import CIcon from '@coreui/icons-react'
import {
    CButton, CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react'
import React from 'react'
import menuitem from '../../../gl/params/lang/id/menupbo.json'


const Getmenu = () => {
   const Listitem = menuitem.map((itemMenu) => 
         <CCol xs="12" md="6" xl="6">  
            <CCard>
              <CCardHeader color={itemMenu.Color} textColor="white">
               {itemMenu.Namamenu}
              </CCardHeader>

              <CCardBody>
                <CButton color={itemMenu.Color} variant='outline' className="mr-3 ml-3" to= {itemMenu.Addlink}>
                    <CIcon name={itemMenu.Iconadd} /> {itemMenu.Buttonadd}
                  </CButton>
                  <CButton color={itemMenu.Color} variant='outline' to= {itemMenu.Otorlink}>
                    <CIcon name={itemMenu.Iconotor} /> {itemMenu.ButtonOtor}
                  </CButton>
              </CCardBody>

            </CCard>
          </CCol>
  );
  return (
    // <>
    //  <JenisJurnal />
    //  <Akun />
    //  <StrukturLaporan />
     
    // </>
    <>
      <CRow>   
         {Listitem}
      </CRow>
   </>
  )
}
export default Getmenu
  