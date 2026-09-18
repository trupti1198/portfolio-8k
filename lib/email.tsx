import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactEmailData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(data: ContactEmailData) {
  const { name, email, subject, message } = data

  try {
    const result = await resend.emails.send({
      from: "Portfolio Contact <noreply@truptikamat.com>",
      to: ["truptikamatwork@gmail.com"],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e9ecef; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This email was sent from your portfolio contact form.<br>
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
      replyTo: email,
    })

    return { success: true, data: result }
  } catch (error) {
    console.error("Failed to send contact email:", error)
    return { success: false, error }
  }
}

interface ResumeDownloadData {
  name: string
  email: string
  description: string
}

export async function sendResumeDownloadEmail(data: ResumeDownloadData) {
  const { name, email, description } = data

  // Get the description label for display
  const descriptionLabels: Record<string, string> = {
    student: "Student",
    recruiter: "Recruiter",
    talent_acquisition: "Talent Acquisition",
    hiring_manager: "Hiring Manager",
    founder: "Founder/CEO",
    product_manager: "Product Manager",
    engineer: "Engineer/Developer",
    consultant: "Consultant",
    investor: "Investor",
    mentor: "Mentor/Advisor",
    peer: "Industry Peer",
    guidance: "Seeking Guidance",
    collaboration: "Potential Collaboration",
    other: "Other",
  }

  const descriptionLabel = descriptionLabels[description] || description

  try {
    const result = await resend.emails.send({
      from: "Portfolio Resume <noreply@truptikamat.com>",
      to: ["truptikamatwork@gmail.com"],
      subject: `Resume Download Request - ${descriptionLabel}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Resume Download Request
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Requester Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Description:</strong> ${descriptionLabel}</p>
            <p><strong>Requested At:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
            <h4 style="color: #856404; margin-top: 0;">Next Steps</h4>
            <p style="color: #856404; margin: 0;">
              Consider reaching out to ${name} with a personalized message along with your resume.
              Their email is ready for you to reply to: <strong>${email}</strong>
            </p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e9ecef; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This person downloaded your resume from your portfolio website.<br>
              Reply directly to this email to connect with ${name}.
            </p>
          </div>
        </div>
      `,
      replyTo: email,
    })

    return { success: true, data: result }
  } catch (error) {
    console.error("Failed to send resume download email:", error)
    return { success: false, error }
  }
}
