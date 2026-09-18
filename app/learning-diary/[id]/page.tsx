"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Sample diary entry data - in a real app, this would come from a database or CMS
const diaryEntriesData = {
  "product-led-growth": {
    title: "Product-Led Growth Strategies",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Strategy",
    tags: ["Growth", "User Acquisition", "Product Strategy"],
    content: `
      <h2>What is Product-Led Growth?</h2>
      <p>Product-led growth (PLG) is a business methodology where user acquisition, expansion, conversion, and retention are all driven primarily by the product itself. It creates a flywheel effect that drives growth.</p>
      
      <p>Today I attended a workshop on implementing PLG strategies for SaaS products, and I wanted to document my key learnings and how I plan to apply them to our current product initiatives.</p>
      
      <h2>Key Takeaways from the Workshop</h2>
      <p>The workshop was led by a growth expert from a leading PLG company, and these were my main insights:</p>
      
      <ul>
        <li><strong>Time to Value is Critical</strong>: Users should experience the core value of your product within the first 5 minutes. This means rethinking onboarding flows to prioritize immediate value delivery over comprehensive feature tours.</li>
        <li><strong>Friction Reduction</strong>: Every step that stands between the user and experiencing value should be scrutinized and potentially eliminated. This includes sign-up forms, credit card requirements, and mandatory tutorials.</li>
        <li><strong>Product Analytics are Non-Negotiable</strong>: You need to instrument your product to understand exactly how users are engaging with it, where they're finding value, and where they're getting stuck.</li>
        <li><strong>Virality Should Be Built In</strong>: The most successful PLG products have natural network effects or collaboration features that encourage existing users to bring in new users.</li>
      </ul>
      
      <h2>How I'm Planning to Apply These Insights</h2>
      <p>After reflecting on the workshop, I've identified several opportunities to apply PLG principles to our current product:</p>
      
      <h3>1. Redesigning Our Onboarding Flow</h3>
      <p>Our current onboarding is feature-focused rather than value-focused. I'm planning to work with our design team to create a new onboarding experience that gets users to an "aha moment" within the first few minutes.</p>
      
      <img src="/placeholder.svg?height=400&width=800" alt="Onboarding Flow Sketch" class="my-6 rounded-lg" />
      
      <h3>2. Implementing a Free Tier</h3>
      <p>We currently offer only a 14-day trial that requires a credit card. I'm going to propose a perpetual free tier with usage limitations that allows users to experience value indefinitely, with natural upgrade paths as their usage grows.</p>
      
      <h3>3. Enhancing Our Analytics</h3>
      <p>While we have basic analytics in place, we're missing detailed insights into our activation funnel. I'm planning to work with our engineering team to implement more comprehensive event tracking to identify where users are dropping off.</p>
      
      <h3>4. Adding Collaboration Features</h3>
      <p>Our product is currently designed for individual use, but there are natural collaboration opportunities we're not leveraging. I'm sketching out some initial ideas for features that would encourage users to invite teammates.</p>
      
      <h2>Next Steps</h2>
      <p>Tomorrow, I'll be presenting these insights to our product team and proposing a roadmap for implementing these changes. I've already started creating wireframes for the new onboarding flow and documenting the analytics events we need to track.</p>
      
      <p>I'm excited about the potential impact these changes could have on our growth metrics. The workshop presenter shared case studies where similar changes led to 30-40% improvements in activation rates and significant increases in organic user acquisition.</p>
      
      <h2>Resources I'm Using</h2>
      <ul>
        <li>"Product-Led Growth: How to Build a Product That Sells Itself" by Wes Bush</li>
        <li>Amplitude's Product-Led Growth Playbook</li>
        <li>OpenView Partners' PLG Resource Library</li>
      </ul>
      
      <p>I'll update this entry as I make progress on implementing these strategies and measuring their impact.</p>
    `,
    relatedEntries: ["ai-in-product-management", "product-metrics"],
  },
  "jobs-to-be-done": {
    title: "Applying the Jobs-to-be-Done Framework",
    date: "February 28, 2024",
    readTime: "12 min read",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Research",
    tags: ["User Research", "Product Development", "Frameworks"],
    content: `
      <h2>Rethinking User Needs with Jobs-to-be-Done</h2>
      <p>For the past month, I've been experimenting with the Jobs-to-be-Done (JTBD) framework to gain deeper insights into our users' motivations. Today, I want to reflect on what I've learned and how it's changing my approach to product development.</p>
      
      <h2>What is Jobs-to-be-Done?</h2>
      <p>The core premise of JTBD is simple but powerful: people "hire" products to help them accomplish specific jobs in their lives. Instead of focusing on user demographics or product features, JTBD focuses on understanding the underlying job that customers are trying to get done.</p>
      
      <p>As Clayton Christensen famously explained with his milkshake example, people weren't buying milkshakes because they were in a demographic that liked milkshakes; they were "hiring" milkshakes to help them stay full during a long commute or to give their children a treat.</p>
      
      <h2>My JTBD Research Process</h2>
      <p>I conducted 15 JTBD interviews with our users over the past month. Here's the process I followed:</p>
      
      <ol>
        <li><strong>Timeline Interviews</strong>: I asked users to walk me through their journey from first realizing they had a problem to ultimately choosing our solution.</li>
        <li><strong>Pushing for Emotional Motivations</strong>: I dug deep into the emotional aspects of their decision-making, asking "why" repeatedly to get beyond surface-level explanations.</li>
        <li><strong>Identifying Forces</strong>: I mapped out the pushing and pulling forces that drove users toward or away from change.</li>
        <li><strong>Job Statement Creation</strong>: I synthesized the interviews into clear job statements that captured what users were truly trying to accomplish.</li>
      </ol>
      
      <img src="/placeholder.svg?height=400&width=800" alt="JTBD Forces Diagram" class="my-6 rounded-lg" />
      
      <h2>Key Insights from JTBD Research</h2>
      <p>The research revealed several surprising insights that we wouldn't have discovered through traditional user research:</p>
      
      <h3>1. The Social Context Matters More Than We Thought</h3>
      <p>We discovered that many users weren't just trying to accomplish a task; they were trying to look good in front of colleagues or managers. This social dimension was influencing feature usage in ways we hadn't anticipated.</p>
      
      <h3>2. Emotional Jobs Outweigh Functional Jobs</h3>
      <p>While our product messaging focused heavily on functional benefits (save time, reduce errors), users were often "hiring" our product for emotional reasons (reduce anxiety, feel confident in presentations).</p>
      
      <h3>3. Competing Solutions Weren't What We Expected</h3>
      <p>We learned that our biggest competition wasn't other software products but often manual processes that users were comfortable with. The "anxiety of change" was a bigger barrier than feature comparisons.</p>
      
      <h2>How I'm Applying JTBD to Product Development</h2>
      <p>Based on these insights, I've made several changes to our product development process:</p>
      
      <h3>1. Reframing Our Roadmap</h3>
      <p>I've restructured our roadmap around jobs to be done rather than features. Each initiative now starts with a clear job statement that explains what users are trying to accomplish.</p>
      
      <h3>2. Changing Our Success Metrics</h3>
      <p>We're now measuring success based on job completion rates rather than feature usage. This has led us to combine features that were previously separate but serve the same job.</p>
      
      <h3>3. Revising Our Onboarding</h3>
      <p>Our onboarding now focuses on helping users accomplish their most important jobs quickly, rather than showcasing all our features.</p>
      
      <h2>Early Results</h2>
      <p>We've only been applying JTBD for a month, but we're already seeing promising results:</p>
      
      <ul>
        <li>Activation rates have improved by 15% since we redesigned onboarding around key jobs</li>
        <li>Feature usage is more focused, with users going deeper into specific workflows rather than skimming across many features</li>
        <li>Customer feedback has become more actionable because we're able to connect it to specific jobs</li>
      </ul>
      
      <h2>Next Steps</h2>
      <p>I'm planning to expand our JTBD research to include potential customers who chose competitors or decided not to purchase any solution. I believe this will give us even deeper insights into the barriers we need to overcome.</p>
      
      <p>I'm also working on creating a JTBD playbook for our team to ensure this approach becomes embedded in our product development culture.</p>
      
      <h2>Resources I'm Using</h2>
      <ul>
        <li>"When Coffee and Kale Compete" by Alan Klement</li>
        <li>The Re-Wired Group's JTBD interview format</li>
        <li>Intercom's JTBD case studies</li>
      </ul>
    `,
    relatedEntries: ["product-metrics", "design-systems"],
  },
  // Additional entries would be defined here
}

export default function DiaryEntryPage() {
  const { id } = useParams()
  const entryId = Array.isArray(id) ? id[0] : id
  const entry = diaryEntriesData[entryId as keyof typeof diaryEntriesData]

  if (!entry) {
    return (
      <div className="container px-4 md:px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">Entry not found</h1>
        <p className="mt-4 text-muted-foreground">
          The diary entry you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="mt-8">
          <Link href="/learning-diary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning Diary
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <section className="py-12 md:py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/learning-diary"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Learning Diary
            </Link>
            <div className="space-y-4">
              <Badge>{entry.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">{entry.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {entry.date}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {entry.readTime}
                </div>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <div key={tag} className="flex items-center">
                      <Tag className="mr-1 h-4 w-4" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative overflow-hidden rounded-xl border mx-auto" style={{ maxWidth: "50%" }}>
                <Image
                  src={entry.image || "/placeholder.svg"}
                  alt={entry.title}
                  width={600}
                  height={300}
                  className="w-full object-cover"
                />
              </div>

              <div
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: entry.content }}
              />

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
                <Button asChild>
                  <Link href="/learning-diary">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Entries
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Related Entries</h3>
                <div className="space-y-4">
                  {entry.relatedEntries?.map((relatedId) => {
                    const relatedEntry = diaryEntriesData[relatedId as keyof typeof diaryEntriesData]
                    if (!relatedEntry) return null

                    return (
                      <Card key={relatedId} className="overflow-hidden">
                        <Link
                          href={`/learning-diary/${relatedId}`}
                          className="block hover:opacity-90 transition-opacity"
                        >
                          <Image
                            src={relatedEntry.image || "/placeholder.svg"}
                            alt={relatedEntry.title}
                            width={400}
                            height={200}
                            className="w-full h-32 object-cover"
                          />
                          <CardContent className="p-4">
                            <h4 className="font-medium line-clamp-1">{relatedEntry.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{relatedEntry.date}</p>
                          </CardContent>
                        </Link>
                      </Card>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="cursor-pointer">Strategy</Badge>
                  <Badge className="cursor-pointer">Research</Badge>
                  <Badge className="cursor-pointer">Technology</Badge>
                  <Badge className="cursor-pointer">Design</Badge>
                  <Badge className="cursor-pointer">Analytics</Badge>
                  <Badge className="cursor-pointer">Leadership</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
