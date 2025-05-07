export type ChatHistory = Array<[string, string]>

export interface PatientData {
  age: number
  gender: string
  medical_history: string[]
  current_medications: string[]
  allergies: string[]
  lab_results?: Array<{
    name: string
    value: string
    date: string
  }>
  family_history?: string[]
  social_history?: string[]
  imaging_results?: Array<{
    name: string
    finding: string
    date: string
  }>
}

export interface RetrievedSource {
  title: string
  content: string
  score: number
}
