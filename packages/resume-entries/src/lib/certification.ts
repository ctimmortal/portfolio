import { DateTime } from 'luxon'

import { DateLike, getDateLike } from './date-like'

export class Certification implements CertificationData {
  name: string
  issueDate: DateTime
  expirationDate?: DateTime

  constructor(data: CertificationData) {
    this.name = data.name
    this.issueDate = getDateLike(data.issueDate)
    if (data.expirationDate !== undefined) {
      this.expirationDate = getDateLike(data.expirationDate)
    }
  }
}

export interface CertificationData {
  /**
   * The name of the cert.
   */
  name: string
  /**
   * The date when this cert was issued.
   */
  issueDate: DateLike
  /**
   * The date when the cert expires, or undefined if it does not expire.
   */
  expirationDate?: DateLike
}
