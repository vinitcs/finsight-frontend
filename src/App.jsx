import React, { useEffect } from 'react'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routeConfig } from './config/routes'
import { fetchUser } from './store/slices/authSlice'
import { Toast } from './components/common/Toast'
import { hideToast } from './store/slices/toastSlice'

function AppRoutes() {
  const routes = useRoutes(routeConfig)
  return routes
}

function App() {
  const dispatch = useDispatch()
  const toast = useSelector((state) => state.toast)

  // Restore auth state on page load
  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  return (
    <Router>
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => dispatch(hideToast())}
        />
      )}
      <AppRoutes />
    </Router>
  )
}

export default App
