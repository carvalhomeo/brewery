'use client'

import React from 'react'
import Image from 'next/image'
import { MoveLeft } from 'lucide-react'
import { Beer } from '@/model'
import Link from 'next/link'

interface BeerDetailsProps {
  beer: Beer
}

const BeerDetails = ({ beer }: BeerDetailsProps) => {
  const {
    name,
    image_url: imageUrl,
    tagline,
    description,
    first_brewed: firstBrewed,
  } = beer

  return (
    <div className="flex h-screen flex-col gap-4 bg-gradient-to-tl from-blue-200 to-white p-8">
      <div className="flex flex-row items-center gap-8">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 p-2"
        >
          <MoveLeft color="white" />
        </Link>
        <div className="sm:flex sm:basis-full sm:flex-col sm:items-center sm:justify-center">
          <h1 className="text-xl">{name}</h1>
          <h2 className="text-sm">{tagline}</h2>
          <h3 className="text-xs">{firstBrewed}</h3>
        </div>
      </div>

      <div className="relative flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:p-8">
        <div className="relative h-4/5 basis-full sm:h-full">
          {imageUrl && (
            <Image
              alt={name}
              src={imageUrl}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
            />
          )}
        </div>

        <p className="text-center text-base">{description}</p>
      </div>
    </div>
  )
}

export default BeerDetails
