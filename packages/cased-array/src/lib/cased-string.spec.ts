import { beforeEach, describe, expect, it } from 'vitest'

import { CasedString } from './cased-string'

describe(CasedString.name, () => {
  let value: string

  beforeEach(() => {
    value = 'the VALUE of The sTring'
  })

  it('stores the original value internally', () => {
    expect(new CasedString(value, 'kebab')).toHaveProperty('$value', value)
  })

  it('returns the re-cased value from the .value getter', () => {
    expect(new CasedString(value, 'snake')).toHaveProperty(
      'value',
      'the_value_of_the_string',
    )
  })
})
