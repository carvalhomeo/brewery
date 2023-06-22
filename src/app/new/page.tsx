import { Beer } from '@/model'
import BeerSearch from '@/components/BeerSearch'

const New = async () => {
  const result = await fetch(
    'https://api.punkapi.com/v2/beers?page=1&per_page=10',
  )
  const data: Beer[] = await result.json()

  return (
    <div id="container" className="flex h-screen flex-col gap-4 p-8">
      <BeerSearch initialData={data} />
    </div>
  )
}

export default New
