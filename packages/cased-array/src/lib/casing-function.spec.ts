import { describe, expect, it } from 'vitest'

import { CASE_TYPES, CaseType } from './case-type'
import { mapCaseTypeToFunction } from './casing-function'

describe(mapCaseTypeToFunction.name, () => {
  it('returns a function if given a valid CaseType', () => {
    expect(mapCaseTypeToFunction('camel')).toBeTypeOf('function')
  })

  it.each(CASE_TYPES)('returns a function if given a CaseType of %s', caseType => {
    expect(mapCaseTypeToFunction(caseType)).toBeTypeOf('function')
  })

  it('throws if given an invalid CaseType', () => {
    expect(() => {
      mapCaseTypeToFunction('wrong' as CaseType)
    }).toThrow("Invalid case type: 'wrong'")
  })
})
