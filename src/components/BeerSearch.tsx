"use client"

import React, { useState } from 'react'
import BeerList from './BeerList'
import { Beer } from '@/model'
import Link from 'next/link'
import { MoveLeft, Search, X } from 'lucide-react'
import { useDebouncedValue } from '@mantine/hooks'

interface BeerSearchProps {
    initialData: Beer[]
}

const BeerSearch = ({ initialData }: BeerSearchProps) => {
  const [value, setValue] = useState<string>("");
  const [beerName] = useDebouncedValue(value, 200);

  return (
    <>
        <div className='sticky flex flex-row items-center justify-between gap-4'>
            <Link href="/" className='bg-blue-400 p-2 rounded-full h-10 w-10 flex justify-center items-center'>
                <MoveLeft color="white" />
            </Link>
            <div className='flex flex-row gap-2 justify-between items-center p-1 border-2 border-blue-300 basis-full rounded-full'>
              <Search width={20} height={20} className='ml-2' />
              <input 
                type="text" 
                className='basis-full focus:outline-none' 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
              />
              <button className='mr-2 flex justify-center items-center' onClick={() => setValue("")}>
                <X width={20} height={20} />
              </button>
            </div>
        </div>

        <div className='overflow-scroll'>
          <BeerList initialData={initialData} beerName={beerName} />
        </div>
    </>
  )
}

export default BeerSearch