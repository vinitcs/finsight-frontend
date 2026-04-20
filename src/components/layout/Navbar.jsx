import React from 'react'
import { useSelector } from 'react-redux'

export const Navbar = ({ onMenuClick, accountSelector }) => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="sticky top-0 z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:opacity-80 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Center - Account Selector */}
          <div className="flex-1 flex justify-center md:justify-start md:ml-4">
            {accountSelector}
          </div>

          {/* Right - User info */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-right hidden sm:block">
                <p className="text-xs text-black">{user.name}</p>
                <p className="text-xs text-black">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
