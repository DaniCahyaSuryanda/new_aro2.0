import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CBadge,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Logo from "../assets/img/logoaro.png"
// routes config
import routes from '../routes'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { 
  TheHeaderStatus,
  TheHeaderLoc,
  TheHeaderUser,
}  from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)
  const darkMode = useSelector(state => state.darkMode)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CImg
          src={Logo}
          className="c-sidebar-brand-full"
          height={40}/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-1" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-1" >
          <CBadge color ="primary">App Date 01/01/2021</CBadge>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-1" >
        <CBadge color ="warning">Sys Date 31/01/2021</CBadge>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-1">
       
        <TheHeaderUser/>
        <TheHeaderStatus/>
        <TheHeaderLoc/>
        
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">

          <CToggler
                inHeader
                className="ml-3 d-md-down-none c-d-legacy-none"
                onClick={() => dispatch({type: 'set', darkMode: !darkMode})}
                title="Toggle Light/Dark Mode"
              >
                <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
                <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
        </CToggler>

            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-lock-locked" alt="Logout" />&nbsp;Logout
            </CLink>
            <CDropdown>
              <CDropdownToggle>
                Pilih Bahasa
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Indonesia</CDropdownItem>
                <CDropdownItem>Inggris</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
