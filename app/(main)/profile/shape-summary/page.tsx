"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { User, Eye, EyeOff, RotateCcw, Info } from "lucide-react"
import { modelLoader } from "@/lib/modelLoader"

// Mock user data
const mockUserData = {
  name: "Sarah Johnson",
  avatar: "/placeholder.svg?height=100&width=100",
  shapeClassification: "Hourglass",
  ageRange: "25-30",
  gender: "Female",
  bmi: 23.0,
  height: 168,
  weight: 65,
  shoeSize: "8.5",
  bustSize: "36C",
  hatSize: "Medium",
  shapeSummary:
    "Your hourglass body shape is characterized by balanced bust and hip measurements with a well-defined waist. Your measurements show excellent symmetry between your upper and lower body.",
}

export default function ShapeSummaryPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const modelRef = useRef<any>(null)

  const [THREE, setTHREE] = useState<typeof import("three") | null>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [showMeasurements, setShowMeasurements] = useState(true)
  const [loadingKeys, setLoadingKeys] = useState(true)

  // Shape keys state
  const [shapeKeys, setShapeKeys] = useState<Record<string, number>>({})

  // Dynamically load Three.js
  useEffect(() => {
    const loadThree = async () => {
      try {
        const threeModule = await import("three")
        setTHREE(threeModule)
      } catch (error) {
        console.error("Failed to load Three.js:", error)
      }
    }
    loadThree()
  }, [])

  // Fetch shape keys from API
  useEffect(() => {
    const fetchShapeKeys = async () => {
      try {
        const res = await fetch(`/api/body-data`)
        const data = await res.json()
        if (data.success && data.shapeKeys) {
          setShapeKeys(data.shapeKeys)
        } else {
          setShapeKeys({ Waist_Small: 0.4, Hips_Wide: 0.6 }) // fallback dummy keys
        }
      } catch (err) {
        console.error("Failed to fetch shape keys, using dummy:", err)
        setShapeKeys({ Waist_Small: 0.4, Hips_Wide: 0.6 })
      } finally {
        setLoadingKeys(false)
      }
    }
    fetchShapeKeys()
  }, [])

  // Apply shape keys
  const updateModelWithShapeKeys = (keys: Record<string, number>) => {
    if (!modelRef.current || !THREE) return
    modelRef.current.traverse((child: any) => {
      if (!(child instanceof THREE.Mesh)) return
      if (!child.morphTargetDictionary || !child.morphTargetInfluences) return
      Object.entries(keys).forEach(([key, value]) => {
        const index = child.morphTargetDictionary[key]
        if (index !== undefined) {
          child.morphTargetInfluences[index] = value
        }
      })
    })
    console.log("Shape keys applied:", keys)
  }

  // Load 3D model
  useEffect(() => {
    if (!canvasRef.current || !THREE) return

    const modelPath = "/models/female_average.glb"
    const { dispose, loadPromise, scene } = modelLoader(canvasRef.current, modelPath, 1.0, "bodyRearBtn")

    loadPromise
      ?.then(() => {
        if (!scene) return
        modelRef.current = scene
        setModelLoaded(true)
        updateModelWithShapeKeys(shapeKeys) // apply once loaded
      })
      .catch((err) => console.error("Failed to load model:", err))

    return () => dispose?.()
  }, [THREE])

  // Update when shapeKeys change
  useEffect(() => {
    if (!modelLoaded) return
    updateModelWithShapeKeys(shapeKeys)
  }, [shapeKeys, modelLoaded])

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column: Model */}
          <div className="lg:col-span-3">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg sticky top-8">
              <CardHeader className="pb-4 flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-red-600" /> Your Body Model
                  </CardTitle>
                  <CardDescription>3D visualization of your measurements</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowMeasurements(!showMeasurements)}>
                    {showMeasurements ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 min-h-[400px] h-[600px] flex items-center justify-center relative">
                  <canvas ref={canvasRef} className="w-full h-auto max-w-sm mx-auto" style={{ minHeight: "500px" }} />
                  {!THREE && <p className="absolute text-gray-500">Loading 3D engine...</p>}
                  {THREE && !modelLoaded && <p className="absolute text-gray-500">3D model is loading...</p>}
                  {THREE && modelLoaded && loadingKeys && <p className="absolute text-gray-500">Applying shape keys...</p>}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 flex items-center gap-2"
                    onClick={() => console.log("Edit model clicked")}
                  >
                    <Info className="w-5 h-5" /> Edit Model
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Shape Summary */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Shape Summary</CardTitle>
                <CardDescription>{mockUserData.shapeSummary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Shape Classification:</strong> {mockUserData.shapeClassification}</p>
                  <p><strong>Age Range:</strong> {mockUserData.ageRange}</p>
                  <p><strong>Gender:</strong> {mockUserData.gender}</p>
                  <p><strong>BMI:</strong> {mockUserData.bmi}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
