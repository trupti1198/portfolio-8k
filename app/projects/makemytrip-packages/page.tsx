"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  Users,
  Target,
  CheckCircle2,
  FileText,
  Figma,
  ExternalLink,
  Smartphone,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StandardCard from "@/components/standard-card"

export default function MakeMyTripPage() {
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
                  Mobile Design
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Travel
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  UX/UI
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Prototyping
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">MakeMyTrip - Customized Packages</h1>
              <p className="text-xl text-muted-foreground">
                Mobile design prototypes for a customized travel packages feature
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
                    src="/placeholder.svg?height=300&width=600&text=MakeMyTrip+Prototype"
                    alt="MakeMyTrip Customized Packages Prototype"
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
                            <p className="text-sm text-muted-foreground">November 2022</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Team</p>
                            <p className="text-sm text-muted-foreground">UX/UI Design Team</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Target className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Role</p>
                            <p className="text-sm text-muted-foreground">UX/UI Designer</p>
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
                      This project focused on creating mobile design prototypes for a customized travel packages feature
                      for MakeMyTrip, one of India's leading travel booking platforms. The goal was to allow users to
                      build personalized travel itineraries based on their preferences, budget, and interests, moving
                      beyond the standard pre-packaged tours.
                    </p>
                    <p className="text-lg">
                      The design prototypes included user flows, wireframes, and high-fidelity mockups for the mobile
                      application, focusing on an intuitive and engaging user experience that simplifies the complex
                      process of building a custom travel package.
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
                      <span>Conducted user research to understand pain points in current travel booking processes</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Created user personas and journey maps to identify key touchpoints</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Developed low-fidelity wireframes to test the user flow and information architecture</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>
                        Designed high-fidelity mockups with a focus on visual hierarchy and intuitive interactions
                      </span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Created interactive prototypes for user testing and stakeholder presentations</span>
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
                      <span>Simplifying the complex process of building a custom travel package</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>
                        Designing an intuitive interface for selecting and customizing multiple travel components
                      </span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>
                        Creating a transparent pricing model that updates in real-time as users customize their package
                      </span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Balancing feature richness with simplicity for mobile interfaces</span>
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
                      <span>Completed high-fidelity mobile design prototypes for the customized packages feature</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>
                        Created a step-by-step wizard interface that breaks down the complex process into manageable
                        steps
                      </span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Designed an interactive itinerary builder with drag-and-drop functionality</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>
                        Developed a real-time pricing component that provides transparency throughout the customization
                        process
                      </span>
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
                      <h4 className="font-medium mb-2">UI Mockups</h4>
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
                        <Smartphone className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-medium mb-2">Interactive Prototype</h4>
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
                      <h4 className="font-medium mb-2">User Research</h4>
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
              <h3 className="text-xl font-bold">More Mobile Design Projects</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <StandardCard
                  title="Quizzinia"
                  description="Designed a mobile quiz application prototype with engaging user interfaces and gamification elements to enhance learning experiences."
                  image="/placeholder.svg?height=300&width=500&text=Quizzinia"
                  category="Project"
                  tags={["Mobile Design", "Education", "Gamification"]}
                  link="/projects/quizzinia"
                />
                <StandardCard
                  title="SciHomes"
                  description="Developed mobile design prototypes for a real estate platform focused on scientific home evaluation and comparison tools."
                  image="/placeholder.svg?height=300&width=500&text=SciHomes"
                  category="Project"
                  tags={["Mobile Design", "Real Estate", "UX/UI"]}
                  link="/projects/scihomes"
                />
                <StandardCard
                  title="Apna Farm - Startup Idea"
                  description="Created an MVP with business model, product strategy, launch, break-even strategy, pricing, and projections for a farming solution."
                  image="/placeholder.svg?height=300&width=500&text=Apna+Farm"
                  category="Case Study"
                  tags={["Startup", "MVP", "Business Model"]}
                  link="/projects/apna-farm"
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
