import { supabaseAdmin } from "./supabase"

export async function trackFormEvent(
  eventType: "view" | "submit" | "success" | "error",
  pagePath: string,
  userAgent?: string,
  ipAddress?: string,
) {
  try {
    // First check if the table exists and has the correct structure
    const { data: tableInfo, error: tableError } = await supabaseAdmin.from("form_analytics").select("*").limit(1)

    if (tableError) {
      console.error("Table structure error:", tableError)
      return
    }

    const { error } = await supabaseAdmin.from("form_analytics").insert({
      event_type: eventType,
      page_path: pagePath,
      user_agent: userAgent,
      ip_address: ipAddress,
    })

    if (error) {
      console.error("Analytics tracking error:", error)

      // If it's a column not found error, try to create the table
      if (error.message.includes("page_path") || error.message.includes("column")) {
        console.log("Attempting to recreate analytics table...")
        await createAnalyticsTable()
      }
    }
  } catch (error) {
    console.error("Analytics tracking error:", error)
  }
}

async function createAnalyticsTable() {
  try {
    // This will attempt to create the table if it doesn't exist
    const { error } = await supabaseAdmin.rpc("create_analytics_table", {})

    if (error) {
      console.error("Failed to create analytics table:", error)
    }
  } catch (error) {
    console.error("Error creating analytics table:", error)
  }
}

export async function getFormAnalytics() {
  try {
    const { data, error } = await supabaseAdmin
      .from("form_analytics")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Analytics fetch error:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Analytics fetch error:", error)
    return null
  }
}
