'use client'

import { ReactNode } from 'react'
import { X } from 'lucide-react'

interface DialogProps {
  children?: ReactNode
  open: boolean
  title: string
  onClose: () => void
}

const Dialog = ({ children, open, title, onClose }: DialogProps) => {
  return open ? (
    <div className="absolute right-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div className="flex h-3/4 w-3/4 flex-col rounded-xl bg-white p-4 sm:h-2/4 sm:w-2/4 md:h-2/4 md:w-2/4 lg:h-2/4 lg:w-2/4">
        <header className="flex flex-row items-center justify-between p-2">
          <h2 className="text-2xl">{title}</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full bg-blue-400 p-1 hover:bg-blue-500"
          >
            <X color="white" size={20} />
          </button>
        </header>
        <div className="h-3/4">{children}</div>
      </div>
    </div>
  ) : null
}

export default Dialog
