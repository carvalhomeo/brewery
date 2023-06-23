'use client'

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
  const [value, setValue] = useState<string>('')
  const [beerName] = useDebouncedValue(value, 200)

  return (
    <>
      <div className="sticky flex flex-row items-center justify-between gap-4">
        <Link
          data-testid="go-back-btn"
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 p-2"
        >
          <MoveLeft color="white" />
        </Link>
        <div className="flex basis-full flex-row items-center justify-between gap-2 rounded-full border-2 border-blue-300 p-1">
          <Search width={20} height={20} className="ml-2" />
          <input
            data-testid="search-input"
            type="text"
            className="basis-full focus:outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            data-testid="clear-search"
            className="mr-2 flex items-center justify-center"
            onClick={() => setValue('')}
          >
            <X width={20} height={20} />
          </button>
        </div>
      </div>

      <div className="overflow-scroll scroll-smooth">
        <BeerList initialData={initialData} beerName={beerName} />
      </div>
    </>
  )
}

export default BeerSearch
