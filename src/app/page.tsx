"use client"

import Beer from "@/components/Beer";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import { beerListAtom } from "@/context";
import { useAtom } from "jotai";
import { RefObject, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid"
import Input from "@/components/Input";
import {Beer as BeerModel} from "@/model"
import { ArrowUp } from "lucide-react";

type Inputs = {
  name: string
  tagline: string
  firstBrewed: string
  description: string
  imageUrl: string
}

export default function Home() {
  const [beerList, setBeerList] = useAtom(beerListAtom);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset
  } = useForm<Inputs>()

  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentPosition, setCurrentPosition] = useState<number | undefined>(0)

  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", () => {
      console.log(scrollRef.current?.scrollTop!);
      setCurrentPosition(scrollRef.current?.scrollTop!)
      // scrollRef.current?.scrollTop! === 0 ? 
      //   setCurrentPosition(0) : setCurrentPosition(scrollRef.current?.scrollTop! + scrollRef.current?.clientHeight!)
    })
  },[scrollRef])
  

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers?per_page=80").then((res) => {
      res.json().then((data) => {
        setBeerList(data.map(({id, name, tagline, first_brewed, description, image_url}: BeerModel) => ({
          id: uuidv4(),
          name, 
          tagline,
          first_brewed,
          description,
          image_url
        })))

        // setBeerList([{
        //   id: uuidv4(),
        //   name: "Bramling X", 
        //   tagline: "Hoppy Wheat Bier.",
        //   first_brewed: "04/2013",
        //   description: "An avalanche of cross-continental hop varieties give this porter a complex spicy, resinous and citrusy aroma, with a huge malt bill providing a complex roasty counterpoint. Digging deeper into the flavour draws out cinder toffee, bitter chocolate and hints of woodsmoke.",
        //   image_url: "https://images.punkapi.com/v2/16.png"
        // },
        // {
        //   id: uuidv4(),
        //   name: "Bramling X", 
        //   tagline: "Hoppy Wheat Bier.",
        //   first_brewed: "04/2013",
        //   description: "An avalanche of cross-continental hop varieties give this porter a complex spicy, resinous and citrusy aroma, with a huge malt bill providing a complex roasty counterpoint. Digging deeper into the flavour draws out cinder toffee, bitter chocolate and hints of woodsmoke.",
        //   image_url: "https://images.punkapi.com/v2/16.png"
        // }])
        
      })
    })
  }, [setBeerList])

  const handleAdd = () => {
    setOpenDialog(oldState => !oldState)
  }

  const handleCloseDialog = () => {
    setOpenDialog(oldState => !oldState)
    reset()
  }

  const onAdd: SubmitHandler<Inputs> = (data) => {
    const {name, tagline, firstBrewed, description, imageUrl} = data;
    setBeerList(oldState => [...oldState, {id: uuidv4(), name, tagline, first_brewed: firstBrewed, description, image_url: imageUrl}])
    setOpenDialog(oldState => !oldState)
    reset()
  }

  return (
    <main className="h-screen p-8 flex flex-col gap-4">

      <div className="flex flex-row justify-between items-center">
          <h1 className="basis-3/4 text-center flex text-4xl">Beer Collection</h1>
          <Button onClick={handleAdd} className="basis-1/4">Add</Button>
      </div>

      { beerList.length > 1 && 
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

      {scrollRef.current?.scrollTop! > scrollRef.current?.clientHeight! && 
      <div className="fixed bottom-2 right-2 bg-blue-400 p-4 rounded-full flex justify-center items-center">
        <a href="#top-content">
          <ArrowUp color="white"/>
        </a>
      </div>}

      <div ref={scrollRef} className="snap-y snap-mandatory overflow-scroll flex flex-col gap-4 scroll-smooth">
        {beerList.map((beer) => 
          <Beer key={beer?.id} beer={beer} />
        )}
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8 snap-y">
        {beerList.map((beer) => 
          <Beer key={beer?.id} beer={beer} />
        )}
      </div> */}

      <Dialog title="Add new beer to collection" open={openDialog} onClose={handleCloseDialog}>
        <form id="add-new-beer" onSubmit={handleSubmit(onAdd)} className="h-full">
          <div className="flex flex-col gap-4 justify-start items-start p-4 overflow-scroll h-full">
            <Input label="Name" name="name" placeholder="Punk IPA 2007 - 2010" register={register} validation="must provide name" error={errors.name?.message} />
            <Input label="Tagline" name="tagline" placeholder="Post Modern Classic. Spiky. Tropical. Hoppy." register={register} validation="must provide a tagline" error={errors.tagline?.message} />
            <Input label="First brewed" name="firstBrewed"  placeholder="04/2007" register={register} validation="must provide a date" error={errors.firstBrewed?.message} />
            <Input label="Description" name="description" register={register} validation="must provide a description" error={errors.description?.message} />
            <Input label="Image url" name="imageUrl" placeholder="https://images.punkapi.com/v2/192.png" register={register} validation="must provide a url" error={errors.imageUrl?.message} />
          </div>

          <div className="flex flex-row justify-end">
            <Button type="submit" form="add-new-beer">Save</Button>
          </div>
        </form>
      </Dialog>
    </main>
  )
}
