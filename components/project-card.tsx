"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-lg animate-scale cursor-hover equal-height bg-white border border-gray-200">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 opacity-0 hover:opacity-100 transition-opacity flex items-end p-6">
          <Button asChild variant="default" size="sm" className="group bg-primary hover:bg-primary/90 text-black">
            <Link href={`/projects/${project.id}`}>
              View Project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-6 flex-grow">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
            <p className="text-gray-700 text-sm">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 card-footer-fixed">
        <Button
          asChild
          variant="outline"
          className="w-full group border-primary text-primary hover:bg-primary hover:text-black bg-transparent"
        >
          <Link href={`/projects/${project.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
