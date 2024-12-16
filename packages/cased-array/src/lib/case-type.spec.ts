import { describe, expect, it } from 'vitest'

import { CASE_TYPES, isCaseType } from './case-type'

const trueTests = CASE_TYPES.map(e => [e, 'is'])
const falseTests = ['incorrect', 'CAMEL'].map(e => [e, 'is not'])
const tests = [...trueTests, ...falseTests]

describe(isCaseType.name, () => {
  it.each(tests)(
    'confirms that %s %s one of the ArrayCase type members',
    (value, expected) => {
      expect(isCaseType(value)).toBe(expected === 'is')
    },
  )
})
