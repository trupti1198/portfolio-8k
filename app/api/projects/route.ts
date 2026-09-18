import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)

    const type = searchParams.get("type") // 'project', 'case-study', or 'all'
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = supabase
      .from("projects")
      .select(`
        id,
        title,
        subtitle,
        description,
        image_url,
        timeline,
        role,
        team,
        tags,
        project_type,
        category,
        date_completed
      `)
      .order("date_completed", { ascending: false })

    if (type && type !== "all") {
      // Handle both 'case-study' and 'case_study' formats
      if (type === "case-study") {
        query = query.eq("project_type", "case-study")
      } else {
        query = query.eq("project_type", type)
      }
    }

    const { data: projects, error, count } = await query.range(offset, offset + limit - 1)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
    }

    // Ensure tags is always an array
    const processedProjects = (projects || []).map(project => ({
      ...project,
      tags: Array.isArray(project.tags) ? project.tags : 
            (typeof project.tags === 'string' ? 
             (project.tags.startsWith('[') ? 
              JSON.parse(project.tags) : 
              project.tags.split(',').map(tag => tag.trim())) : 
             [])
    }))

    const hasMore = count ? offset + limit < count : false

    return NextResponse.json({
      projects: processedProjects,
      hasMore,
      total: count || 0,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
