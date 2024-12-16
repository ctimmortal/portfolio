import { DateTime } from 'luxon'
import { describe, expect, it } from 'vitest'

import { getDateLike } from './date-like'

describe('getDateLike', () => {
  it('returns DateTime instances unaltered', () => {
    const date = DateTime.now()
    expect(getDateLike(date)).toStrictEqual(date)
  })

  it.each([
    ['an object', { day: 1, month: 2 }],
    ['a string', '2024-02-01'],
    ['a Date', new Date(2024, 2, 1)],
  ])('accepts %s as input', (_, input) => {
    expect(getDateLike(input)).toBeInstanceOf(DateTime)
  })
})
