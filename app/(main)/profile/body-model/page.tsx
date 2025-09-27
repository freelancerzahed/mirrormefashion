"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import BodyViewer from "@/components/body-viewer"
import { useBodyShape } from "@/hooks/use-body-shape"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

// Mock user data - replace with actual user context
const mockUser = {
  id: 44,
  name: "Sarah Johnson",
  gender: "female" as const,
  age_range: "25-34",
}

export default function EditBodyShapePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const { bodyShape, loading, saveBodyShape } = useBodyShape(mockUser.id)

  const userResponses = {
    name: mockUser.name,
    age_range: mockUser.age_range,
    gender: mockUser.gender,
    bodyType: bodyShape?.shape || "average",
  }

  const handleComplete = async (data: {
    shape: string
    shape_keys: any
    slider_values: Record<string, number>
    alphanumeric_code: string
  }) => {
    try {
      const bodyShapeData = {
        user_id: mockUser.id,
        shape: data.shape,
        shape_keys: data.shape_keys,
        slider_values: data.slider_values,
        alphanumeric_code: data.alphanumeric_code,
        gender: mockUser.gender,
        // Add other fields from existing data if available
        ...(bodyShape && {
          bust: bodyShape.bust,
          shoe_size: bodyShape.shoe_size,
          weight: bodyShape.weight,
          height: bodyShape.height,
          bmi: bodyShape.bmi,
          age: bodyShape.age,
        }),
      }

      await saveBodyShape(bodyShapeData)
      setHasUnsavedChanges(false)

      // Redirect back to view page
      router.push("/profile/body-shape")
    } catch (error) {
      console.error("Failed to save body shape:", error)
    }
  }

  const handleBack = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm("You have unsaved changes. Are you sure you want to leave?")
      if (!confirmed) return
    }
    router.push("/profile/body-shape")
  }

  // Track changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [hasUnsavedChanges])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-3 flex items-center gap-3 z-50">
          <Skeleton className="h-8 w-8 rounded" />
          <div>
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="h-8 w-8 p-0 text-gray-700 hover:bg-gray-100"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Edit Body Model</h1>
            <p className="text-xs text-gray-500">Customize your measurements</p>
          </div>
        </div>

        {hasUnsavedChanges && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-600 font-medium">Unsaved changes</span>
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>

      {/* Body Viewer */}
      <div className="pt-16">
        <BodyViewer
          userResponses={userResponses}
          onComplete={handleComplete}
          onChange={() => setHasUnsavedChanges(true)}
        />
      </div>
    </div>
  )
}
