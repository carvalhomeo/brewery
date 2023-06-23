import { Beer } from '@/model'
import BeerBuilder from '../../src/utils/builders/BeerBuilder'

const addBeer = (id: number) => {
  cy.isVisible('beer-collection-title')
  cy.clickBtn('add-btn')
  cy.clickBtn(`add-beer-${id}`)
  cy.clickBtn('go-back-btn')
}

const removeBeer = (id: number) => {
  cy.isVisible('beer-collection-title')
  cy.clickBtn('add-btn')
  cy.clickBtn(`remove-beer-${id}`)
  cy.clickBtn('go-back-btn')
}

describe('App', () => {
  it('should be able to add a beer to collection', () => {
    cy.visit('/')

    addBeer(1)
    cy.isVisible('beer-name-1', 'Buzz')

    const aBeer = BeerBuilder.aBeer().build()
    cy.checkStore('beer_list', [aBeer])
  })

  it('should be able to add multiple beers to collection', () => {
    cy.visit('/')

    addBeer(1)
    cy.isVisible('beer-name-1', 'Buzz')

    addBeer(2)
    cy.isInvisible('beer-name-2', 'Trashy Blonde')

    cy.window()
      .its(`localStorage.beer_list`)
      .then((beerListStore) => {
        const beerList: Beer[] = JSON.parse(beerListStore)

        expect(beerList.length).equal(2)
        expect(beerList[0].name).equal('Buzz')
        expect(beerList[1].name).equal('Trashy Blonde')
      })

    cy.get('[data-testid="beer-list"]').scrollTo('bottom')
    cy.isVisible('beer-name-2', 'Trashy Blonde')
  })

  it('should be able to remove beer from collection', () => {
    cy.visit('/')

    addBeer(1)
    addBeer(2)
    removeBeer(1)

    cy.window()
      .its(`localStorage.beer_list`)
      .then((beerListStore) => {
        const beerList: Beer[] = JSON.parse(beerListStore)

        expect(beerList.length).equal(1)
        expect(beerList[0].name).equal('Trashy Blonde')
      })
  })

  it('should be able to search for a beer', () => {
    cy.visit('/new')
    cy.get('[data-testid="search-input"]').type('Buzz')
    cy.isVisible('beer-item-1')
    cy.isVisible('beer-item-1-name', 'Buzz')
    cy.isVisible('beer-item-1-tagline', 'A Real Bitter Experi...')
  })

  it('should be able to cancel search and go back', () => {
    cy.visit('/new')
    cy.get('[data-testid="search-input"]').type('Buzz')
    cy.isVisible('beer-item-1')
    cy.isVisible('beer-item-1-name', 'Buzz')
    cy.isVisible('beer-item-1-tagline', 'A Real Bitter Experi...')
    cy.clickBtn('clear-search')
    cy.clickBtn('go-back-btn')
    cy.checkStore('beer_list', undefined)
  })
})
