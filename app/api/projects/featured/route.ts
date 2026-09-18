import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createClient()

    const { data: projects, error } = await supabase
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
      .limit(4)

    if (error) {
      console.error("Featured projects fetch error:", error)
      return NextResponse.json({ error: "Failed to fetch featured projects" }, { status: 500 })
    }

    return NextResponse.json({ projects: projects || [] })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
