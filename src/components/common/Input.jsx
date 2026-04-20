import React from 'react'

export const Input = React.forwardRef(
  ({ label, error, helperText, icon: Icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-2" style={{ color: '#1E3A5F' }}>
            {label}
            {props.required && <span className="text-red-500"> *</span>}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          )}
          <input
            ref={ref}
            className={`w-full px-4 py-2 ${Icon ? 'pl-10' : ''} bg-white border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300'
              }`}
            style={!error ? { focusRing: '2px solid #2563EB' } : {}}
            {...props}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'
              e.target.style.borderColor = '#2563EB'
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = ''
              e.target.style.borderColor = '#D1D5DB'
            }}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-slate-600">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
