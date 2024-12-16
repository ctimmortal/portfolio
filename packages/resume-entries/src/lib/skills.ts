export class CasedArray extends Array<string> {
  private $valueCase?: ArrayCase

  constructor(valueCase: ArrayCase, ...value: string[])
  constructor(length: number)
  constructor(...items: string[])
  constructor(length: number | string, ...values: string[]) {
    if (typeof length === 'number') {
      super(length)
    } else if (length !== undefined && isArrayCase(length)) {
      super(...values)
      this.$valueCase = length
    } else {
      super(length, ...values)
    }

    this.$valueCase ??= 'lower'
  }

  override push(...items: string[]) {
    return super.push(...items.map(e => (this.$valueCase ? e.toLowerCase() : e)))
  }
}

export class Skills implements SkillsData {
  readonly languages: CasedArray
  readonly frameworks: CasedArray
  readonly data: CasedArray
  readonly devops: CasedArray
  readonly other: CasedArray

  constructor(data?: SkillsData) {
    if (data !== undefined) {
      if (data.languages) {
        this.languages = new CasedArray(...data.languages)
      }

      if (data.frameworks) {
        this.frameworks = new CasedArray(...data.frameworks)
      }

      if (data.data) {
        this.data = new CasedArray(...data.data)
      }

      if (data.devops) {
        this.devops = new CasedArray(...data.devops)
      }

      if (data.other) {
        this.other = new CasedArray(...data.other)
      }
    }

    this.languages ??= new CasedArray()
    this.frameworks ??= new CasedArray()
    this.data ??= new CasedArray()
    this.devops ??= new CasedArray()
    this.other ??= new CasedArray()
  }
}

export const isArrayCase = (value: string): value is ArrayCase =>
  ['camel', 'kebab', 'lower', 'snake', 'title', 'upper'].includes(value)

export type ArrayCase = 'camel' | 'kebab' | 'lower' | 'snake' | 'title' | 'upper'

/**
 * Technical skills relevant to a specific task, position, or resume.
 */
export interface SkillsData {
  /**
   * Programming languages.
   */
  languages?: string[]
  /**
   * Tools and frameworks.
   * @example React, Node.js, Docker
   */
  frameworks?: string[]
  /**
   * Skills related to data analysis, processing, etc.
   */
  data?: string[]
  /**
   * Cloud & DevOps skills that aren't listed elsewhere.
   * @example Data Modeling
   */
  devops?: string[]
  /**
   * Any other relevant skills that don't belong in a different group.
   */
  other?: string[]
}
