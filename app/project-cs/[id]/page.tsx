import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Users, Clock, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createServerClient } from "@/lib/supabase"
import MediaCarousel from "@/components/media-carousel"
import StandardCard from "@/components/standard-card"

interface ProjectPageProps {
  params: {
    id: string
  }
}

async function getProject(id: string) {
  try {
    const supabase = createServerClient()

    const { data: project, error } = await supabase
      .from("projects")
      .select(
        `
        *,
        project_media (
          id,
          src_url,
          media_type,
          alt_text,
          title,
          thumbnail_url,
          display_order
        )
      `,
      )
      .eq("id", id)
      .single()

    if (error) {
      console.error("Database error:", error)
      return null
    }

    // Transform media data to match MediaCarousel interface
    if (project.project_media) {
      project.project_media = project.project_media.map((media: any) => ({
        type: media.media_type,
        src: media.src_url,
        alt: media.alt_text,
        title: media.title,
        thumbnail: media.thumbnail_url,
      }))
    }

    return project
  } catch (error) {
    console.error("Error fetching project:", error)
    return null
  }
}

async function getOtherProjects(currentId: string) {
  try {
    const supabase = createServerClient()

    const { data: projects, error } = await supabase
      .from("projects")
      .select("id, title, description, image_url, category, tags")
      .neq("id", currentId)
      .limit(3)

    if (error) {
      console.error("Error fetching other projects:", error)
      return []
    }

    return projects || []
  } catch (error) {
    console.error("Error fetching other projects:", error)
    return []
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.id)
  const otherProjects = await getOtherProjects(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <Button asChild variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
            <Link href="/projects-cs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </section>

      {/* 1. Project Title & Subtitle - Left Aligned (Banner Section) */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{project.title}</h1>

            {/* 2. Subtitle - Reduced Size */}
            {project.subtitle && <p className="text-lg text-gray-600 mb-3 font-medium">{project.subtitle}</p>}
            <p className="text-base text-gray-600 mb-5 leading-relaxed">{project.description}</p>

            {/* 3. Tags - Only 3 */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.slice(0, 3).map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs px-3 py-1 bg-primary/10 text-primary border-primary/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Carousel - Center Aligned */}
      {project.project_media && project.project_media.length > 0 && (
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-8 md:px-16 lg:px-24">
            <div className="max-w-3xl mx-auto">
              <MediaCarousel items={project.project_media} />
            </div>
          </div>
        </section>
      )}

      {/* 5. Project Details - Center Aligned */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Project Details</h2>

            {/* Horizontal Layout matching the image - Center Aligned */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              {/* Timeline */}
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Timeline</h3>
                <p className="text-gray-600 text-sm">{project.timeline || "8 months (2023-2024)"}</p>
              </div>

              {/* Team */}
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Team</h3>
                <p className="text-gray-600 text-sm">
                  {project.team || "4 designers, 8 engineers, 2 data analysts, 3 QA specialists"}
                </p>
              </div>

              {/* Role */}
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Target className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Role</h3>
                <p className="text-gray-600 text-sm">{project.role || "Lead Product Manager"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Project Content - Vertical Layout without Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Overview Section */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h3>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-left">
                    {project.full_description || project.description}
                  </p>

                  {project.tags && project.tags.length > 3 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Technologies & Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs px-3 py-1 bg-primary/10 text-primary border-primary/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Separator */}
            <div className="border-t-2 border-gray-200"></div>

            {/* Challenges Section */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Challenges & Problems</h3>
                <div className="space-y-4">
                  {project.challenges && project.challenges.length > 0 ? (
                    <ul className="space-y-3 text-left">
                      {project.challenges.map((challenge: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-left">Challenge details coming soon.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Separator */}
            <div className="border-t-2 border-gray-200"></div>

            {/* Approach Section */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Approach & Solution</h3>
                <div className="space-y-4">
                  {project.approach && project.approach.length > 0 ? (
                    <ul className="space-y-3 text-left">
                      {project.approach.map((approach: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>{approach}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-left">Approach details coming soon.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Separator */}
            <div className="border-t-2 border-gray-200"></div>

            {/* Outcomes Section */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Results & Impact</h3>
                <div className="space-y-4">
                  {project.outcomes && project.outcomes.length > 0 ? (
                    <ul className="space-y-3 text-left">
                      {project.outcomes.map((result: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-left">Outcome details coming soon.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. Other Projects/Case Studies - Left Aligned (as requested) */}
      {otherProjects.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-8 md:px-16 lg:px-24">
            <div className="max-w-6xl">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Projects</h2>
                <p className="text-gray-600 text-lg">Explore more of my work</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherProjects.map((otherProject: any) => (
                  <StandardCard
                    key={otherProject.id}
                    title={otherProject.title}
                    description={otherProject.description}
                    image={otherProject.image_url || "/placeholder.svg?height=300&width=400"}
                    category={otherProject.category || "Project"}
                    tags={otherProject.tags || []}
                    link={`/project-cs/${otherProject.id}`}
                    linkText="View Project"
                  />
                ))}
              </div>

              <div className="mt-12">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-black bg-transparent"
                >
                  <Link href="/projects-cs">View All Projects</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
