import React, {Suspense } from 'react'
import { BrowserRouter, Route, Routes,} from 'react-router-dom'

import { CSpinner} from '@coreui/react'
import './scss/style.scss'
import ForgotPassword from './views/pages/forgot/ForgotPassword'
import ResetPassword from './views/pages/forgot/ResetPassword';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const App = () => {
  // const { userInfo } = useSelector((state) => state.auth)
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        
        <Routes>
          <Route
            exact
            path="/login"
            name="Login Page"
            element={
              <Login />
            }
          />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route
            exact
            path="/forgot-password"
            name="Forgot Password Page"
            element={<ForgotPassword />}
          />
          <Route
            exact
            path="/reset-password/:token"
            name="Reset-Password Page"
            element={<ResetPassword />}
          />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" element={<DefaultLayout />} />
        </Routes>
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
