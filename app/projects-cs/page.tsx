"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import StandardCard from "@/components/standard-card"
import TimelineLayout from "@/components/timeline-layout"

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  tags: string[]
  project_type: string
  category: string
  date_completed: string
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/projects?limit=50")
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        if (data.projects) {
          setProjects(data.projects)
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects based on active tab
  const getFilteredProjects = () => {
    if (activeTab === "all") return projects
    if (activeTab === "projects") return projects.filter((p) => p.project_type === "project")
    if (activeTab === "case-studies") return projects.filter((p) => p.project_type === "case-study" || p.project_type === "case_study")
    return projects
  }

  // Create timeline items
  const createTimelineItems = (items: Project[]) => {
    return items.map((item) => ({
      date: new Date(item.date_completed).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }),
      category: item.category,
      content: (
        <StandardCard
          title={item.title}
          description={item.description}
          image={item.image_url}
          category={item.project_type === "project" ? "Project" : "Case Study"}
          tags={Array.isArray(item.tags) ? item.tags : []}
          link={`/project-cs/${item.id}`}
          linkText="View Details"
        />
      ),
    }))
  }

  const filteredProjects = getFilteredProjects()
  const projectCount = projects.filter((p) => p.project_type === "project").length
  const caseStudyCount = projects.filter((p) => p.project_type === "case-study" || p.project_type === "case_study").length

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Projects</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="border-primary text-primary bg-primary/5">
              Portfolio
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-gray-900">Projects & Case Studies</h1>
            <p className="text-gray-700 md:text-xl">
              Real-world product development projects and strategic case study analyses showcasing end-to-end product
              management expertise
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="all" className="w-full mb-8" onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 bg-gray-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
                All ({projects.length})
              </TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
                Projects ({projectCount})
              </TabsTrigger>
              <TabsTrigger
                value="case-studies"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
              >
                Case Studies ({caseStudyCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {loading ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg h-64"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <TimelineLayout
                  items={createTimelineItems(filteredProjects)}
                  title="Complete Portfolio Timeline"
                  description="A chronological view of all my projects and case studies"
                />
              )}
            </TabsContent>

            <TabsContent value="projects">
              {loading ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg h-64"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <TimelineLayout
                  items={createTimelineItems(filteredProjects)}
                  title="Product Development Projects"
                  description="Real-world projects with measurable business impact and user outcomes"
                />
              )}
            </TabsContent>

            <TabsContent value="case-studies">
              {loading ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg h-64"></div>
                    </div>
                  ))}
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No case studies found</h3>
                  <p className="text-gray-600">Case studies are coming soon. Check back later!</p>
                </div>
              ) : (
                <TimelineLayout
                  items={createTimelineItems(filteredProjects)}
                  title="Strategic Case Studies"
                  description="In-depth product analysis and strategic thinking exercises"
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
