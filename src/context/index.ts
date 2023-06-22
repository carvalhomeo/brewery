import { atomWithStorage } from 'jotai/utils'
import { Beer } from '@/model'
import { atom } from 'jotai'

export const beerListAtom = atomWithStorage<Beer[]>('beer_list', [])

export const selectedBeerAtom = atom<Beer>({} as Beer)
