import { DateTime } from 'luxon'
import { describe, expect, it } from 'vitest'

import { Certification, CertificationData } from './certification'

describe('Certification', () => {
  it('can be constructed', () => {
    const data: CertificationData = {
      name: 'some cert',
      issueDate: DateTime.fromObject({ month: 1, day: 1, year: 2001 }),
      expirationDate: DateTime.fromObject({ month: 1, day: 1, year: 2021 }),
    }
    const cert = new Certification(data)
    expect(cert).toMatchObject(data)
  })
})
