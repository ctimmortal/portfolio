export interface ExperienceEntry {
  employer: string
  title: string
  startDate: Date
  endDate?: Date
  highlights: string[]
  achievements?: string[]
  stack?: string[] | TechStack
}

export interface TechStack {
  frontend?: string | string[]
  backend?: string | string[]
  database?: string | string[]
  tools?: string | string[]
}
