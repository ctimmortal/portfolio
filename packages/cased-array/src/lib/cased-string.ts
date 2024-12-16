import { CaseType } from './case-type'
import { mapCaseTypeToFunction } from './casing-function'

export class CasedString implements CasedStringData {
  private readonly $value: string
  private $collator?: Intl.Collator

  constructor(
    value: string,
    public readonly caseType?: CaseType,
  ) {
    this.$value = value
    this.caseType = caseType
  }

  get value() {
    if (this.caseType !== undefined) {
      return mapCaseTypeToFunction(this.caseType)(this.$value.toLocaleLowerCase())
    }

    return this.$value
  }

  compare(other: string | CasedString) {
    this.$collator ??= new Intl.Collator(undefined, { caseFirst: 'lower' })

    return this.$collator.compare(
      this.value,
      other instanceof CasedString ? other.value : other,
    )
  }

  toCase(caseType: CaseType) {
    if (caseType === this.caseType) {
      return this
    }

    const newValue = mapCaseTypeToFunction(caseType)(this.value)
    return new CasedString(newValue, this.caseType)
  }

  toJSON() {
    const obj: CasedStringData = { value: this.$value }
    if (this.caseType) {
      obj.caseType = this.caseType
    }
    return obj
  }

  toString() {
    return this.value
  }
}

export interface CasedStringData {
  value: string
  caseType?: CaseType
}
