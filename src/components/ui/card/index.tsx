import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  children: React.ReactNode
}

interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'none',
  hover = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = ['transition-all', 'duration-300', 'ease-in-out'].join(' ')

  const variants = {
    default: ['bg-white', 'border', 'border-neutral/10', 'shadow-sm'].join(' '),

    elevated: ['bg-white', 'border-0', 'shadow-md', 'hover:shadow-xl'].join(' '),

    outlined: ['bg-white', 'border-2', 'border-neutral/10', 'shadow-none'].join(' '),

    ghost: ['bg-neutral/5', 'border', 'border-neutral/5', 'shadow-none'].join(' '),
  }

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  }

  const hoverClasses = hover
    ? ['hover:border-primary/20', 'hover:shadow-lg', 'hover:scale-[1.02]', 'cursor-pointer'].join(
        ' ',
      )
    : ''

  const finalClasses = [baseClasses, variants[variant], paddings[padding], hoverClasses, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={finalClasses} {...props}>
      {children}
    </div>
  )
}

const CardHeader: React.FC<CardSectionProps> = ({ className = '', children, ...props }) => {
  const classes = ['px-6', 'py-4', 'border-b', 'border-neutral/10', 'bg-neutral/5', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

const CardContent: React.FC<CardSectionProps> = ({ className = '', children, ...props }) => {
  const classes = ['px-6', 'py-4', 'flex-1', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

const CardFooter: React.FC<CardSectionProps> = ({ className = '', children, ...props }) => {
  const classes = [
    'px-6',
    'py-4',
    'border-t',
    'border-neutral/10',
    'bg-neutral/5',
    'flex',
    'items-center',
    'justify-between',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

const CardTitle: React.FC<CardSectionProps> = ({ className = '', children, ...props }) => {
  const classes = ['text-lg', 'font-semibold', 'text-primary', 'leading-tight', className]
    .filter(Boolean)
    .join(' ')

  return (
    <h3 className={classes} {...props}>
      {children}
    </h3>
  )
}

const CardDescription: React.FC<CardSectionProps> = ({ className = '', children, ...props }) => {
  const classes = ['text-sm', 'text-neutral', 'leading-relaxed', 'mt-1', className]
    .filter(Boolean)
    .join(' ')

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  )
}

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription }

export type { CardProps, CardSectionProps }
