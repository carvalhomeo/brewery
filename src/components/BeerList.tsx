'use client'

import { Beer } from '@/model'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import BeerItem from './BeerItem'

interface BeerListProps {
  initialData: Beer[]
  beerName: string
}

const fetchBeers = async ({ name = '', pageParam = 1 }) => {
  const query = name
    ? `https://api.punkapi.com/v2/beers?per_page=10&page=${pageParam}&beer_name=${name}`
    : `https://api.punkapi.com/v2/beers?per_page=10&page=${pageParam}`
  const result = await fetch(query)
  return await result.json()
}

const BeerList = ({ initialData, beerName }: BeerListProps) => {
  const lastBeerRef = useRef<HTMLDivElement>(null)
  const { ref, entry } = useIntersection({
    root: lastBeerRef?.current,
    threshold: 1,
  })

  const { data, fetchNextPage } = useInfiniteQuery(
    ['infinite-beers', beerName],
    ({ pageParam }) => fetchBeers({ name: beerName, pageParam }),
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
      initialData: { pages: [initialData], pageParams: [1] },
    },
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  const beers: Beer[] = data?.pages.flatMap((page) => page) ?? initialData

  return (
    <div>
      <ul className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
        {beers?.map((beer, index) => {
          if (index === beers.length - 1) {
            return (
              <li key={beer.id} ref={ref}>
                <BeerItem beer={beer} />
              </li>
            )
          } else {
            return (
              <li key={beer.id}>
                <BeerItem beer={beer} />
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}

export default BeerList
