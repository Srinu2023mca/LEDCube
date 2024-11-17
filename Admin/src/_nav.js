import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilCalendar, cilNotes, cilLayers, cilTask, cilFile } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },

  {
    component: CNavItem,
    name: 'Customers',
    to: '/customers',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
]

export default _nav
