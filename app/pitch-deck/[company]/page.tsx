import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const pitchDecks: Record<string, any> = {
  "apna-farm": {
    title: "Apna Farm - AgriTech Revolution",
    company: "Apna Farm",
    category: "AgriTech",
    description:
      "A comprehensive business plan for revolutionizing agriculture through technology, connecting farmers with modern farming solutions and creating a sustainable ecosystem.",
    overview:
      "Apna Farm addresses the critical gap in agricultural technology adoption by providing farmers with easy access to modern farming techniques, equipment, and market connections.",
    keyMetrics: [
      { label: "Projected Revenue (Year 1)", value: "₹2.5 Cr" },
      { label: "Break-even Timeline", value: "18 months" },
      { label: "Target Market Size", value: "₹50,000 Cr" },
      { label: "Expected ROI", value: "300%" },
    ],
    businessModel: [
      "B2B Marketplace connecting farmers with suppliers",
      "Subscription-based premium services",
      "Commission on successful transactions",
      "Data analytics and insights services",
    ],
    marketStrategy: [
      "Direct farmer outreach programs",
      "Partnership with agricultural cooperatives",
      "Digital marketing and social media presence",
      "Government collaboration initiatives",
    ],
    competitiveAdvantage: [
      "Deep understanding of farmer pain points",
      "Technology-first approach with mobile accessibility",
      "Strong network of agricultural experts",
      "Scalable business model with multiple revenue streams",
    ],
  },
}

interface PitchDeckPageProps {
  params: {
    company: string
  }
}

export default function PitchDeckPage({ params }: PitchDeckPageProps) {
  const deck = pitchDecks[params.company]

  if (!deck) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 bg-muted">
        <div className="content-container">
          <div className="flex items-center gap-4 mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/pitch-deck">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Pitch Decks
              </Link>
            </Button>
          </div>

          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant="secondary">{deck.category}</Badge>
              <Badge variant="outline" className="border-green-500 text-green-600">
                Completed
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter">{deck.title}</h1>
            <p className="text-xl text-muted-foreground">{deck.description}</p>

            <div className="flex gap-4">
              <Button size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Pitch Deck
              </Button>
              <Button variant="outline" size="lg">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="content-container">
          <div className="max-w-4xl space-y-12">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{deck.overview}</p>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Financial Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {deck.keyMetrics.map((metric: any, index: number) => (
                    <div key={index} className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-2">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Model */}
            <Card>
              <CardHeader>
                <CardTitle>Business Model</CardTitle>
                <CardDescription>Revenue streams and operational framework</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {deck.businessModel.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Market Strategy */}
            <Card>
              <CardHeader>
                <CardTitle>Go-to-Market Strategy</CardTitle>
                <CardDescription>Customer acquisition and market penetration approach</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {deck.marketStrategy.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Competitive Advantage */}
            <Card>
              <CardHeader>
                <CardTitle>Competitive Advantage</CardTitle>
                <CardDescription>Key differentiators and unique value propositions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {deck.competitiveAdvantage.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold">Interested in This Project?</h2>
            <p className="text-muted-foreground">
              Learn more about the strategic thinking and execution behind this business plan.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
