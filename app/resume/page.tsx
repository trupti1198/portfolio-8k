"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Mail, MapPin, Linkedin, Globe, Calendar, Building, GraduationCap, Trophy, Star } from "lucide-react"
import ResumeDownloadModal from "@/components/resume-download-modal"

export default function ResumePage() {
  const [showDownloadModal, setShowDownloadModal] = useState(false)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const workExperience = [
    {
      title: "Technical Product Manager",
      company: "360 ONE Wealth and Asset Management Ltd",
      location: "Mumbai, India",
      period: "Apr 2024 – May 2025",
      achievements: [
        "Designed 45+ dashboards and 10+ simulations to replace manual reporting workflows for UHNI/HNI wealth portfolio analytics improving decision-making clarity for clients and RMs",
        "Generated 10,000+ qualified leads and unlocked ₹70 Cr (~$8.4M) potential AUM by designing CMS-driven, templatized, SEO-optimized, dev-free campaign launches for investment content",
        "Reduced manual operations by 90 hours/month and accelerated go-to-market by 90% by owning the end-to-end revamp of a 70+ page corporate website",
        "Managed 40+ stakeholders; owned product roadmap and specs, execution, budgeting, sprints and milestone presentations",
      ],
    },
    {
      title: "Technical Associate Product Manager",
      company: "360 ONE Wealth and Asset Management Ltd",
      location: "Mumbai, India",
      period: "May 2023 – Apr 2024",
      achievements: [
        "Launched startup investment app and onboarded 1,200+ users, generating $200K in pipeline revenue",
        "Reduced operational workload by 70% by building a centralized Admin Portal for content management, deal tracking and ops, client investment process handling and internal audit",
      ],
    },
    {
      title: "Assistant Product Manager",
      company: "SMC Global Securities Limited",
      location: "Mumbai, India",
      period: "Dec 2022 – Apr 2023",
      achievements: [
        "Saved 8+ hrs/day and cut form errors by 80% by developing a Re-KYC web portal for 5,000+ users",
        "Designed a Telegram subscription platform for advisory to increase engagement by 65%",
      ],
    },
    {
      title: "Analyst - Software Developer",
      company: "Institutional Shareholder Services",
      location: "Mumbai, India",
      period: "Jan 2022 – Nov 2022",
      achievements: [
        "Cut DB deployment effort by 90% by integrating Flyway & Kubernetes for scalable schema migration",
        "Streamlined delivery of 10,000+ datapoints via 10+ enhanced Apache NiFi and Min.IO file transfer pipelines",
        "Built ETL flows for issuer analytics improving platform performance by 40%",
      ],
    },
    {
      title: "Junior Analyst – Software Developer",
      company: "Institutional Shareholder Services",
      location: "Mumbai, India",
      period: "Jul 2020 – Jan 2022",
      achievements: [
        "Accelerated 15+ new feature development and earned recognition from ESG leadership by creating 30+ dashboards for product teams by integrating Heap.io for product analytics on ISS DataDesk",
        "Saved 16+ person-hours per report by implementing ETL workflows and internal JSON template generator",
        "Resolved 150+ backlog issues and reduced technical debt to improve platform performance by 10%",
      ],
    },
  ]

  const education = [
    {
      degree: "MS - Engineering Management",
      school: "Purdue University West Lafayette",
      location: "IN",
      period: "Aug 2025 - May 2027",
      coursework: "Technical Product and Project Management, UI UX Design, Strategy Consulting",
    },
    {
      degree: "BE - Computer Engineering",
      school: "Mumbai University",
      location: "Mumbai, India",
      period: "Aug 2016 - Oct 2020",
      gpa: "CGPA - 9.48",
      coursework: "Data Structures, Programming, Databases, System Analysis and Design, AI/ML, Entrepreneurship",
    },
  ]

  const achievements = [
    {
      title: "Man of the Match",
      organization: "Inter Corporate Women's Cricket League @360 One",
      date: "May 2025",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      title: "Top Performer @360 One",
      organization: "Received a perfect 5/5 rating for outstanding product execution",
      date: "May 2024",
      icon: <Star className="h-5 w-5" />,
    },
    {
      title: "Change Champion Award @360 ONE",
      organization: "For driving successful non-profit organizational change",
      date: "Dec 2023",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      title: "Bootcamp in Product Management",
      organization: "Certification",
      date: "Dec 2022",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      title: "Winner – Smart India Hackathon 2019",
      organization: "Software Edition",
      date: "April 2019",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      title: "Music Representative",
      organization: "4 years leading student engagement and cultural visibility",
      date: "2016-2020",
      icon: <Star className="h-5 w-5" />,
    },
  ]

  const projects = [
    {
      title: "Smart Employment System: An HR Recruiter",
      type: "Publication",
      date: "Oct 2020",
      description:
        "Improved the recruitment process using video analytics and natural language processing (NLP) by capturing emotional parameters in candidate's speech and expression.",
    },
    {
      title: "Credit Card Fraud Detection",
      type: "Project",
      date: "May 2019",
      description:
        "Accurately identified 90% of fraudulent transactions while minimizing false positives using Decision Trees, Deep Neural Networks and Random Forests.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Badge variant="outline" className="border-primary text-primary bg-primary/5">
              Professional Profile
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-gray-900">Resume</h1>
            <p className="text-gray-700 md:text-xl">
              Product and technology professional with 5 years in fintech and investment management, leading 0–1 product
              development, cross-functional teams, and full-cycle delivery of scalable digital platforms with
              quantifiable business outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowDownloadModal(true)}
                className="group bg-primary hover:bg-primary/90 text-black"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Full Resume
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-primary text-primary hover:bg-primary hover:text-black bg-transparent"
              >
                <a href="mailto:truptikamatwork@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="experience" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                  <TabsTrigger
                    value="experience"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                  >
                    Experience
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                  >
                    Education
                  </TabsTrigger>
                  <TabsTrigger
                    value="achievements"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                  >
                    Achievements
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="experience" className="mt-6">
                  <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible">
                    {workExperience.map((job, index) => (
                      <motion.div key={index} variants={fadeIn}>
                        <Card className="bg-white border border-gray-200">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-lg text-gray-900">{job.title}</CardTitle>
                                <div className="flex items-center gap-2 text-gray-600 mt-1">
                                  <Building className="h-4 w-4" />
                                  <span className="font-medium">{job.company}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {job.location}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {job.period}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {job.achievements.map((achievement, i) => (
                                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                  <span className="text-primary mt-1.5">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="education" className="mt-6">
                  <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible">
                    {education.map((edu, index) => (
                      <motion.div key={index} variants={fadeIn}>
                        <Card className="bg-white border border-gray-200">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-lg text-gray-900">{edu.degree}</CardTitle>
                                <div className="flex items-center gap-2 text-gray-600 mt-1">
                                  <GraduationCap className="h-4 w-4" />
                                  <span className="font-medium">{edu.school}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {edu.location}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {edu.period}
                                  </div>
                                  {edu.gpa && (
                                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                                      {edu.gpa}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div>
                              <h4 className="font-medium text-sm mb-2 text-gray-800">Coursework:</h4>
                              <p className="text-sm text-gray-700">{edu.coursework}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="achievements" className="mt-6">
                  <motion.div
                    className="grid gap-4 sm:grid-cols-2"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {achievements.map((achievement, index) => (
                      <motion.div key={index} variants={fadeIn}>
                        <Card className="h-full bg-white border border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                {achievement.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-sm text-gray-900">{achievement.title}</h3>
                                <p className="text-xs text-gray-600 mt-1">{achievement.organization}</p>
                                <Badge variant="outline" className="mt-2 text-xs border-primary/20 text-primary">
                                  {achievement.date}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              {/* Contact Information */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href="mailto:truptikamatwork@gmail.com" className="text-sm hover:underline text-gray-700">
                        truptikamatwork@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Chicago, CA</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Linkedin className="h-4 w-4 text-gray-500" />
                      <a
                        href="https://www.linkedin.com/in/trupti-kamat-466b1b1b1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline text-gray-700"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Portfolio</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Skills */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-primary">Product Management</h4>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "Product Strategy",
                          "Roadmapping",
                          "User Research",
                          "A/B Testing",
                          "Analytics",
                          "Stakeholder Management",
                        ].map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs bg-primary/10 text-primary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-green-600">Tools & Design</h4>
                      <div className="flex flex-wrap gap-1">
                        {["Figma", "Jira", "Confluence", "Tableau", "Google Analytics", "Mixpanel", "Heap.io"].map(
                          (skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="text-xs border-green-200 text-green-700 bg-green-50"
                            >
                              {skill}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-blue-600">Technical Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {["SQL", "Python", "JavaScript", "React", "Node.js", "ETL", "APIs", "Kubernetes"].map(
                          (skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="text-xs border-blue-200 text-blue-700 bg-blue-50"
                            >
                              {skill}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Academic Projects */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">Academic Projects</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {projects.map((project, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm text-gray-900">{project.title}</h4>
                          <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                            {project.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{project.description}</p>
                        <p className="text-xs text-gray-500 font-medium">{project.date}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Download Button */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Button
                  onClick={() => setShowDownloadModal(true)}
                  className="w-full group bg-primary hover:bg-primary/90 text-black"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Resume
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <ResumeDownloadModal open={showDownloadModal} onOpenChange={setShowDownloadModal} />
    </div>
  )
}
