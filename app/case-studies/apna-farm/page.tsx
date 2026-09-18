import Link from "next/link"
import { ArrowLeft, Calendar, Users, Target, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ApnaFarmCaseStudy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects-cs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">Case Study</Badge>
                <Badge variant="outline">Startup</Badge>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-2">Apna Farm - Startup Idea</h1>
              <p className="text-xl text-gray-600 mb-6">Revolutionizing agriculture through community-driven farming</p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Created an MVP with business model, product strategy, launch, break-even strategy, pricing, and
                projections for a farming solution with Community Farming and In-House Farming options.
              </p>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-gray-600">3 months (2023)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Team</p>
                      <p className="text-sm text-gray-600">Solo project with market research</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Target className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Role</p>
                      <p className="text-sm text-gray-600">Product Strategist</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="approach">Approach</TabsTrigger>
                <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Apna Farm was conceptualized as a comprehensive agricultural platform that bridges the gap
                        between urban consumers and rural farmers. The idea emerged from the need to provide fresh,
                        organic produce to urban areas while ensuring fair compensation for farmers.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        The platform offers two distinct models: Community Farming, where consumers can sponsor farm
                        plots and receive regular produce, and In-House Farming, where the platform manages farming
                        operations directly.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        This case study demonstrates end-to-end product strategy from ideation to business model
                        validation.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="challenges" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Key Challenges</h2>
                    <div className="space-y-4">
                      {[
                        "Understanding complex agricultural supply chain dynamics",
                        "Balancing farmer profitability with consumer affordability",
                        "Creating trust between urban consumers and rural farmers",
                        "Developing sustainable logistics for perishable goods",
                        "Validating market demand for community-supported agriculture",
                      ].map((challenge, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">{challenge}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="approach" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">My Approach</h2>
                    <div className="space-y-4">
                      {[
                        "Conducted extensive market research on agricultural pain points",
                        "Interviewed 50+ farmers and 100+ urban consumers",
                        "Analyzed existing agricultural platforms and their limitations",
                        "Developed detailed financial models for both farming approaches",
                        "Created comprehensive go-to-market strategy with pilot program design",
                      ].map((approach, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">{approach}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="outcomes" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Results & Impact</h2>
                    <div className="space-y-4">
                      {[
                        "Complete business model with revenue projections of ₹2.5 Cr in Year 1",
                        "Detailed MVP specification with core features and user journeys",
                        "Break-even analysis showing profitability by Month 18",
                        "Pricing strategy balancing farmer income and consumer value",
                        "Risk assessment and mitigation strategies for agricultural uncertainties",
                      ].map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">{outcome}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Technologies & Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Startup", "MVP", "Business Model", "Product Strategy"].map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Deliverables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Business Model Canvas",
                    "Financial Projections",
                    "Market Research Report",
                    "MVP Product Requirements",
                  ].map((deliverable, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">{deliverable}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Interested in Similar Work?</h2>
            <p className="text-gray-600 mb-6">Let's discuss how I can help bring your product vision to life.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get In Touch
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projects-cs">View More Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
