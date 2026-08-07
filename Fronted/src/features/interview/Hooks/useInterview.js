import { useContext, useEffect } from 'react'
import axios from 'axios'
import { InterviewContext } from '../interview.context.js'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

export const useInterview = () => {
  const context = useContext(InterviewContext)

  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider')
  }

  const { loading, setLoading, report, setReport, reports, setReports } = context

  const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('jobDescription', jobDescription || '')
      formData.append('selfDescription', selfDescription || '')

      if (resumeFile) {
        formData.append('resume', resumeFile)
      }

      const response = await api.post('/api/interview', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const interviewReport = response.data?.interviewReport || response.data

      setReport(interviewReport)
      setReports((prev) => {
        const filtered = prev.filter((item) => item?._id !== interviewReport?._id)
        return [interviewReport, ...filtered]
      })

      return interviewReport
    } catch (error) {
      console.error('Failed to generate interview report:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const fetchReports = async () => {
    setLoading(true)

    try {
      const response = await api.get('/api/interview')
      const interviewReports = response.data?.interviewReports || response.data || []
      setReports(interviewReports)
      return interviewReports
    } catch (error) {
      console.error('Failed to fetch interview reports:', error)
      return []
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  return { loading, generateReport, fetchReports, report, reports }
}
