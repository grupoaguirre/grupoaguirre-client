import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled' | 'outlined' | 'ghost'
  inputSize?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const Input: React.FC<InputProps> = ({
  className = '',
  label,
  error,
  helperText,
  icon,
  rightIcon,
  variant = 'default',
  inputSize = 'md',
  fullWidth = true,
  disabled = false,
  ...props
}) => {
  const containerClasses = fullWidth ? 'w-full' : 'w-auto'

  const labelClasses = [
    'block',
    'text-sm',
    'font-medium',
    'text-primary',
    'mb-2',
    'select-none',
    disabled ? 'text-neutral/50' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const inputBaseClasses = [
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'placeholder:text-neutral/60',
    fullWidth ? 'w-full' : 'w-auto',
  ].join(' ')

  const variants = {
    default: [
      'bg-white',
      'border',
      'border-neutral/20',
      'focus:border-primary',
      'focus:ring-2',
      'focus:ring-primary/20',
      'hover:border-neutral/30',
    ].join(' '),

    filled: [
      'bg-neutral/10',
      'border',
      'border-transparent',
      'focus:bg-white',
      'focus:border-primary',
      'focus:ring-2',
      'focus:ring-primary/20',
      'hover:bg-neutral/20',
    ].join(' '),

    outlined: [
      'bg-white',
      'border-2',
      'border-neutral/20',
      'focus:border-primary',
      'focus:ring-1',
      'focus:ring-primary/30',
      'hover:border-neutral/30',
    ].join(' '),

    ghost: [
      'bg-transparent',
      'border',
      'border-transparent',
      'border-b-neutral/20',
      'rounded-none',
      'focus:border-b-primary',
      'focus:ring-0',
      'hover:border-b-neutral/30',
      'px-0',
    ].join(' '),
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm min-h-[32px]',
    md: 'px-4 py-2.5 text-base min-h-[40px]',
    lg: 'px-4 py-3 text-lg min-h-[48px]',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const errorClasses = error
    ? ['!border-red-500', 'focus:!border-red-500', 'focus:!ring-red-500/20'].join(' ')
    : ''

  const disabledClasses = disabled
    ? [
        'bg-neutral/10',
        'text-neutral/50',
        'cursor-not-allowed',
        'border-neutral/10',
        'hover:border-neutral/10',
      ].join(' ')
    : ''

  const paddingWithIcons = () => {
    const basePadding = sizes[inputSize]
    if (variant === 'ghost') return basePadding

    let leftPadding = ''
    let rightPadding = ''

    if (icon) {
      leftPadding = inputSize === 'sm' ? 'pl-9' : inputSize === 'lg' ? 'pl-12' : 'pl-10'
    }
    if (rightIcon) {
      rightPadding = inputSize === 'sm' ? 'pr-9' : inputSize === 'lg' ? 'pr-12' : 'pr-10'
    }

    return [basePadding, leftPadding, rightPadding].filter(Boolean).join(' ')
  }

  const inputClasses = [
    inputBaseClasses,
    variants[variant],
    paddingWithIcons(),
    errorClasses,
    disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const iconContainerClasses = [
    'absolute',
    'top-1/2',
    'transform',
    '-translate-y-1/2',
    'pointer-events-none',
    'text-neutral/60',
    disabled ? 'text-neutral/30' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const leftIconPosition = inputSize === 'sm' ? 'left-3' : 'left-3'
  const rightIconPosition = inputSize === 'sm' ? 'right-3' : 'right-3'

  return (
    <div className={containerClasses}>
      {label && <label className={labelClasses}>{label}</label>}

      <div className="relative">
        {icon && (
          <div className={`${iconContainerClasses} ${leftIconPosition}`}>
            <div className={iconSizes[inputSize]}>{icon}</div>
          </div>
        )}

        <input className={inputClasses} disabled={disabled} {...props} />

        {rightIcon && (
          <div className={`${iconContainerClasses} ${rightIconPosition}`}>
            <div className={iconSizes[inputSize]}>{rightIcon}</div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
          <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {helperText && !error && <p className="text-neutral/70 mt-2 text-sm">{helperText}</p>}
    </div>
  )
}

export default Input
export type { InputProps }
