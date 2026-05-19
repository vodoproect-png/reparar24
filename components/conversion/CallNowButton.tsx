interface CallNowButtonProps {
  phone?: string
  text?: string
  variant?: 'primary' | 'secondary' | 'emergency'
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

export default function CallNowButton({
  phone = '+34900000000',
  text = 'Llamar Ahora',
  variant = 'primary',
  size = 'md',
  showIcon = true,
  className = '',
}: CallNowButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold rounded-lg transition-all duration-200 hover:scale-105'
  
  const variantStyles = {
    primary: 'bg-accent-500 hover:bg-accent-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl',
    emergency: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl animate-pulse',
  }
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <a
      href={`tel:${phone}`}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={text}
    >
      {showIcon && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      )}
      <span>{text}</span>
    </a>
  )
}
