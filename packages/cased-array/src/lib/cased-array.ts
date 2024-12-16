import { CaseType, isCaseType } from './case-type'
import { mapCaseTypeToFunction } from './casing-function'

/**
 * An array in which all members may be converted to a specific case (UPPERCASE, lowercase, kebab-case, etc.) upon access.
 */
export class CasedArray extends Array<string> {
  private $caseType?: CaseType

  constructor(caseType: CaseType, ...items: string[])
  constructor(length: number)
  constructor(...items: string[])
  constructor(lengthOrType: number | string, ...items: string[]) {
    if (typeof lengthOrType === 'string' && isCaseType(lengthOrType)) {
      super(...items)
      this.$caseType = lengthOrType
    } else if (typeof lengthOrType === 'number') {
      super(lengthOrType)
    } else {
      super(lengthOrType, ...items)
    }
  }

  [Symbol.iterator]() {
    const values = [...super[Symbol.iterator]()].map(e => this.changeCase(e))
    return values[Symbol.iterator]()
  }

  /**
   * Determine whether the array contains a given value. First, try to find the exact search value; if that doesn't work, search for the value using the same case as this array.
   * @param searchElement the element to search for
   * @param fromIndex the position at which to begin searching
   * @returns true if the array contains the searchElement
   */
  override includes(searchElement: string, fromIndex?: number): boolean {
    return (
      super.includes(searchElement, fromIndex) ||
      [...this].includes(this.changeCase(searchElement), fromIndex)
    )
  }

  override pop(): string | undefined {
    const value = super.pop()
    return value === undefined ? value : this.changeCase(value)
  }

  override values(): IterableIterator<string> {
    return this[Symbol.iterator]()
  }

  private changeCase(value: string) {
    if (this.$caseType) {
      return mapCaseTypeToFunction(this.$caseType)(value)
    }

    return value
  }
}
