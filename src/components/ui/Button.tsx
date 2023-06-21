'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode
  className?: string
}

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button {...rest} className={twMerge(className, 'bg-blue-400 rounded-full p-1 w-20 text-white')}>
      {children}
    </button>
  )
}

export default Button