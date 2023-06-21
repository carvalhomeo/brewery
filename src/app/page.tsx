"use client"

import Beer from "@/components/Beer";
import { beerListAtom } from "@/context";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [beerList,] = useAtom(beerListAtom);
  const { push } = useRouter()

  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentPosition, setCurrentPosition] = useState<number | undefined>(0)

  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", () => {
      setCurrentPosition(scrollRef.current?.scrollTop!)
    })
  },[scrollRef])

  const handleAdd = () => {
    push("/new")
  }

  return (
    <main className="h-screen p-8 flex flex-col gap-4 bg-gradient-to-tl from-blue-200 to-white">

      <div className="flex flex-row justify-center items-center">
          <h1 className="text-center text-4xl font-bold">Beer Collection</h1>
          <button onClick={handleAdd} className="fixed bottom-2 right-2 bg-blue-400 p-4 rounded-full flex justify-center items-center">
            <Plus color="white"/>
          </button>
      </div>

      {beerList.length > 1 && 
        <div>
          <progress 
            className="
              w-full 
              h-2
              [&::-webkit-progress-bar]:rounded-lg 
              [&::-webkit-progress-value]:rounded-lg   
              [&::-webkit-progress-bar]:bg-transparent
              [&::-webkit-progress-value]:bg-blue-400 
              [&::-moz-progress-bar]:bg-blue-400" 
            value={currentPosition} 
            max={scrollRef.current?.scrollHeight! - scrollRef.current?.clientHeight!} 
          />
        </div>
      }

      {scrollRef.current?.scrollTop! > 1 && 
        <div className="fixed bottom-20 right-2 bg-blue-400 p-4 rounded-full flex justify-center items-center">
          <Link href="#top-content" >
            <ArrowUp color="white"/>
          </Link>
        </div>
      }

      <div ref={scrollRef} className="snap-y snap-mandatory overflow-scroll scrollbar-hide flex flex-col gap-4 scroll-smooth">
        {beerList.map((beer) => 
          <Beer key={beer?.id} beer={beer} />
        )}
      </div>
    </main>
  )
}
