'use client'

import Beer from '@/components/Beer'
import { beerListAtom } from '@/context'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { ArrowUp, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [beerList] = useAtom(beerListAtom)
  const { push } = useRouter()
  const scrollToRef = useRef<HTMLAnchorElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentPosition, setCurrentPosition] = useState<number | undefined>(0)

  useEffect(() => {
    scrollRef.current?.addEventListener('scroll', () => {
      setCurrentPosition(scrollRef.current?.scrollTop!)
    })
  }, [scrollRef])

  const handleAdd = () => {
    push('/new')
  }

  return (
    <main className="flex h-screen flex-col gap-4 bg-gradient-to-tl from-blue-200 to-white p-8">
      <div className="flex flex-row items-center justify-center">
        <h1
          data-testid="beer-collection-title"
          className="text-center text-4xl font-bold"
        >
          Beer Collection
        </h1>
        <button
          data-testid="add-btn"
          onClick={handleAdd}
          className="fixed bottom-2 right-2 flex items-center justify-center rounded-full bg-blue-400 p-4"
        >
          <Plus color="white" />
        </button>
      </div>

      {beerList.length > 1 && (
        <div>
          <progress
            className="
              h-2 
              w-full
              [&::-moz-progress-bar]:bg-blue-400 
              [&::-webkit-progress-bar]:rounded-lg   
              [&::-webkit-progress-bar]:bg-transparent
              [&::-webkit-progress-value]:rounded-lg 
              [&::-webkit-progress-value]:bg-blue-400"
            value={currentPosition}
            max={
              scrollRef.current
                ? scrollRef.current?.scrollHeight! -
                  scrollRef.current?.clientHeight!
                : 0
            }
          />
        </div>
      )}

      <div
        data-testid="beer-list"
        ref={scrollRef}
        className="flex snap-y snap-mandatory flex-col gap-4 overflow-scroll scroll-smooth scrollbar-hide"
      >
        {beerList.map((beer, index) => (
          <Beer
            key={beer?.id}
            beer={beer}
            scrollRef={scrollToRef}
            index={index}
          />
        ))}
      </div>

      {scrollRef.current?.scrollTop! > 1 && (
        <button
          className="fixed bottom-20 right-2 flex items-center justify-center rounded-full bg-blue-400 p-4"
          onClick={() => scrollToRef?.current?.scrollIntoView()}
        >
          <ArrowUp color="white" />
        </button>
      )}
    </main>
  )
}
