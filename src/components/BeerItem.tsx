'use client'

import { Beer } from '@/model'
import React from 'react'
import Image from 'next/image'
import { Minus, Plus } from 'lucide-react'
import { shortenText } from '@/utils/helpers'
import { useAtom } from 'jotai'
import { beerListAtom } from '@/context'

interface BeerItemProps {
  beer: Beer
}

const BeerItem = ({ beer }: BeerItemProps) => {
  const { id, name, image_url: imageUrl, tagline } = beer
  const [beerList, setBeerList] = useAtom(beerListAtom)

  const formattedName = shortenText(name)
  const formattedTagline = shortenText(tagline, 20)

  const handleAddBeer = () => {
    setBeerList((oldState) => [...oldState, beer])
  }

  const handleRemoveBeer = () => {
    setBeerList((oldState) => oldState.filter((beer) => beer.id !== id))
  }

  const allreadyInList = beerList.find((beer) => beer.id === id)

  return (
    <div
      data-testid={`beer-item-${id}`}
      className="relative flex h-28 flex-row items-center justify-center gap-4 rounded-xl bg-blue-100 p-4 shadow sm:w-80 md:w-80 lg:w-80 xl:w-80"
    >
      <div className="relative h-20 w-5">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw"
          />
        )}
      </div>

      <div className="flex-auto">
        <h1 data-testid={`beer-item-${id}-name`} className="text-lg font-bold">
          {formattedName}
        </h1>
        <h2 data-testid={`beer-item-${id}-tagline`} className="text-md">
          {formattedTagline}
        </h2>
      </div>

      {allreadyInList ? (
        <button
          data-testid={`remove-beer-${id}`}
          className="h-7 place-content-center rounded-full"
          onClick={handleRemoveBeer}
        >
          <Minus className="text-red-600" />
        </button>
      ) : (
        <button
          data-testid={`add-beer-${id}`}
          className="h-7 place-content-center rounded-full"
          onClick={handleAddBeer}
        >
          <Plus className="text-green-600" />
        </button>
      )}
    </div>
  )
}

export default BeerItem
