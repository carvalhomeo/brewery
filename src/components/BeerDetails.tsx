import React from 'react'
import Image from 'next/image'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BeerDetailsProps {
    beer: any
}

const BeerDetails = ({beer}: BeerDetailsProps) => {
  const {back} = useRouter()

  return (
    <div className='p-4 gap-4 flex flex-col items-center sm:flex-row md:flex-row lg:flex-row h-screen'>
      <div className='flex flex-row border-2 border-blue-600'>
        <MoveLeft onClick={back} className='cursor-pointer border-2 border-red-600'/>
        <h1 className="border-2 border-red-600">{beer.name}</h1>
      </div>

      <div className='relative basis-2/3 w-1/3 sm:basis-2/5 md:basis-1/5 lg:basis-1/5'>
        <Image alt={beer.name} src={beer.image_url} fill />
      </div>

      <div className='basis-4/5 sm:basis-4/5 md:basis-4/5 lg:basis-4/5'>
        <p>{beer.description}</p>
      </div>
    </div>
  )
}

export default BeerDetails