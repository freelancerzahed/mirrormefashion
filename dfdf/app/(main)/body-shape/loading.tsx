import { Skeleton } from "@/components/ui/skeleton"

export default function BodyShapeLoading() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-6 md:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Skeleton className="h-10 md:h-12 w-64 md:w-80 mx-auto" />
        <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
        <Skeleton className="h-4 w-3/4 max-w-xl mx-auto" />
      </div>

      {/* Body Shape Selector */}
      <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8 space-y-6">
        <Skeleton className="h-6 w-48" />

        {/* Shape Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="text-center space-y-3 p-4 border rounded-lg">
              <Skeleton className="w-16 h-20 md:w-20 md:h-24 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Measurements Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8 space-y-6">
        <Skeleton className="h-6 w-40" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          ))}
        </div>

        <Skeleton className="h-12 w-full md:w-48 rounded-md" />
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8 space-y-6">
        <Skeleton className="h-6 w-32" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-4">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-5 w-48" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <Skeleton className="h-40 md:h-48 w-full" />
              <div className="p-3 md:p-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
