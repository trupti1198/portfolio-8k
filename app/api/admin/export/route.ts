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

    // Fetch all contact submissions
    const { data, error } = await supabaseAdmin
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
    }

    // Convert to CSV
    const csvHeaders = "ID,First Name,Last Name,Email,Subject,Message,Created At\n"
    const csvRows = data
      .map(
        (row) =>
          `"${row.id}","${row.first_name}","${row.last_name}","${row.email}","${row.subject}","${row.message.replace(/"/g, '""')}","${new Date(row.created_at).toISOString()}"`,
      )
      .join("\n")

    const csv = csvHeaders + csvRows

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="contact-submissions-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
