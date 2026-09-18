import Link from "next/link"
import { ArrowRight, TrendingUp, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const pitchDecks = [
  {
    id: "apna-farm",
    title: "Apna Farm - AgriTech Revolution",
    description: "Comprehensive business plan and pitch deck for connecting farmers with modern agricultural solutions",
    category: "AgriTech",
    status: "Completed",
    highlights: ["₹2.5 Cr projected revenue", "18-month break-even", "B2B marketplace model"],
    icon: Target,
  },
  {
    id: "fintech-solution",
    title: "FinTech Innovation Deck",
    description: "Strategic presentation for next-generation financial technology solutions",
    category: "FinTech",
    status: "In Progress",
    highlights: ["Market analysis", "Competitive positioning", "Go-to-market strategy"],
    icon: TrendingUp,
  },
]

export default function PitchDeckPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="py-20 bg-muted">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge variant="outline">Business Strategy</Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Pitch Decks & Business Plans</h1>
            <p className="text-muted-foreground md:text-xl">
              Strategic presentations and comprehensive business plans showcasing market opportunities and execution
              strategies
            </p>
          </div>
        </div>
      </section>

      {/* Pitch Decks Grid */}
      <section className="py-12">
        <div className="content-container">
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {pitchDecks.map((deck) => (
              <Card key={deck.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{deck.category}</Badge>
                    <Badge
                      variant="outline"
                      className={
                        deck.status === "Completed" ? "border-green-500 text-green-600" : "border-primary text-primary"
                      }
                    >
                      {deck.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <deck.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{deck.title}</CardTitle>
                  </div>
                  <CardDescription>{deck.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Key Highlights:</h4>
                      <ul className="space-y-1">
                        {deck.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full group-hover:bg-primary group-hover:text-black transition-colors"
                    >
                      <Link href={`/pitch-deck/${deck.id}`}>
                        View Pitch Deck <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Need a Strategic Presentation?</h2>
            <p className="text-muted-foreground md:text-lg">
              I create compelling pitch decks and business plans that clearly communicate value propositions and drive
              investment decisions.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                Let's Collaborate <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
