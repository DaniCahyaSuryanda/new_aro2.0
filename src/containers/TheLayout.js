import React from 'react'
import { useSelector } from 'react-redux'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import classNames from 'classnames'
const TheLayout = () => {
  const darkMode = useSelector(state => state.darkMode)
  const classes = classNames(
    'c-app c-default-layout',
    darkMode && 'c-dark-theme'
  )
  return (
    <div className={classes}>
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
