"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Users, Target, CheckCircle2, FileText, Figma, ExternalLink, FileCode } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StandardCard from "@/components/standard-card"

export default function ApnaFarmPage() {
  return (
    <>
      <section className="relative py-16 bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Startup
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  MVP
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Business Model
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Product Strategy
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Apna Farm - Startup Idea</h1>
              <p className="text-xl text-muted-foreground">
                A farming solution with Community Farming and In-House Farming options
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 max-w-4xl mx-auto">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative overflow-hidden rounded-xl border max-w-2xl mx-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/20 opacity-70 blur-sm"></div>
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=300&width=600&text=Apna+Farm+Concept"
                    alt="Apna Farm Concept"
                    width={600}
                    height={300}
                    className="w-full object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-3">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium text-muted-foreground">Project Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Timeline</p>
                            <p className="text-sm text-muted-foreground">March 2023</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Team</p>
                            <p className="text-sm text-muted-foreground">Product Strategy Team</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Target className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Role</p>
                            <p className="text-sm text-muted-foreground">Product Strategist</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="approach">Approach</TabsTrigger>
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-lg">
                      ApnaFarm provides farming solutions with two products: Community Farming and In-House Farming.
                      Community Farming eliminates the hassle of buying farmlands and managing and caring for crops with
                      delivery logistics. This would save lakhs of rupees of investment and provide the sense of
                      ownership of farmland at the best affordable rates. In-house farming brings farms in your backyard
                      where you can grow your own farm with hydroponics technology.
                    </p>
                    <p className="text-lg">
                      We created an MVP with the business model, product strategy, launch, break-even strategy, pricing,
                      projections, and design mockups for the platform.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="approach" className="mt-6 space-y-4">
                  <h3 className="text-xl font-bold">My Approach</h3>
                  <ul className="space-y-4">
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Conducted market research to identify the pain points in traditional farming</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Developed two distinct product offerings to address different customer segments</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Created a comprehensive business model with pricing strategy and revenue projections</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Designed wireframes and mockups for the platform interface</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Developed a go-to-market strategy with phased launch plan</span>
                    </motion.li>
                  </ul>
                </TabsContent>
                <TabsContent value="challenges" className="mt-6 space-y-4">
                  <h3 className="text-xl font-bold">Key Challenges</h3>
                  <ul className="space-y-4">
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Balancing affordability with sustainable business operations</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Designing a logistics system for fresh produce delivery</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Creating a user-friendly interface for non-tech-savvy farmers</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Developing a scalable model for hydroponics technology implementation</span>
                    </motion.li>
                  </ul>
                </TabsContent>
                <TabsContent value="outcomes" className="mt-6 space-y-4">
                  <h3 className="text-xl font-bold">Results & Impact</h3>
                  <ul className="space-y-4">
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Completed MVP with comprehensive business strategy</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Developed pricing model that reduces farming investment by up to 70%</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Created detailed wireframes and user flows for both product offerings</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Established break-even projections and growth strategy</span>
                    </motion.li>
                  </ul>
                </TabsContent>
              </Tabs>

              {/* Files Tab */}
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Project Files & Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Figma className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-medium mb-2">Design Mockups</h4>
                      <Button asChild variant="outline" size="sm" className="mt-2">
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View File
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-medium mb-2">Business Model</h4>
                      <Button asChild variant="outline" size="sm" className="mt-2">
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View File
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <FileCode className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-medium mb-2">User Flow Diagram</h4>
                      <Button asChild variant="outline" size="sm" className="mt-2">
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View File
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-medium mb-2">Market Analysis</h4>
                      <Button asChild variant="outline" size="sm" className="mt-2">
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View File
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>

            {/* More Projects Section - Now below the main content */}
            <motion.div
              className="space-y-8 mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold">More Case Studies</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <StandardCard
                  title="Simpl Teardown"
                  description="Conducted a comprehensive product teardown of Simpl, analyzing its features, user experience, and business model to identify strengths and improvement opportunities."
                  image="/placeholder.svg?height=300&width=500&text=Simpl+Teardown"
                  category="Case Study"
                  tags={["Product Teardown", "UX Analysis", "Feature Analysis"]}
                  link="/projects/simpl-teardown"
                />
                <StandardCard
                  title="PayAvenue by CCAvenue"
                  description="Analyzed and documented the payment solution by CCAvenue, focusing on user flow, integration capabilities, and merchant experience."
                  image="/placeholder.svg?height=300&width=500&text=PayAvenue"
                  category="Case Study"
                  tags={["Payment Solutions", "User Flow", "Integration"]}
                  link="/projects/payavenue-ccavenue"
                />
                <StandardCard
                  title="Practo - Instant Feature"
                  description="Designed and proposed an instant consultation feature for Practo, enhancing the telemedicine experience with immediate doctor availability."
                  image="/placeholder.svg?height=300&width=500&text=Practo+Feature"
                  category="Case Study"
                  tags={["Healthcare", "Feature Design", "Telemedicine"]}
                  link="/projects/practo-instant-feature"
                />
              </div>
              <div className="flex justify-center mt-8">
                <Button asChild variant="outline">
                  <Link href="/projects">View All Projects</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
