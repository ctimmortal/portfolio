import { beforeEach, describe, expect, it } from 'vitest'

import { CasedArray } from './cased-array'

describe(CasedArray.name, () => {
  it.each([undefined, 1, 'camel', 'something else', ['snake', 'thing', 'other thing']])(
    'can be constructed from a value of "%s"',
    value => {
      expect(() => new CasedArray(value as any)).not.toThrow()
    },
  )

  it('returns correctly cased strings when iterating', () => {
    const raw = ['things Here', 'OtherThings', 'more-things', 'LOUD THINGS']
    const expected = ['things_here', 'other_things', 'more_things', 'loud_things']

    const arr = new CasedArray('snake', ...raw)

    expect([...arr]).toStrictEqual(expected)
  })

  describe('.includes', () => {
    let array: CasedArray

    beforeEach(() => {
      array = new CasedArray('kebab', 'One two three', 'four FIVE', 'SIX')
    })

    it('returns true if the exact search value is a member of the array', () => {
      expect(array.includes('One two three')).toBe(true)
    })

    it('returns true if the search value is present but not of the same case', () => {
      expect(array.includes('four_five')).toBe(true)
    })

    it('returns false if the value is not present', () => {
      expect(array.includes('seven eight nine')).toBe(false)
    })
  })
})
