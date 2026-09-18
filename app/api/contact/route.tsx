import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const resend = new Resend(process.env.RESEND_API_KEY!)

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(ip: string, email: string): string {
  return `${ip}:${email}`
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(key, { count: 1, resetTime: now + 60000 }) // 1 minute
    return false
  }

  if (record.count >= 3) {
    return true
  }

  record.count++
  return false
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, subject, message } = body

    // Validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Message length validation
    if (message.length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters long" }, { status: 400 })
    }

    // Rate limiting
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const rateLimitKey = getRateLimitKey(ip, email)

    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a minute before trying again." },
        { status: 429 },
      )
    }

    // Save to database
    const { data, error: dbError } = await supabase
      .from("contact_submissions")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          subject,
          message,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Failed to save message. Please try again." }, { status: 500 })
    }

    // Send email notification
    try {
      await resend.emails.send({
        from: "Portfolio Contact <noreply@yourdomain.com>",
        to: "truptikamatwork@gmail.com",
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Message:</h3>
              <p style="line-height: 1.6; color: #555;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>This message was sent from your portfolio contact form.</p>
              <p>You can reply directly to this email to respond to ${firstName}.</p>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Email error:", emailError)
      // Don't fail the request if email fails, but log it
    }

    return NextResponse.json(
      {
        message: "Thank you for your message! I'll get back to you soon.",
        success: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 })
  }
}
