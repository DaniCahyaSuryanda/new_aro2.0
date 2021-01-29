import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <span className="text-primary">Core Aro 2.0</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
