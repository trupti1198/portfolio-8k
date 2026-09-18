import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface StandardCardProps {
  title: string
  description: string
  image: string
  category: string
  tags: string[]
  link: string
  linkText: string
}

export default function StandardCard({ title, description, image, category, tags, link, linkText }: StandardCardProps) {
  return (
    <Card className="overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {category}
          </Badge>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </CardHeader>
      <CardContent className="px-6 pb-4 flex-grow">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs text-gray-700 border-gray-300 bg-gray-50">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-black h-10">
          <Link href={link}>{linkText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
