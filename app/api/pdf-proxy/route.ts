import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    // Validate URL
    const pdfUrl = new URL(url)

    // Fetch the PDF with proper headers
    const response = await fetch(pdfUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/pdf,*/*",
        "Cache-Control": "no-cache",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status}`)
    }

    const pdfBuffer = await response.arrayBuffer()

    // Return PDF with proper headers to prevent download
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="presentation.pdf"',
        "Cache-Control": "public, max-age=3600",
        "X-Frame-Options": "SAMEORIGIN",
        "Content-Security-Policy": "frame-ancestors 'self'",
      },
    })
  } catch (error) {
    console.error("PDF proxy error:", error)
    return NextResponse.json({ error: "Failed to fetch PDF" }, { status: 500 })
  }
}
