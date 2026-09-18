"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Users, Target, CheckCircle2, FileText, Figma, ExternalLink, FileCode } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StandardCard from "@/components/standard-card"

export default function PortfolioAnalyticsToolPage() {
  const project = {
    title: "Portfolio Analytics Tool",
    subtitle: "Transforming wealth management through data visualization",
    description:
      "Designed 45+ dashboards and 10+ simulations to replace manual reporting workflows for UHNI/HNI wealth portfolio analytics, improving decision-making clarity for clients and relationship managers.",
    fullDescription:
      "The Portfolio Analytics Tool was developed to address the critical need for real-time, comprehensive portfolio insights for Ultra High Net Worth Individuals (UHNI) and High Net Worth Individuals (HNI). The existing manual reporting system was time-consuming, error-prone, and lacked the depth of analysis required for sophisticated investment decisions. As the lead Product Manager, I spearheaded the development of a comprehensive analytics platform that transformed how wealth managers and clients interact with portfolio data.",
    image: "/placeholder.svg?height=300&width=600&text=Portfolio+Analytics+Dashboard",
    timeline: "8 months (2023-2024)",
    role: "Lead Product Manager",
    team: "4 designers, 8 engineers, 2 data analysts, 3 QA specialists",
    tags: ["Analytics", "Dashboards", "Wealth Management", "Data Visualization"],
    challenges: [
      "Integrating data from multiple custodians and financial institutions",
      "Creating intuitive visualizations for complex financial instruments",
      "Ensuring real-time data accuracy and compliance with financial regulations",
      "Balancing detailed analytics with user-friendly interfaces for non-technical users",
    ],
    approach: [
      "Conducted extensive user research with wealth managers and UHNI clients",
      "Developed a modular dashboard architecture for customizable views",
      "Implemented real-time data pipelines with multiple financial data providers",
      "Created interactive simulations for scenario planning and risk assessment",
      "Established comprehensive testing protocols for financial accuracy",
    ],
    outcomes: [
      "45+ custom dashboards covering all major asset classes and risk metrics",
      "10+ interactive simulations for portfolio optimization and scenario analysis",
      "90% reduction in manual reporting time for relationship managers",
      "35% improvement in client engagement with portfolio reviews",
      "₹500+ Cr in assets under management now using the platform",
    ],
    testimonial: {
      quote:
        "The Portfolio Analytics Tool has revolutionized how we present portfolio insights to our clients. What used to take days of manual work now happens in real-time with much greater accuracy.",
      author: "Rajesh Kumar, Senior Relationship Manager",
    },
    files: [
      { type: "figma", name: "Dashboard Design System", url: "https://figma.com/file/portfolio-analytics" },
      { type: "prd", name: "Product Requirements Document", url: "/docs/portfolio-analytics-prd.pdf" },
      { type: "flowchart", name: "Data Architecture Diagram", url: "/docs/portfolio-data-flow.pdf" },
      { type: "presentation", name: "Stakeholder Presentation", url: "/docs/portfolio-presentation.pdf" },
    ],
  }

  // Related projects
  const relatedProjects = [
    {
      id: "360-one-wealth-website",
      title: "360 One Wealth Website",
      description: "Generated 10,000+ qualified leads and unlocked ₹70 Cr potential AUM through CMS-driven campaigns.",
      image: "/placeholder.svg?height=300&width=500&text=360+One+Wealth",
      tags: ["CMS", "SEO", "Lead Generation"],
      category: "Project",
    },
    {
      id: "mumbai-angels-app",
      title: "Mumbai Angels App",
      description: "Launched startup investment app with 1,200+ users generating $200K in pipeline revenue.",
      image: "/placeholder.svg?height=300&width=500&text=Mumbai+Angels",
      tags: ["Mobile App", "Investment"],
      category: "Project",
    },
    {
      id: "rekyc",
      title: "Re-KYC Portal",
      description: "Saved 8+ hrs/day and cut form errors by 80% with streamlined verification processes.",
      image: "/placeholder.svg?height=300&width=500&text=ReKYC+Portal",
      tags: ["KYC", "Web Portal"],
      category: "Project",
    },
  ]

  return (
    <>
      <section className="relative py-16 bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{project.title}</h1>
              <p className="text-xl text-muted-foreground">{project.subtitle}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 max-w-4xl mx-auto">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative overflow-hidden rounded-xl border max-w-2xl mx-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/20 opacity-70 blur-sm"></div>
                <div className="relative">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={300}
                    className="w-full object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-3">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium text-muted-foreground">Project Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Timeline</p>
                            <p className="text-sm text-muted-foreground">{project.timeline}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Team</p>
                            <p className="text-sm text-muted-foreground">{project.team}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Target className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Role</p>
                            <p className="text-sm text-muted-foreground">{project.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="approach">Approach</TabsTrigger>
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-lg">{project.fullDescription}</p>
                  </div>
                  {project.testimonial && (
                    <Card className="bg-muted/50 border-none">
                      <CardContent className="pt-6">
                        <blockquote className="space-y-2">
                          <p className="text-lg italic">"{project.testimonial.quote}"</p>
                          <footer className="text-sm text-muted-foreground">— {project.testimonial.author}</footer>
                        </blockquote>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                <TabsContent value="approach" className="mt-6 space-y-4">
                  <h3 className="text-xl font-bold">My Approach</h3>
                  <ul className="space-y-4">
                    {project.approach.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="challenges" className="mt-6 space-y-4">
                  <h3 className="text-xl font-bold">Key Challenges</h3>
                  <ul className="space-y-4">
                    {project.challenges.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="outcomes" className="mt-6 space-y-4">
                  <h3 className="text-xl font-bold">Results & Impact</h3>
                  <ul className="space-y-4">
                    {project.outcomes.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>

              {project.files && project.files.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-6">Project Files & Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {project.files.map((file, index) => {
                      let FileIcon = FileText
                      if (file.type === "figma") FileIcon = Figma
                      if (file.type === "flowchart") FileIcon = FileCode

                      return (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                              <FileIcon className="h-6 w-6 text-primary" />
                            </div>
                            <h4 className="font-medium mb-2">{file.name}</h4>
                            <Button asChild variant="outline" size="sm" className="mt-2 bg-transparent">
                              <Link href={file.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View File
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold">More Projects</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((relatedProject) => (
                  <StandardCard
                    key={relatedProject.id}
                    title={relatedProject.title}
                    description={relatedProject.description}
                    image={relatedProject.image}
                    category={relatedProject.category}
                    tags={relatedProject.tags}
                    link={`/projects/${relatedProject.id}`}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button asChild variant="outline">
                  <Link href="/projects">View All Projects</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
