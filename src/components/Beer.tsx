'use client'

import { selectedBeerAtom } from '@/context'
import { Beer } from '@/model'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'

interface BeerProps {
  beer: Beer
}

const Beer = ({ beer }: BeerProps) => {
  const {id, name, image_url: imageUrl} = beer
  const [, setsSlectedBeerAtom] = useAtom(selectedBeerAtom)

  const handleSelectBeer = () => {
    setsSlectedBeerAtom(beer)
  }
  
  return (
    <Link
      className='cursor-pointer snap-start h-full' 
      href={`details/${id}`} 
      onClick={handleSelectBeer}
      id="top-content"
    >
      <div className='flex flex-col gap-4 h-full p-4'>
        <div className="relative h-screen">
            {imageUrl && <Image alt={name} src={imageUrl} fill style={{objectFit: "contain"}} />}
        </div>
        <h1 className="text-center font-bold text-3xl">{name}</h1>
      </div>
    </Link>
  )
}

export default Beer