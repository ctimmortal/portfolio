/**
 * Type guard for the {@link CaseType} type.
 * @param value a value
 * @returns true if the value is a member of the {@link CaseType} type
 */
export const isCaseType = (value: string): value is CaseType =>
  CASE_TYPES.includes(value as any)

export const CASE_TYPES = [
  'camel',
  'kebab',
  'lower',
  'pascal',
  'sentence',
  'snake',
  'title',
  'upper',
] as const

export type CaseType = (typeof CASE_TYPES)[number]
