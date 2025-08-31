import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-md',
    'border',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-opacity-50',
    'active:transform',
    'active:scale-[0.98]',
    'select-none',
    'whitespace-nowrap',
  ].join(' ')

  const variants = {
    default: [
      'bg-primary',
      'text-white',
      'border-primary',
      'hover:opacity-90',
      'focus:ring-primary',
      'shadow-sm',
      'hover:shadow-md',
    ].join(' '),

    secondary: [
      'bg-neutral/10',
      'text-primary',
      'border-neutral/20',
      'hover:bg-neutral/20',
      'hover:border-neutral/30',
      'focus:ring-neutral',
    ].join(' '),

    outline: [
      'bg-transparent',
      'text-primary',
      'border-primary',
      'hover:bg-primary/10',
      'hover:text-primary',
      'focus:ring-primary',
    ].join(' '),

    ghost: [
      'bg-transparent',
      'text-neutral',
      'border-transparent',
      'hover:bg-neutral/10',
      'hover:text-primary',
      'focus:ring-neutral',
    ].join(' '),

    danger: [
      'bg-red-600',
      'text-white',
      'border-red-600',
      'hover:bg-red-700',
      'hover:border-red-700',
      'focus:ring-red-500',
      'shadow-sm',
      'hover:shadow-md',
    ].join(' '),

    success: [
      'bg-green-600',
      'text-white',
      'border-green-600',
      'hover:bg-green-700',
      'hover:border-green-700',
      'focus:ring-green-500',
      'shadow-sm',
      'hover:shadow-md',
    ].join(' '),
  }

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs min-h-[28px]',
    sm: 'px-3 py-2 text-sm min-h-[32px]',
    md: 'px-4 py-2.5 text-sm min-h-[36px]',
    lg: 'px-5 py-3 text-base min-h-[44px]',
    xl: 'px-6 py-4 text-lg min-h-[52px]',
  }

  const disabledClasses = disabled
    ? [
        'opacity-50',
        'cursor-not-allowed',
        'pointer-events-none',
        'transform-none',
        'shadow-none',
      ].join(' ')
    : ''

  const finalClasses = [
    baseClasses,
    variants[variant] || variants.default,
    sizes[size] || sizes.md,
    disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={finalClasses} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
export type { ButtonProps }
