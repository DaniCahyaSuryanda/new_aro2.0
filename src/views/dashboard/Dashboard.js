import React from 'react'
import {
CJumbotron,
CImg,
CRow,
CCol
} from '@coreui/react'
import Logo from '../../assets/img/logoaro.png'

const Dashboard = () => {
  return (
    <>
    <CJumbotron>
      <CRow>
        <CCol xl="2">
            <CImg src={Logo} height={75}></CImg>
        </CCol>
        <CCol xl="10" >
            <h1>Akselara Raksa Optima</h1>
            <p>Multi Tenant Core Banking ARO 2.0</p>
        </CCol>
      </CRow>
    </CJumbotron>
    </>
  )
}

export default Dashboard
