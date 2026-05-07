import React, { useEffect } from 'react';
import { COLORS as color } from "../../theme/colors";

export const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const toastBgColor = {
    success: color.success,
    error: color.danger,
    info: color.info,
    warning: color.warning,
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50 p-2 rounded-lg text-white flex items-center shadow-lg animate-slide-in"
      style={{ backgroundColor: toastBgColor[type] }}
    >
      <span>{message}</span>
    </div>
  )
}
