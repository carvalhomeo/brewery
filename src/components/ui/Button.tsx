'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={twMerge(
        className,
        'w-20 rounded-full bg-blue-400 p-1 text-white',
      )}
    >
      {children}
    </button>
  )
}

export default Button
