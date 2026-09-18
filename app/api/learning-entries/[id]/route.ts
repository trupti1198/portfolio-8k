import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, description, external_link, entry_type, tags, entry_date } = body

    // Validate required fields
    if (!title || !entry_type || !entry_date) {
      return NextResponse.json({ error: "Title, type, and date are required" }, { status: 400 })
    }

    const { data: entry, error } = await supabaseAdmin
      .from("learning_entries")
      .update({
        title,
        description: description || null,
        external_link: external_link || null,
        entry_type,
        tags: tags || [],
        entry_date,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to update entry" }, { status: 500 })
    }

    return NextResponse.json({ entry })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabaseAdmin.from("learning_entries").delete().eq("id", params.id)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to delete entry" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
