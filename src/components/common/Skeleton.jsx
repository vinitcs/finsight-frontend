export const Skeleton = ({ count = 1, height = 'h-4', className = '' }) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${height} bg-background rounded overflow-hidden relative`}
        >
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-secondary/30 to-transparent" />
        </div>
      ))}
    </div>
  )
}
