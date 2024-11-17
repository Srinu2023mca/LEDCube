import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../app/features/auth/authSlice'
import { useGetUserMutation } from '../app/service/usersApiSlice'

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  // console.log(isAuthenticated)
  const dispatch = useDispatch()

  const [getUser,{isLoading}] = useGetUserMutation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUser().unwrap();
        // console.log(res)
        if (res?.status === 'success') {
          // console.log('authenticated')
          dispatch(setCredentials(res.user))
        }
      
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [dispatch])
  if (isLoading) {
    return <h1>Loading</h1>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace />
}

export default ProtectedRoute
