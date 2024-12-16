import { describe, expect, it } from 'vitest'

import { resumeEntries } from './resume-entries'

describe('resumeEntries', () => {
  it('should work', () => {
    expect(resumeEntries()).toEqual('resume-entries')
  })
})
