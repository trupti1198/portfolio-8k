import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get("admin-token")?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get analytics data
    const { data: analytics, error: analyticsError } = await supabaseAdmin
      .from("form_analytics")
      .select("*")
      .order("created_at", { ascending: false })

    if (analyticsError) {
      return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
    }

    // Calculate metrics
    const totalViews = analytics.filter((a) => a.event_type === "view").length
    const totalSubmissions = analytics.filter((a) => a.event_type === "submit").length
    const successfulSubmissions = analytics.filter((a) => a.event_type === "success").length
    const failedSubmissions = analytics.filter((a) => a.event_type === "error").length

    const conversionRate = totalViews > 0 ? ((successfulSubmissions / totalViews) * 100).toFixed(2) : "0"

    return NextResponse.json({
      totalViews,
      totalSubmissions,
      successfulSubmissions,
      failedSubmissions,
      conversionRate: Number.parseFloat(conversionRate),
      rawData: analytics,
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
