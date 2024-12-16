import { DateLike } from './date-like'

export declare namespace ResumeData {
  interface Certification {
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

  interface Education {
    institution: string
    /**
     * The type of degree sought during enrollment in this program.
     */
    level: string
    /**
     * The focus of the program.
     */
    program?: string
    /**
     * Whether the program was completed and a diploma or degree obtained.
     */
    complete: boolean
    startDate: DateLike
    endDate?: DateLike
  }

  interface Experience {
    /**
     * The name of the employer.
     */
    employer: string
    /**
     * The title or position held.
     */
    title: string
    /**
     * Starting date in this position.
     */
    startDate: DateLike
    /**
     * The last date when this position was held, or undefined if it's currently held.
     */
    endDate?: DateLike
    /**
     * Bullet points describing this position, responsibilities, achievements, etc.
     */
    highlights: ProjectHighlights[] | string[]
    /**
     * Skills acquired or used in this position.
     */
    skills?: string[] | TechnicalSkills | TechnicalSkills[]
  }

  /**
   * A project (e.g. for a contracting position) with an array of highlights.
   */
  interface ProjectHighlights {
    /**
     * The name of the project.
     */
    project: string
    /**
     * Highlights specific to this project.
     */
    highlights: string[]
  }

  /**
   * Technical skills relevant to a specific task, position, or resume.
   */
  interface TechnicalSkills {
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
}
