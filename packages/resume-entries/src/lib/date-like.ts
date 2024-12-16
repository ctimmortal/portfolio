import { DateObjectUnits, DateTime, Settings } from 'luxon'

Settings.throwOnInvalid = true

/**
 * Create a DateTime instance from a date-like value.
 * @param value a date-like value
 * @returns a new DateTime instance
 */
export function getDateLike(value: DateLike): DateTime {
  if (DateTime.isDateTime(value)) {
    return value
  }

  if (typeof value === 'string') {
    return DateTime.fromISO(value)
  }

  if (value instanceof Date) {
    return DateTime.fromJSDate(value)
  }

  return DateTime.fromObject(value)
}

export type DateLike = string | Date | DateObjectUnits | DateTime
