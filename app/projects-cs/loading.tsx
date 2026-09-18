import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectsLoading() {
  return (
    <div className="container px-4 md:px-6 py-20">
      <div className="max-w-3xl mx-auto text-center space-y-8 mb-12">
        <Skeleton className="h-6 w-20 mx-auto" />
        <Skeleton className="h-12 w-96 mx-auto" />
        <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
      </div>

      <div className="space-y-8">
        <div className="flex justify-center">
          <Skeleton className="h-10 w-80" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
