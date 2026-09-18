"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, CheckCircle, AlertCircle } from "lucide-react"

interface ResumeDownloadModalProps {
  children: React.ReactNode
}

export default function ResumeDownloadModal({ children }: ResumeDownloadModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/resume-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")

        // Trigger the actual resume download
        const link = document.createElement("a")
        link.href = "/resume/Trupti_Kamat_Resume.pdf"
        link.download = "Trupti_Kamat_Resume.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Reset form and close modal after a delay
        setTimeout(() => {
          setFormData({ name: "", email: "", description: "" })
          setSubmitStatus("idle")
          setIsOpen(false)
        }, 2000)
      } else {
        setSubmitStatus("error")
        setErrorMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", description: "" })
    setSubmitStatus("idle")
    setErrorMessage("")
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) resetForm()
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Download Resume</DialogTitle>
          <DialogDescription className="text-gray-700">
            Please provide your details to download my resume. I'll also send you a copy via email.
          </DialogDescription>
        </DialogHeader>

        {submitStatus === "success" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-medium">Download started!</p>
              <p className="text-green-700 text-sm">
                Thank you for your interest. The resume should download automatically.
              </p>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800">{errorMessage}</p>
          </div>
        )}

        {submitStatus !== "success" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-900">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border-gray-300 focus:border-primary focus:ring-primary"
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border-gray-300 focus:border-primary focus:ring-primary"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-900">
                How would you describe yourself?
              </Label>
              <Select value={formData.description} onValueChange={handleSelectChange} required>
                <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
                  <SelectValue placeholder="Select your role/interest" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="talent-acquisition">Talent Acquisition</SelectItem>
                  <SelectItem value="hiring-manager">Hiring Manager</SelectItem>
                  <SelectItem value="founder-ceo">Founder/CEO</SelectItem>
                  <SelectItem value="product-manager">Product Manager</SelectItem>
                  <SelectItem value="engineer-developer">Engineer/Developer</SelectItem>
                  <SelectItem value="consultant">Consultant</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="mentor-advisor">Mentor/Advisor</SelectItem>
                  <SelectItem value="industry-peer">Industry Peer</SelectItem>
                  <SelectItem value="seeking-guidance">Seeking Guidance</SelectItem>
                  <SelectItem value="potential-collaboration">Potential Collaboration</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-black hover:bg-primary/90 font-semibold"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
