"use client"

import React, { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    name: string
    register: UseFormRegister<any>
    validation?: boolean | string
    error?: string
}

const Input = ({ label, name, register, validation = false, error, ...rest }: InputProps) => {
  return (
    <div className='flex flex-col'>
        <label htmlFor={name}>
            {label}
        </label>
        <input
            className={`bg-transparent focus:outline-none border-b-2 border-gray-300 ${!error ? 'focus:border-blue-400' : 'focus:border-red-600'}`}
            type="text"
            {...register(name, { required: validation })}
            {...rest}
        />
        <p className='text-red-600 text-sm'>{error}</p>
    </div>
  )
}

export default Input