import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const { id } = params

    // Fetch project details
    const { data: project, error: projectError } = await supabase.from("projects").select("*").eq("id", id).single()

    if (projectError) {
      console.error("Project fetch error:", projectError)
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Fetch project media
    const { data: media, error: mediaError } = await supabase
      .from("project_media")
      .select("*")
      .eq("project_id", id)
      .order("display_order", { ascending: true })

    if (mediaError) {
      console.error("Media fetch error:", mediaError)
    }

    // Fetch project files
    const { data: files, error: filesError } = await supabase.from("project_files").select("*").eq("project_id", id)

    if (filesError) {
      console.error("Files fetch error:", filesError)
    }

    // Transform media data to match component interface
    const transformedMedia = (media || []).map((item) => ({
      type: item.media_type,
      src: item.src_url,
      alt: item.alt_text,
      title: item.title,
      thumbnail: item.thumbnail_url,
    }))

    // Transform files data
    const transformedFiles = (files || []).map((item) => ({
      type: item.file_type,
      name: item.file_name,
      url: item.file_url,
    }))

    const projectData = {
      ...project,
      media: transformedMedia,
      files: transformedFiles,
      testimonial: project.testimonial_quote
        ? {
            quote: project.testimonial_quote,
            author: project.testimonial_author,
          }
        : null,
    }

    return NextResponse.json({ project: projectData })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
