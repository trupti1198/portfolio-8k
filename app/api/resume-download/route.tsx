import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, description } = body

    // Validation
    if (!name || !email || !description) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Get request metadata
    const ip = request.ip || request.headers.get("x-forwarded-for") || null
    const userAgent = request.headers.get("user-agent") || null
    const referrer = request.headers.get("referer") || null

    // Save to database
    const { data, error: dbError } = await supabase
      .from("resume_downloads")
      .insert([
        {
          name,
          email,
          ip_address: ip,
          user_agent: userAgent,
          referrer: referrer,
          downloaded_at: new Date().toISOString(),
        },
      ])
      .select()

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Failed to process request. Please try again." }, { status: 500 })
    }

    // Send email notification
    try {
      await resend.emails.send({
        from: "Portfolio Resume <noreply@yourdomain.com>",
        to: "truptikamatwork@gmail.com",
        replyTo: email,
        subject: `Resume Downloaded by ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
              Resume Download Notification
            </h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Description:</strong> ${description}</p>
              <p><strong>Downloaded at:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Request Details:</h3>
              <p><strong>IP Address:</strong> ${ip || "Unknown"}</p>
              <p><strong>User Agent:</strong> ${userAgent || "Unknown"}</p>
              <p><strong>Referrer:</strong> ${referrer || "Direct"}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>Someone has downloaded your resume from your portfolio.</p>
              <p>You can reply directly to this email to connect with ${name}.</p>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Email error:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        message: "Thank you! Your download will begin shortly.",
        success: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Resume download error:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 })
  }
}
