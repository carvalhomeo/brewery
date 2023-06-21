"use client"

import React from "react"
import Image from "next/image"
import { MoveLeft } from "lucide-react"
import { Beer } from "@/model"
import Link from "next/link"

interface BeerDetailsProps {
    beer: Beer
}

const BeerDetails = ({beer}: BeerDetailsProps) => {
  const {name, image_url, tagline, description, first_brewed} = beer
 
  return (
    <div className="h-screen p-8 flex flex-col gap-4 bg-gradient-to-tl from-blue-200 to-white">
      
      <div className="flex flex-row gap-8 items-center">
        <Link href="/" className="bg-blue-400 p-2 rounded-full h-10 w-10 flex justify-center items-center">
          <MoveLeft color="white" />
        </Link>
        <div className="sm:basis-full sm:flex sm:flex-col sm:justify-center sm:items-center">
          <h1 className="text-xl">{name}</h1>
          <h2 className="text-sm">{tagline}</h2>
          <h3 className="text-xs">{first_brewed}</h3>
        </div>
      </div>

      <div className="relative h-full flex flex-col gap-4 sm:flex-row sm:items-center sm:p-8">
        <div className="relative basis-full h-4/5 sm:h-full">
          {image_url && <Image alt={name} src={image_url} fill sizes="100vw" style={{objectFit: "contain"}} />}
        </div>

        <p className="text-base text-center">{description}</p>
      </div>
    </div>
  )
}

export default BeerDetails