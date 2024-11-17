import React from 'react'
import Profile from './views/profile/Profile'
import ChangePassword from './views/profile/ChangePassword'
import { element } from 'prop-types'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Customers = React.lazy(() => import('./views/customers/Customers.js'))
const AddCustomers = React.lazy(() => import('./views/customers/AddCustomer.js'))
const EditCustomers = React.lazy(() => import('./views/customers/EditCustomer.js'))

const Contact = React.lazy(() => import('./views/Contact/Contact.js'))
const AddNewContact = React.lazy(() => import('./views/Contact/AddNewContact.js'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/customers', name: 'Customers', element: Customers },
  { path: '/customers/addCustomer', name: ' Add Customers', element: AddCustomers },
  { path: '/customers/EditCustomer', name: ' Add Customers', element: EditCustomers },

  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/profile/change-password', name: 'Change Password', element: ChangePassword },
  { path: '/contact', name: 'Contact', element: Contact },
  { path: '/contact/addnew', name: 'Add Contact', element: AddNewContact },
  ]

export default routes
