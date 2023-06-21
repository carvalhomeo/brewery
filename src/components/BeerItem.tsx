"use client"

import { Beer } from '@/model'
import React from 'react'
import Image from 'next/image'
import { Minus, Plus } from 'lucide-react'
import { shortenText } from '@/utils'
import { useAtom } from 'jotai'
import { beerListAtom } from '@/context'

interface BeerItemProps {
    beer: Beer
}

const BeerItem = ({ beer }: BeerItemProps) => {
    const {id, name, image_url, tagline} = beer;
    const [beerList, setBeerList] = useAtom(beerListAtom)

    const formattedName = shortenText(name)
    const formattedTagline = shortenText(tagline, 20)

    const handleAddBeer = () => {
        setBeerList(oldState => [...oldState, beer])
    }
    
    const handleRemoveBeer = () => {
        setBeerList(oldState => oldState.filter(beer => beer.id !== id))
    }

    const allreadyInList = beerList.find(beer => beer.id === id)

    return (
      <div className='relative flex flex-row justify-center items-center shadow bg-blue-100 p-4 rounded-xl gap-4 h-28'>
        
            <div className='relative h-20 w-5'>
                {image_url && <Image src={image_url} alt={name} fill sizes='100vw' />}
            </div>

            <div className="flex-auto">
                <h1 className='text-lg font-bold'>{formattedName}</h1>
                <h2 className='text-md'>{formattedTagline}</h2>
            </div>

            {
            allreadyInList ?
                <button 
                className="rounded-full h-7 place-content-center" 
                onClick={handleRemoveBeer}
                >
                    <Minus className='text-red-600' />
                </button> :
                <button 
                    className="rounded-full h-7 place-content-center" 
                    onClick={handleAddBeer}
                >
                    <Plus className='text-green-600' />
                </button>
            }
      </div>
    )
}

export default BeerItem