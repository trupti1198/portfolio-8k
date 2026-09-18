"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, RefreshCw, Mail, Calendar, User, BarChart3, LogOut, Loader2 } from "lucide-react"

interface ContactSubmission {
  id: string
  first_name: string
  last_name: string
  email: string
  subject: string
  message: string
  ip_address?: string
  user_agent?: string
  created_at: string
}

interface Analytics {
  totalEvents: number
  formViews: number
  formSubmits: number
  formSuccess: number
  formErrors: number
  conversionRate: number
}

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/contact")
      const data = await response.json()

      if (response.ok) {
        setSubmissions(data.submissions || [])
      } else {
        setError(data.error || "Failed to fetch submissions")
      }
    } catch (error) {
      setError("Network error")
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics")
      const data = await response.json()

      if (response.ok) {
        setAnalytics(data)
      }
    } catch (error) {
      console.error("Analytics fetch error:", error)
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const response = await fetch("/api/admin/export")
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `contact-submissions-${new Date().toISOString().split("T")[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        setError("Export failed")
      }
    } catch (error) {
      setError("Export error")
    } finally {
      setIsExporting(false)
    }
  }

  const handleLogout = () => {
    document.cookie = "admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    router.push("/admin/login")
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    await Promise.all([fetchSubmissions(), fetchAnalytics()])
    setIsLoading(false)
  }

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchSubmissions(), fetchAnalytics()])
      setIsLoading(false)
    }
    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage contact form submissions and analytics</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleRefresh} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{submissions.length}</div>
                <p className="text-xs text-muted-foreground">{analytics.formSuccess} successful</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Form Views</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.formViews}</div>
                <p className="text-xs text-muted-foreground">Page visits</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.conversionRate}%</div>
                <p className="text-xs text-muted-foreground">Success rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    submissions.filter((s) => {
                      const weekAgo = new Date()
                      weekAgo.setDate(weekAgo.getDate() - 7)
                      return new Date(s.created_at) > weekAgo
                    }).length
                  }
                </div>
                <p className="text-xs text-muted-foreground">New submissions</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Contact Submissions</h2>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
            Export CSV
          </Button>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
                <p className="text-gray-600">Contact form submissions will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {submission.first_name} {submission.last_name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <a href={`mailto:${submission.email}`} className="text-blue-600 hover:underline">
                          {submission.email}
                        </a>
                        <Badge variant="secondary">{new Date(submission.created_at).toLocaleDateString()}</Badge>
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{new Date(submission.created_at).toLocaleTimeString()}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Subject</h4>
                      <p className="text-gray-700">{submission.subject}</p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 whitespace-pre-wrap">{submission.message}</p>
                      </div>
                    </div>

                    {(submission.ip_address || submission.user_agent) && (
                      <>
                        <Separator />
                        <div className="text-xs text-gray-500 space-y-1">
                          {submission.ip_address && <p>IP: {submission.ip_address}</p>}
                          {submission.user_agent && <p>User Agent: {submission.user_agent}</p>}
                        </div>
                      </>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          window.open(`mailto:${submission.email}?subject=Re: ${submission.subject}`, "_blank")
                        }
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
