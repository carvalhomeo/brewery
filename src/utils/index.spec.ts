import { shortenText } from '.'

describe('utils tests', () => {
  describe('should shortenText', () => {
    it('should not shorten', () => {
      expect(shortenText('Lorem ipsum')).toEqual('Lorem ipsum')
    })
    it('should shorten with default length', () => {
      expect(
        shortenText(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          18,
        ),
      ).toEqual('Lorem ipsum dolor ...')
    })

    it('should shorten with length of 20', () => {
      expect(
        shortenText(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          20,
        ),
      ).toEqual('Lorem ipsum dolor si...')
    })
  })
})
