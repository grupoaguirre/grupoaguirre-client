import React from 'react'

interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  group?: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
  variant?: 'default' | 'filled' | 'outlined' | 'ghost'
  selectSize?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  icon?: React.ReactNode
  loading?: boolean
}

const Select: React.FC<SelectProps> = ({
  className = '',
  label,
  error,
  helperText,
  options,
  placeholder,
  variant = 'default',
  selectSize = 'md',
  fullWidth = true,
  disabled = false,
  loading = false,
  icon,
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

  const selectBaseClasses = [
    'appearance-none',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'cursor-pointer',
    fullWidth ? 'w-full' : 'w-auto',
    loading || disabled ? 'cursor-not-allowed' : '',
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
      'focus:border-b-primary',
      'focus:ring-0',
      'hover:border-b-neutral/30',
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

  const disabledClasses =
    disabled || loading
      ? [
          'bg-neutral/10',
          'text-neutral/50',
          'cursor-not-allowed',
          'border-neutral/10',
          'hover:border-neutral/10',
        ].join(' ')
      : ''

  const paddingWithIcon =
    icon && variant !== 'ghost'
      ? selectSize === 'sm'
        ? 'pl-9'
        : selectSize === 'lg'
          ? 'pl-12'
          : 'pl-10'
      : ''

  const selectClasses = [
    selectBaseClasses,
    variants[variant],
    sizes[selectSize],
    paddingWithIcon,
    'pr-10', // Espacio para el chevron
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
    'left-3',
    'pointer-events-none',
    'text-neutral/60',
    disabled ? 'text-neutral/30' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const chevronClasses = [
    'absolute',
    'right-3',
    'top-1/2',
    'transform',
    '-translate-y-1/2',
    'pointer-events-none',
    'text-neutral/60',
    'transition-transform',
    'duration-200',
    disabled ? 'text-neutral/30' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const spinnerClasses = [
    'animate-spin',
    'absolute',
    'right-3',
    'top-1/2',
    'transform',
    '-translate-y-1/2',
    'text-primary',
  ].join(' ')

  // Agrupar opciones si tienen grupos
  const groupedOptions = options.reduce(
    (acc, option) => {
      const group = option.group || 'default'
      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(option)
      return acc
    },
    {} as Record<string, SelectOption[]>,
  )

  const hasGroups = Object.keys(groupedOptions).length > 1 || !groupedOptions.default

  const ChevronDown = () => (
    <svg
      className={iconSizes[selectSize]}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )

  const Spinner = () => (
    <svg className={iconSizes[selectSize]} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )

  return (
    <div className={containerClasses}>
      {label && <label className={labelClasses}>{label}</label>}

      <div className="relative">
        {icon && (
          <div className={iconContainerClasses}>
            <div className={iconSizes[selectSize]}>{icon}</div>
          </div>
        )}

        <select className={selectClasses} disabled={disabled || loading} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {hasGroups
            ? Object.entries(groupedOptions).map(([groupName, groupOptions]) =>
                groupName === 'default' ? (
                  groupOptions.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))
                ) : (
                  <optgroup key={groupName} label={groupName}>
                    {groupOptions.map((option) => (
                      <option key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ),
              )
            : options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
        </select>

        {loading ? (
          <div className={spinnerClasses}>
            <Spinner />
          </div>
        ) : (
          <div className={chevronClasses}>
            <ChevronDown />
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

export default Select
export type { SelectProps, SelectOption }
