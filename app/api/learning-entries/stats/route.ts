import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const month = searchParams.get("month") || new Date().toISOString().slice(0, 7)

    // Calculate proper start and end dates for the month
    const [year, monthNum] = month.split("-").map(Number)
    const startDate = `${year}-${monthNum.toString().padStart(2, "0")}-01`
    const lastDay = new Date(year, monthNum, 0).getDate() // Get last day of month
    const endDate = `${year}-${monthNum.toString().padStart(2, "0")}-${lastDay.toString().padStart(2, "0")}`

    const { data: entries, error } = await supabaseAdmin
      .from("learning_entries")
      .select("*")
      .gte("entry_date", startDate)
      .lte("entry_date", endDate)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
    }

    const totalEntries = entries?.length || 0
    const uniqueDays = new Set(entries?.map((entry) => entry.entry_date)).size

    const typeStats: Record<string, number> = {}
    const topTags: Record<string, number> = {}

    entries?.forEach((entry) => {
      // Count types
      typeStats[entry.entry_type] = (typeStats[entry.entry_type] || 0) + 1

      // Count tags
      entry.tags?.forEach((tag: string) => {
        topTags[tag] = (topTags[tag] || 0) + 1
      })
    })

    return NextResponse.json({
      totalEntries,
      uniqueDays,
      typeStats,
      topTags,
      month: new Date(startDate).toLocaleDateString("en-US", { year: "numeric", month: "long" }),
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
