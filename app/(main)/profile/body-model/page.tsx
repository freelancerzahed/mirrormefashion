"use client"

import { useState, useEffect } from "react"
<<<<<<< HEAD
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
=======
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import BodyViewerUpdate from "@/components/body-viewer-update"

export default function EditBodyShapePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [initialUserResponses, setInitialUserResponses] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch data only once when component mounts
  useEffect(() => {
    let isMounted = true;
    
    const fetchBodyData = async () => {
      try {
        const res = await fetch(`/api/body-data`)
        // Check if response is ok
        if (!res.ok) {
          if (isMounted) {
            // Fallback to default if error
            setInitialUserResponses({
              name: "",
              age_range: "",
              gender: "female",
              bodyType: "average",
              shape_keys: {},
              slider_values: {}
            } as any)
            setLoading(false)
          }
          return;
        }
        
        const text = await res.text();
        if (!text) {
          // Handle empty response
          if (isMounted) {
            setInitialUserResponses({
              name: "",
              age_range: "",
              gender: "female",
              bodyType: "average",
              shape_keys: {},
              slider_values: {}
            } as any)
            setLoading(false)
          }
          return;
        }
        
        let result;
        try {
          result = JSON.parse(text);
        } catch (parseError) {
          if (isMounted) {
            // Fallback to default if parsing fails
            setInitialUserResponses({
              name: "",
              age_range: "",
              gender: "female",
              bodyType: "average",
              shape_keys: {},
              slider_values: {}
            } as any)
            setLoading(false)
          }
          return;
        }
        
        if (isMounted) {
          if (result.success && result.data) {
            setInitialUserResponses({
              name: "", // Name not in API response
              age_range: result.data.age,
              gender: result.data.gender,
              bodyType: result.data.shape || "average",
              // Add shape_keys and slider_values to user responses
              shape_keys: result.data.shape_keys || {},
              slider_values: result.data.slider_values || {}
            } as any)
          } else {
            // Fallback to default if no data
            setInitialUserResponses({
              name: "",
              age_range: "",
              gender: "female",
              bodyType: "average",
              shape_keys: {},
              slider_values: {}
            } as any)
          }
          setLoading(false)
        }
      } catch (error) {
        if (isMounted) {
          // Fallback to default if error
          setInitialUserResponses({
            name: "",
            age_range: "",
            gender: "female",
            bodyType: "average",
            shape_keys: {},
            slider_values: {}
          } as any)
          setLoading(false)
        }
      }
    }

    fetchBodyData()
    
    return () => {
      isMounted = false
    }
  }, [])
>>>>>>> 9098284 (body data update backend added)

  const handleComplete = async (data: {
    shape: string
    shape_keys: any
    slider_values: Record<string, number>
    alphanumeric_code: string
  }) => {
    try {
<<<<<<< HEAD
      const bodyShapeData = {
        user_id: mockUser.id,
=======
      // Prepare the body shape data
      const bodyShapeData = {
>>>>>>> 9098284 (body data update backend added)
        shape: data.shape,
        shape_keys: data.shape_keys,
        slider_values: data.slider_values,
        alphanumeric_code: data.alphanumeric_code,
<<<<<<< HEAD
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
=======
      }

      // Update body data
      const saveResponse = await fetch('/api/body-data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyShapeData),
      })

      // Handle response
      if (!saveResponse.ok) {
        throw new Error(`HTTP error! status: ${saveResponse.status}`);
      }
      
      const saveText = await saveResponse.text();
      
      // If empty response but status is OK, consider it a success
      if (!saveText) {
        toast({
          title: "Success",
          description: "Body shape updated successfully.",
        })
        router.push('/profile/shape-summary')
        return;
      }
      
      // Try to parse JSON response
      let saveResult;
      try {
        saveResult = JSON.parse(saveText);
      } catch (parseError) {
        // If we can't parse but status is OK, still consider it a success
        toast({
          title: "Success",
          description: "Body shape updated successfully.",
        })
        router.push('/profile/shape-summary')
        return;
      }
      
      // Handle success or error based on response
      if (saveResult.success) {
        toast({
          title: "Success",
          description: saveResult.message || "Body shape updated successfully.",
        })
        router.push('/profile/shape-summary')
      } else {
        throw new Error(saveResult.message || "Failed to update body shape.")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update body shape.",
        variant: "destructive",
      })
    }
  }

  if (loading || !initialUserResponses) {
    return <Skeleton className="w-full h-96" />
  }

  return (
    <BodyViewerUpdate
        userResponses={initialUserResponses}
        onComplete={handleComplete}
        onChange={() => setHasUnsavedChanges(true)}
      />
  )
}
>>>>>>> 9098284 (body data update backend added)
