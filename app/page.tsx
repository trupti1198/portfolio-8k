"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ScrollReveal from "@/components/scroll-reveal"
import { ArrowRight, Award, BookOpen, Briefcase, Download, ExternalLink, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import ResumeDownloadModal from "@/components/resume-download-modal"

export default function HomePage() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)

  const coreCompetencies = [
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Product Strategy",
      description:
        "Developing comprehensive product roadmaps and go-to-market strategies that align with business objectives and user needs.",
      skills: ["Market Research", "Competitive Analysis", "Product Roadmapping", "Go-to-Market Strategy"],
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Cross-functional Leadership",
      description:
        "Leading diverse teams across engineering, design, and business to deliver exceptional products and experiences.",
      skills: ["Team Leadership", "Stakeholder Management", "Agile Methodologies", "Project Management"],
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Data-Driven Decision Making",
      description:
        "Leveraging analytics and user insights to make informed product decisions and optimize user experiences.",
      skills: ["Analytics", "A/B Testing", "User Research", "KPI Optimization"],
    },
  ]

  const featuredProjects = [
    {
      id: "apna-farm",
      title: "Apna Farm - Agricultural Marketplace",
      description:
        "A comprehensive digital platform connecting farmers directly with consumers, featuring real-time inventory management and logistics optimization.",
      image: "/agricultural-marketplace-app-interface.jpg",
      tags: ["Product Strategy", "Market Research", "UX Design"],
      type: "case-study",
      metrics: "40% increase in farmer income, 25% reduction in food waste",
    },
    {
      id: "makemytrip-packages",
      title: "MakeMyTrip - Package Optimization",
      description:
        "Redesigned the travel package booking experience, implementing dynamic pricing and personalized recommendations.",
      image: "/travel-booking-app.png",
      tags: ["Product Management", "Data Analytics", "User Experience"],
      type: "case-study",
      metrics: "35% increase in package bookings, 28% improvement in user satisfaction",
    },
    {
      id: "portfolio-analytics-tool",
      title: "Portfolio Analytics Dashboard",
      description:
        "Built a comprehensive analytics tool to track portfolio performance and user engagement across multiple projects.",
      image: "/analytics-dashboard.png",
      tags: ["Full-Stack Development", "Data Visualization", "Analytics"],
      type: "project",
      metrics: "Real-time insights, 50+ KPIs tracked",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="content-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="outline" className="border-primary text-primary bg-primary/5">
                    Product Manager & Engineering Leader
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                    Building Products That <span className="text-primary">Transform</span> Experiences
                  </h1>
                  <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                    I'm Trupti Kamat, a product management professional with expertise in leading cross-functional
                    teams, driving product strategy, and delivering user-centered solutions that create meaningful
                    impact.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setIsResumeModalOpen(true)}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/projects-cs">
                      View My Work
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">5+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">15+</div>
                    <div className="text-sm text-gray-600">Projects Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">Industries</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="relative w-full max-w-lg mx-auto">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl transform rotate-3"></div>
                  <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
                    <Image
                      src="/images/profile-headshot-new.png"
                      alt="Trupti Kamat - Product Manager"
                      width={500}
                      height={600}
                      className="w-full h-auto rounded-xl object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Competencies Section */}
      <section className="section-padding bg-white">
        <div className="content-container">
          <ScrollReveal>
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="border-primary text-primary bg-primary/5">
                Core Competencies
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What I Bring to the Table</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                A unique blend of technical expertise, strategic thinking, and leadership skills that drive product
                success from conception to market.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {coreCompetencies.map((competency, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className="h-full bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">{competency.icon}</div>
                    <CardTitle className="text-xl font-semibold text-gray-900">{competency.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {competency.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {competency.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects & Case Studies Section */}
      <section className="section-padding bg-gray-50">
        <div className="content-container">
          <ScrollReveal>
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="border-primary text-primary bg-primary/5">
                Featured Work
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Recent Projects & Case Studies</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Explore my latest work in product management, from strategic initiatives to hands-on development
                projects that solve real-world problems.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <Card className="h-full bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant={project.type === "case-study" ? "default" : "secondary"}>
                        {project.type === "case-study" ? "Case Study" : "Project"}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-sm font-medium text-primary">{project.metrics}</div>

                    <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/5" asChild>
                      <Link
                        href={project.type === "case-study" ? `/case-studies/${project.id}` : `/projects/${project.id}`}
                      >
                        {project.type === "case-study" ? "Read Case Study" : "View Project"}
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects-cs">
                  View All Projects & Case Studies
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Learning & Growth Section */}
      <section className="section-padding bg-white">
        <div className="content-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <Badge variant="outline" className="border-primary text-primary bg-primary/5">
                  Continuous Learning
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Always Learning, Always Growing</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I believe in continuous learning and sharing knowledge. My learning diary captures insights from
                  courses, books, conferences, and real-world experiences that shape my approach to product management.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-gray-700">50+ Learning entries documented</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="text-gray-700">Multiple certifications in Product Management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-gray-700">Active in product management communities</span>
                  </div>
                </div>
                <Button size="lg" asChild>
                  <Link href="/learning-diary">
                    Explore Learning Diary
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">15+</div>
                      <div className="text-sm text-gray-600">Courses Completed</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">8</div>
                      <div className="text-sm text-gray-600">Certifications</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">25+</div>
                      <div className="text-sm text-gray-600">Books Read</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">10+</div>
                      <div className="text-sm text-gray-600">Conferences</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Resume Download Modal */}
      <ResumeDownloadModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </div>
  )
}
