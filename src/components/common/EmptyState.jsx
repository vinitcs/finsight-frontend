export const EmptyState = ({
  icon,
  title,
  description,
  action,
  iconSize = 'lg',
}) => {
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon && (
        <div className={`${sizeClasses[iconSize]} text-slate-400 mb-4`}>
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-slate-600 text-center mb-6 max-w-sm">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}
