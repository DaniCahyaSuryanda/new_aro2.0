import React from 'react'
import {
  CHeaderNavItem,
  CHeaderNavLink,
  CHeaderNav
  

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderUser = () => {
  return (
    <CHeaderNav>
      <CHeaderNavItem className="px-1" >
          <CHeaderNavLink to="/users"><CIcon name="cil-user"/>Tandy Alam</CHeaderNavLink>
    </CHeaderNavItem>
    </CHeaderNav>
    
  )
}

export default TheHeaderUser