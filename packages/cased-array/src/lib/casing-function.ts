import {
  camelCase,
  capitalCase,
  kebabCase,
  pascalCase,
  sentenceCase,
  snakeCase,
} from 'change-case'

import { CaseType } from './case-type'

/**
 * Create a function that, when called with a string value, converts the value to a different case.
 * @param caseType the desired case type
 * @returns a function that accepts a string value and returns the value if the specified case
 */
export function mapCaseTypeToFunction(caseType: CaseType): CasingFunction {
  switch (caseType) {
    case 'camel': {
      return (value: string) => camelCase(value)
    }
    case 'kebab': {
      return (value: string) => kebabCase(value)
    }
    case 'lower': {
      return (value: string) => value.toLocaleLowerCase()
    }
    case 'pascal': {
      return (value: string) => pascalCase(value)
    }
    case 'sentence': {
      return (value: string) => sentenceCase(value)
    }
    case 'snake': {
      return (value: string) => snakeCase(value)
    }
    case 'title': {
      return (value: string) => capitalCase(value)
    }
    case 'upper': {
      return (value: string) => value.toLocaleUpperCase()
    }
    default: {
      throw new Error(`Invalid case type: '${caseType}'`)
    }
  }
}

export type CasingFunction = (value: string) => string
