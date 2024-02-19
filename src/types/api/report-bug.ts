export interface ReportBugRequest {
  title: string
  description: string
  type: string
  user?: string
}

export interface ReportBugResponse {
  message: string
  error: boolean
}
