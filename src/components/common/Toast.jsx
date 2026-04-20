import React, { useEffect } from 'react'

export const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-yellow-600',
  }

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  }

  const toastBgColor = {
    success: '#16A34A',
    error: '#DC2626',
    info: '#2563EB',
    warning: '#F59E0B',
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg text-white flex items-center gap-3 shadow-lg animate-slide-in"
      style={{ backgroundColor: toastBgColor[type] }}
    >
      <span className="text-lg">{icons[type]}</span>
      <span>{message}</span>
    </div>
  )
}
