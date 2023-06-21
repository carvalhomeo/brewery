import BeerDetails from "@/components/BeerDetails"
import { Beer } from "@/model"
import { notFound } from "next/navigation"

async function getData(id: number): Promise<Beer[]> {
    const result = await fetch(`https://api.punkapi.com/v2/beers/${id}`)
    if(!result.ok) {
        notFound()	
    }
    return result.json()
}

export default async function Details({params: { id }}: {params: {id: number}}) {
    const beer: Beer[] = await getData(id)

    return beer.map(b => <BeerDetails key={b.id} beer={b} />)
}