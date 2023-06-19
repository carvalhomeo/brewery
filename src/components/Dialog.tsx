'use client'

import { ReactNode } from "react"
import { X } from 'lucide-react'

interface DialogProps {
    children?: ReactNode
    open: boolean
    title: string
    onClose: () => void
}

const Dialog = ({children, open, title, onClose}: DialogProps) => {
  return (
    open ? 
      <div className="absolute top-0 right-0 h-screen w-screen backdrop-blur-sm flex justify-center items-center">
        <div className="flex flex-col h-3/4 w-3/4 sm:h-2/4 sm:w-2/4 md:h-2/4 md:w-2/4 lg:h-2/4 lg:w-2/4 bg-white rounded-xl p-4">
          <header className="flex flex-row justify-between items-center p-2">
            <h2 className="text-2xl">{title}</h2>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-blue-500 bg-blue-400 flex justify-center items-center">
              <X color="white" size={20}/>
            </button>
          </header>
          <div className="h-3/4">
            {children}
          </div>
        </div> 
      </div>
    : null
  )
}

export default Dialog