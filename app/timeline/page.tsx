"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ScrollReveal from "@/components/scroll-reveal"
import { Calendar, MapPin, GraduationCap, Briefcase } from "lucide-react"
import Image from "next/image"

const timelineData = [
  {
    id: 1,
    date: "Jun 2017 - Jul 2021",
    title: "Bachelor of Engineering - Information Technology",
    organization: "University of Mumbai",
    location: "Mumbai, India",
    type: "education",
    description: "Graduated with honors, focusing on software development, data structures, and database management.",
    logo: "/images/logos/mu-logo.avif",
    achievements: [
      "First Class with Distinction (CGPA: 8.5/10)",
      "President of IT Student Association",
      "Published research paper on Machine Learning applications",
    ],
    startYear: 2017,
  },
  {
    id: 2,
    date: "Aug 2021 - May 2022",
    title: "Business Analyst",
    organization: "ISS",
    location: "Mumbai, India",
    type: "work",
    description: "Analyzed business processes and implemented data-driven solutions for facility management services.",
    logo: "/images/logos/iss-logo.png",
    achievements: [
      "Improved operational efficiency by 25%",
      "Created automated reporting dashboards",
      "Conducted stakeholder interviews and requirements gathering",
    ],
    startYear: 2021,
  },
  {
    id: 3,
    date: "Jun 2022 - Dec 2022",
    title: "Associate Product Manager",
    organization: "Sharekhan by BNP Paribas",
    location: "Mumbai, India",
    type: "work",
    description: "Managed trading platform features and user experience improvements for retail investors.",
    logo: "/images/logos/smc-logo.png",
    achievements: [
      "Reduced user onboarding time by 40%",
      "Implemented A/B testing framework",
      "Collaborated with engineering and design teams",
    ],
    startYear: 2022,
  },
  {
    id: 4,
    date: "Jan 2023 - Jul 2024",
    title: "Product Manager",
    organization: "360 ONE",
    location: "Mumbai, India",
    type: "work",
    description:
      "Led product strategy and development for wealth management platform serving high-net-worth individuals.",
    logo: "/images/logos/360-one-logo.svg",
    achievements: [
      "Increased user engagement by 35% through feature optimization",
      "Led cross-functional team of 12 members",
      "Launched 3 major product features with 95% user satisfaction",
    ],
    startYear: 2023,
  },
  {
    id: 5,
    date: "Aug 2024 - Present",
    title: "MS in Engineering Management",
    organization: "Purdue University",
    location: "West Lafayette, IN",
    type: "education",
    description: "Pursuing Master's degree focusing on product management, data analytics, and engineering leadership.",
    logo: "/images/logos/purdue-logo.jpg",
    achievements: [
      "Coursework in Product Management, Data Analytics, and Operations Research",
      "Leadership roles in student organizations",
      "GPA: 3.8/4.0",
    ],
    startYear: 2024,
  },
]

// Sort timeline data in ascending order (oldest to newest)
const sortedTimelineData = [...timelineData].sort((a, b) => a.startYear - b.startYear)

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="section-padding bg-gray-50">
        <div className="content-container">
          <div className="reading-width text-center space-y-6">
            <ScrollReveal>
              <Badge variant="outline" className="border-primary text-primary bg-primary/5">
                Professional Journey
              </Badge>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">My Timeline</h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                A chronological journey through my education, professional experience, and key milestones in product
                management - from my early days as a student to my current role at Purdue University.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-white">
        <div className="content-container">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative max-w-6xl mx-auto">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"></div>

              {/* Timeline Items */}
              <div className="space-y-16">
                {sortedTimelineData.map((item, index) => {
                  const isLeft = index % 2 === 0
                  return (
                    <ScrollReveal key={item.id} delay={index * 0.1}>
                      <div className="relative flex items-center">
                        {/* Yellow Dot */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>

                        {/* Content Card */}
                        <div className={`w-5/12 ${isLeft ? "pr-8" : "ml-auto pl-8"}`}>
                          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardHeader className="pb-4">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  <Image
                                    src={item.logo || "/placeholder.svg"}
                                    alt={item.organization}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="flex-1">
                                  <Badge variant={item.type === "education" ? "secondary" : "default"} className="mb-2">
                                    {item.type === "education" ? (
                                      <>
                                        <GraduationCap className="w-3 h-3 mr-1" />
                                        Education
                                      </>
                                    ) : (
                                      <>
                                        <Briefcase className="w-3 h-3 mr-1" />
                                        Work
                                      </>
                                    )}
                                  </Badge>
                                  <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                                    {item.title}
                                  </CardTitle>
                                  <CardDescription className="text-primary font-medium">
                                    {item.organization}
                                  </CardDescription>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {item.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {item.location}
                                </div>
                              </div>
                            </CardHeader>

                            <CardContent>
                              <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>

                              <div className="space-y-3">
                                <h4 className="font-medium text-gray-900">Key Achievements:</h4>
                                <ul className="space-y-2">
                                  {item.achievements.map((achievement, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                      {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </ScrollReveal>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden">
            <div className="relative max-w-2xl mx-auto">
              {/* Vertical Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {sortedTimelineData.map((item, index) => (
                  <ScrollReveal key={item.id} delay={index * 0.1}>
                    <div className="relative flex items-start gap-6">
                      {/* Yellow Dot */}
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg flex-shrink-0 mt-6"></div>

                      {/* Card */}
                      <Card className="flex-1 bg-white border border-gray-200 shadow-lg">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <Image
                                src={item.logo || "/placeholder.svg"}
                                alt={item.organization}
                                width={40}
                                height={40}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <Badge
                                variant={item.type === "education" ? "secondary" : "default"}
                                className="text-xs mb-1"
                              >
                                {item.type === "education" ? (
                                  <>
                                    <GraduationCap className="w-3 h-3 mr-1" />
                                    Education
                                  </>
                                ) : (
                                  <>
                                    <Briefcase className="w-3 h-3 mr-1" />
                                    Work
                                  </>
                                )}
                              </Badge>
                              <CardTitle className="text-lg font-semibold text-gray-900">{item.title}</CardTitle>
                              <CardDescription className="text-primary font-medium">
                                {item.organization}
                              </CardDescription>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {item.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {item.location}
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <p className="text-gray-600 mb-4">{item.description}</p>

                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">Key Achievements:</h4>
                            <ul className="space-y-1">
                              {item.achievements.map((achievement, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
