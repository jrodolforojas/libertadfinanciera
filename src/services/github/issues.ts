import { type ReportBugResponse, type ReportBugRequest } from '@/types/api/report-bug'

export const createIssue = async ({ issue }: {
  issue: ReportBugRequest
}) => {
  const { title, description, type, user } = issue
  const response = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API_URL}/repos/${process.env.NEXT_PUBLIC_GITHUB_USER}/${process.env.NEXT_PUBLIC_GITHUB_REPO}/issues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
    },
    body: JSON.stringify({
      title,
      body: `### Descripción\n\n${description}\n\n ### Reportado por: \n\n${user}`,
      labels: [type]
    })
  })

  if (!response.ok || response.status !== 201) {
    console.error({ msg: 'Error creating issue', status: response.status, url: response.url, body: await response.text() })
    const errorResponse: ReportBugResponse = {
      message: 'Error creating issue',
      error: true
    }
    return errorResponse
  }

  const result: ReportBugResponse = {
    message: 'Issue created',
    error: false
  }

  return result
}
