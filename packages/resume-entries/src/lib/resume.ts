import { ResumeData } from './resume-data'

export class Resume {
  name: string
  email: string
  phone: string
  summary?: string
  skills?: ResumeData.TechnicalSkills
  certs?: ResumeData.Certification[]
  education?: ResumeData.Education[]
  experience: ResumeData.Experience[]
  links?: Record<string, string | { target: string; text?: string }>

  constructor(private rawData: string) {
    const data = JSON.parse((this.rawData, 'utf8'))
    this.name = data.name
    this.email = data.email
    this.phone = data.phone
    this.summary = data.summary
    if (data.skills) {
      this.skills = data.skills
    }
    this.experience = data.experience
  }
}
