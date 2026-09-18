import { Skeleton } from "@/components/ui/skeleton"

export default function LearningDiaryLoading() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-muted">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Skeleton className="h-8 w-32 mx-auto" />
            <Skeleton className="h-12 w-96 mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="content-container">
          <div className="space-y-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-18" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
