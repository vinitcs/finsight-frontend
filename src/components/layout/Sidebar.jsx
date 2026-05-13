import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../store/slices/authSlice'
import { ROUTES } from '../../utils/constants'
import { ChartBarSquareIcon, ClipboardIcon, CreditCardIcon, ArrowUpTrayIcon, ChartBarIcon, Cog6ToothIcon, ArrowLeftStartOnRectangleIcon, LockClosedIcon, SparklesIcon } from "@heroicons/react/24/solid"

export const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const menuItems = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: ClipboardIcon },
    { name: 'Analytics', path: ROUTES.ANALYTICS, icon: ChartBarIcon },
    { name: 'AI Report', path: ROUTES.AI_REPORT, icon: SparklesIcon },
    { name: 'Transactions', path: ROUTES.TRANSACTIONS, icon: CreditCardIcon },
    { name: 'Upload', path: ROUTES.UPLOAD, icon: ArrowUpTrayIcon },
    { name: 'Accounts', path: ROUTES.ACCOUNT, icon: Cog6ToothIcon },
    { name: 'Update Password', path: ROUTES.UPDATE_PASSWORD, icon: LockClosedIcon }
  ]

  const handleLogout = async () => {
    // Dispatch logout action and wait for it to complete
    const result = await dispatch(logoutUser())
    // Only navigate if logout succeeded
    if (result.type === 'auth/logout/fulfilled') {
      // Token is cleared by backend (HTTP-only cookie)
      // Auth state is cleared by Redux reducer
      navigate(ROUTES.LOGIN)
    }
  }

  const handleNavClick = (path) => {
    navigate(path)
    if (window.innerWidth < 768) onClose()
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`flex flex-col fixed md:static w-64 h-screen overflow-y-auto z-40 transform transition-transform duration-300 border-r border-slate-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        {/* Logo */}
        <div className="flex mt-6 justify-center items-center p-6">
          <ChartBarSquareIcon className='w-6 h-6 text-secondary' />
          <span className="text-2xl font-medium text-primary flex items-center">
            Finsight
          </span>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium flex items-center gap-3 ${item.path === location.pathname ? 'bg-secondary text-light' : 'hover:bg-background hover:cursor-pointer'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto flex justify-center p-4">
          <button
            onClick={handleLogout}
            className="bg-light font-medium text-primary p-4 rounded-2xl hover:bg-primary hover:cursor-pointer hover:text-light transition-all duration-200  "
          >
            <ArrowLeftStartOnRectangleIcon className='w-5 h-5' />

          </button>
        </div>
      </div>
    </>
  )
}
