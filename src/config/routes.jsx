import React from 'react'
import { Navigate } from 'react-router-dom'
import { Landing } from '../pages/Landing/Landing'
import { Login } from '../pages/Auth/Login'
import { Register } from '../pages/Auth/Register'
import { UpdatePassword } from '../pages/Auth/UpdatePassword'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import { Transactions } from '../pages/Transactions/Transactions'
import { Upload } from '../pages/Upload/Upload'
import { Analytics } from '../pages/Analytics/Analytics'
import { AIReport } from '../pages/Analytics/AIReport'
import { Account } from '../pages/Account/Account'
import { ProtectedRoute } from '../components/layout/ProtectedRoute'
import { ROUTES } from '../utils/constants'

/**
 * Object-based route configuration
 * Define routes as configuration objects for better maintainability
 */
export const routeConfig = [
  // Landing page
  {
    path: ROUTES.HOME,
    element: <Landing />,
  },

  // Public Routes
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },

  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.TRANSACTIONS,
        element: <Transactions />,
      },
      {
        path: ROUTES.UPLOAD,
        element: <Upload />,
      },
      {
        path: ROUTES.ANALYTICS,
        element: <Analytics />,
      },
      {
        path: ROUTES.AI_REPORT,
        element: <AIReport />,
      },
      {
        path: ROUTES.ACCOUNT,
        element: <Account />,
      },
      {
        path: ROUTES.UPDATE_PASSWORD,
        element: <UpdatePassword />,
      }
    ],
  },

  // Catch-all route - redirect to home
  {
    path: '*',
    element: <Navigate to={ROUTES.HOME} replace />,
  },
]
