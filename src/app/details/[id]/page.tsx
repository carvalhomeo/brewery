'use client'

import BeerDetails from "@/components/BeerDetails"
import { selectedBeerAtom } from "@/context"
import { useAtom } from "jotai"

export default async function Details({params}: {params: {id: string}}) {
    const [selectedBeer, setSelectedBeer] = useAtom(selectedBeerAtom)

    return (
        <BeerDetails beer={selectedBeer} />
    )
}