import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)

    const weekStart = searchParams.get("weekStart")
    const weekEnd = searchParams.get("weekEnd")
    const monthStart = searchParams.get("monthStart")
    const monthEnd = searchParams.get("monthEnd")

    if (!weekStart || !weekEnd || !monthStart || !monthEnd) {
      return NextResponse.json({ error: "Missing required date parameters" }, { status: 400 })
    }

    // Fetch weekly entries
    const { data: weeklyEntries, error: weeklyError } = await supabase
      .from("learning_entries")
      .select("*")
      .gte("entry_date", weekStart)
      .lte("entry_date", weekEnd)
      .order("entry_date", { ascending: false })

    if (weeklyError) {
      console.error("Weekly entries error:", weeklyError)
      return NextResponse.json({ error: "Failed to fetch weekly entries" }, { status: 500 })
    }

    // Fetch monthly entries
    const { data: monthlyEntries, error: monthlyError } = await supabase
      .from("learning_entries")
      .select("*")
      .gte("entry_date", monthStart)
      .lte("entry_date", monthEnd)
      .order("entry_date", { ascending: false })

    if (monthlyError) {
      console.error("Monthly entries error:", monthlyError)
      return NextResponse.json({ error: "Failed to fetch monthly entries" }, { status: 500 })
    }

    // Extract topics from notes content
    const extractTopics = (notes: string): string[] => {
      const topics: string[] = []

      // Extract hashtags
      const hashtags = notes.match(/#[\w]+/g) || []
      topics.push(...hashtags.map((tag) => tag.replace("#", "")))

      // Extract bold text that might be topics
      const boldText = notes.match(/\*\*(.*?)\*\*/g) || []
      topics.push(...boldText.map((text) => text.replace(/\*\*/g, "")))

      // Extract headers that might be topics
      const headers = notes.match(/^#+\s+(.+)$/gm) || []
      topics.push(...headers.map((header) => header.replace(/^#+\s+/, "")))

      // Common PM topics
      const pmTopics = [
        "Product Strategy",
        "User Research",
        "Analytics",
        "Metrics",
        "Roadmapping",
        "Prioritization",
        "Agile",
        "Scrum",
        "Design Systems",
        "AI",
        "React",
        "Next.js",
        "System Design",
        "Customer Development",
        "Validation",
        "OKRs",
        "Framework",
        "Architecture",
        "Performance",
        "Testing",
        "Development"
      ]

      pmTopics.forEach((topic) => {
        if (notes.toLowerCase().includes(topic.toLowerCase())) {
          topics.push(topic)
        }
      })

      // Return unique topics
      return [...new Set(topics)].filter((topic) => topic.length > 2)
    }

    // Process monthly topics
    const allTopics: string[] = []
    if (monthlyEntries) {
      monthlyEntries.forEach((entry) => {
        const topics = extractTopics(entry.notes)
        allTopics.push(...topics)
      })
    }

    // Count topic frequency
    const topicCounts: Record<string, number> = {}
    allTopics.forEach((topic) => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1
    })

    // Get top topics
    const topTopics = Object.entries(topicCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([topic]) => topic)

    // Get unique days for monthly summary
    const uniqueMonthlyDays = new Set(monthlyEntries?.map((entry) => entry.entry_date) || []).size

    const summary = {
      weeklySummary: {
        totalDays: weeklyEntries?.length || 0,
        entries: weeklyEntries || [],
      },
      monthlySummary: {
        totalDays: monthlyEntries?.length || 0,
        uniqueDays: uniqueMonthlyDays,
        topTopics,
        entries: monthlyEntries || [],
      },
    }

    return NextResponse.json(summary)
  } catch (error) {
    console.error("Summary API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
