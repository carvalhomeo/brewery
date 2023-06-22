'use client'

import { selectedBeerAtom } from '@/context'
import { Beer as BeerModel } from '@/model'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { Ref } from 'react'

interface BeerProps {
  beer: BeerModel
  scrollRef: Ref<HTMLAnchorElement>
  index: number
}

const Beer = ({ beer, scrollRef, index }: BeerProps) => {
  const { id, name, image_url: imageUrl } = beer
  const [, setsSlectedBeerAtom] = useAtom(selectedBeerAtom)

  const handleSelectBeer = () => {
    setsSlectedBeerAtom(beer)
  }

  return (
    <Link
      className="h-full cursor-pointer snap-start"
      href={`details/${id}`}
      onClick={handleSelectBeer}
      ref={index === 0 ? scrollRef : null}
    >
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="relative h-screen">
          {imageUrl && (
            <Image alt={name} src={imageUrl} fill className="object-contain" />
          )}
        </div>
        <h1 data-testid="beer-name" className="text-center text-3xl font-bold">
          {name}
        </h1>
      </div>
    </Link>
  )
}

export default Beer
