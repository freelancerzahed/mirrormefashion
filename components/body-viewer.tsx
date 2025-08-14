"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  User,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  Zap,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Settings,
  X,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface UserResponses {
  gender: string
  name: string
  age_range: string
  height: number
  weight: number
  bmi: string
  shoeSize: {
    size: number
    category: string
  }
  braSize: {
    vol: string
    band: string
  }
}

interface BodyViewerProps {
  userResponses: UserResponses
  onComplete: () => void
}

interface BodyPreset {
  id: string
  name: string
  description: string
  measurements: {
    bust: number
    waist: number
    hips: number
    shoulders: number
    torsoLength: number
    legLength: number
    neckWidth: number
    armLength: number
  }
  bodyType: string
}

const bodyPresets: BodyPreset[] = [
  {
    id: "pear",
    name: "Pear Shape",
    description: "Hips wider than shoulders",
    measurements: {
      bust: 34,
      waist: 28,
      hips: 38,
      shoulders: 36,
      torsoLength: 24,
      legLength: 32,
      neckWidth: 13,
      armLength: 24,
    },
    bodyType: "pear",
  },
  {
    id: "apple",
    name: "Apple Shape",
    description: "Fuller midsection",
    measurements: {
      bust: 38,
      waist: 34,
      hips: 36,
      shoulders: 38,
      torsoLength: 22,
      legLength: 30,
      neckWidth: 14,
      armLength: 23,
    },
    bodyType: "apple",
  },
  {
    id: "hourglass",
    name: "Hourglass",
    description: "Balanced bust and hips",
    measurements: {
      bust: 36,
      waist: 26,
      hips: 36,
      shoulders: 36,
      torsoLength: 23,
      legLength: 31,
      neckWidth: 13,
      armLength: 24,
    },
    bodyType: "hourglass",
  },
  {
    id: "rectangle",
    name: "Rectangle",
    description: "Similar measurements",
    measurements: {
      bust: 34,
      waist: 32,
      hips: 34,
      shoulders: 34,
      torsoLength: 24,
      legLength: 30,
      neckWidth: 13,
      armLength: 23,
    },
    bodyType: "rectangle",
  },
  {
    id: "inverted-triangle",
    name: "Inverted Triangle",
    description: "Shoulders wider than hips",
    measurements: {
      bust: 38,
      waist: 30,
      hips: 34,
      shoulders: 40,
      torsoLength: 23,
      legLength: 31,
      neckWidth: 14,
      armLength: 25,
    },
    bodyType: "inverted-triangle",
  },
]

const bodyPartGroups: Record<string, { icon: string; label: string; measurements: (keyof Measurements)[] }> = {
  head: {
    icon: "🧠",
    label: "Head",
    measurements: ["headSize", "faceWidth"],
  },
  neck: {
    icon: "🦒",
    label: "Neck",
    measurements: ["neckWidth", "neckHeight"],
  },
  shoulders: {
    icon: "🤷",
    label: "Shoulders",
    measurements: ["shoulders", "shoulderSlope"],
  },
  torso: {
    icon: "👕",
    label: "Torso",
    measurements: ["bust", "waist", "torsoLength", "backCurve"],
  },
  arms: {
    icon: "💪",
    label: "Arms",
    measurements: ["armLength", "bicepSize", "forearmSize"],
  },
  legs: {
    icon: "🦵",
    label: "Legs",
    measurements: ["hips", "legLength", "thighSize", "calfSize"],
  },
}

type Measurements = {
  headSize: number
  faceWidth: number
  neckWidth: number
  neckHeight: number
  shoulders: number
  shoulderSlope: number
  bust: number
  waist: number
  torsoLength: number
  backCurve: number
  armLength: number
  bicepSize: number
  forearmSize: number
  hips: number
  legLength: number
  thighSize: number
  calfSize: number
}

// Enhanced Tick Slider Component with brand colors
interface TickSliderProps {
  id: string
  value: number
  min: number
  max: number
  step: number
  ticks: number
  onChange: (value: number) => void
  name: string
  label: string
}

const TickSlider: React.FC<TickSliderProps> = ({ id, value, min, max, step, ticks, onChange, name, label }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [thumbPosition, setThumbPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Calculate tick positions and values
  const tickValues = Array.from({ length: ticks }, (_, i) => {
    return min + (i * (max - min)) / (ticks - 1)
  })

  useEffect(() => {
    if (trackRef.current) {
      const percentage = ((value - min) / (max - min)) * 100
      setThumbPosition(percentage)
    }
  }, [value, min, max])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number.parseFloat(e.target.value)
      onChange(newValue)
    },
    [onChange],
  )

  const handleTickClick = useCallback(
    (tickValue: number) => {
      onChange(tickValue)
    },
    [onChange],
  )

  const tickElements = tickValues.map((tickValue, i) => {
    const position = (i / (ticks - 1)) * 100
    const isActive = Math.abs(value - tickValue) < step / 2

    return (
      <div
        key={i}
        className={`slider-tick ${isActive ? "slider-tick-active" : ""}`}
        style={{ left: `${position}%` }}
        onClick={() => handleTickClick(tickValue)}
        title={`${tickValue.toFixed(1)}`}
      />
    )
  })

  return (
    <div className="slider-container">
      <div className="slider-track-container" ref={trackRef}>
        <div className="slider-track" />
        <div className="slider-filled-track" style={{ width: `${thumbPosition}%` }} />
        <div className="slider-start-circle" />
        <div className="slider-ticks-container">{tickElements}</div>
        <div
          className={`slider-thumb ${isDragging ? "slider-thumb-dragging" : ""}`}
          style={{ left: `${thumbPosition}%` }}
        />
        <input
          id={id}
          className="slider-input"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          name={name}
          onChange={handleInputChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
        />
      </div>
      <div className="slider-value-display">
        <span className="text-xs text-gray-500">{min}</span>
        <span className="text-xs font-medium text-red-600">{value.toFixed(1)}"</span>
        <span className="text-xs text-gray-500">{max}</span>
      </div>
    </div>
  )
}

export default function BodyViewer({ userResponses, onComplete }: BodyViewerProps) {
  const [measurements, setMeasurements] = useState<Measurements>({
    headSize: 22.0,
    faceWidth: 6.5,
    neckWidth: 13.0,
    neckHeight: 4.5,
    shoulders: 38.0,
    shoulderSlope: 2.0,
    bust: 36.0,
    waist: 28.0,
    torsoLength: 24.0,
    backCurve: 1.5,
    armLength: 24.0,
    bicepSize: 11.0,
    forearmSize: 9.5,
    hips: 38.0,
    legLength: 32.0,
    thighSize: 22.0,
    calfSize: 14.0,
  })

  const [showPresets, setShowPresets] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [bodyType, setBodyType] = useState("")
  const [showMeasurements, setShowMeasurements] = useState(true)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    head: true,
    neck: false,
    shoulders: false,
    torso: false,
    arms: false,
    legs: false,
  })

  // Track top bar visibility
  const [showTopBar, setShowTopBar] = useState(true)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useIsMobile()

  // Listen for top bar visibility changes
  useEffect(() => {
    const handleTopBarChange = (event: CustomEvent) => {
      setShowTopBar(event.detail.visible)
    }

    window.addEventListener("topBarVisibilityChange", handleTopBarChange as EventListener)

    return () => {
      window.removeEventListener("topBarVisibilityChange", handleTopBarChange as EventListener)
    }
  }, [])

  // Initialize with AI analysis
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false)

      const heightFactor = (userResponses?.height || 66) / 66
      const weightFactor = (userResponses?.weight || 140) / 140

      setMeasurements({
        headSize: Math.round((21 + heightFactor * 2) * 10) / 10,
        faceWidth: Math.round((6 + weightFactor * 1) * 10) / 10,
        neckWidth: Math.round((12 + weightFactor * 2) * 10) / 10,
        neckHeight: Math.round((4 + heightFactor * 1) * 10) / 10,
        shoulders: Math.round((36 + heightFactor * 2) * 10) / 10,
        shoulderSlope: Math.round((1.5 + weightFactor * 0.5) * 10) / 10,
        bust: Math.round((32 + weightFactor * 6 + heightFactor * 2) * 10) / 10,
        waist: Math.round((26 + weightFactor * 4 + heightFactor * 1) * 10) / 10,
        torsoLength: Math.round((22 + heightFactor * 3) * 10) / 10,
        backCurve: Math.round((1 + weightFactor * 1) * 10) / 10,
        armLength: Math.round((22 + heightFactor * 3) * 10) / 10,
        bicepSize: Math.round((10 + weightFactor * 2) * 10) / 10,
        forearmSize: Math.round((9 + weightFactor * 1.5) * 10) / 10,
        hips: Math.round((34 + weightFactor * 6 + heightFactor * 2) * 10) / 10,
        legLength: Math.round((28 + heightFactor * 4) * 10) / 10,
        thighSize: Math.round((20 + weightFactor * 3) * 10) / 10,
        calfSize: Math.round((13 + weightFactor * 2) * 10) / 10,
      })

      // Determine body type (simple heuristic)
      const bust = 32 + weightFactor * 6 + heightFactor * 2
      const waist = 26 + weightFactor * 4 + heightFactor * 1
      const hips = 34 + weightFactor * 6 + heightFactor * 2

      if (hips > bust + 2) setBodyType("Pear")
      else if (bust > hips + 2) setBodyType("Inverted Triangle")
      else if (Math.abs(bust - hips) <= 2 && waist < bust - 6) setBodyType("Hourglass")
      else if (waist >= bust - 4) setBodyType("Apple")
      else setBodyType("Rectangle")
    }, 600)

    return () => clearTimeout(timer)
  }, [userResponses])

  // 2D Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Responsive sizing
    const deviceWidth = typeof window !== "undefined" ? window.innerWidth : 400
    const maxWidth = isMobile ? Math.min(480, deviceWidth) : 400
    const aspect = 1.2
    canvas.width = maxWidth
    canvas.height = Math.round(maxWidth * aspect)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw body silhouette
    const centerX = canvas.width / 2
    const startY = 40

    // Proportions
    const bustWidth = (measurements.bust / 40) * (canvas.width * 0.2)
    const waistWidth = (measurements.waist / 40) * (canvas.width * 0.2)
    const hipWidth = (measurements.hips / 40) * (canvas.width * 0.22)
    const shoulderWidth = (measurements.shoulders / 40) * (canvas.width * 0.22)
    const torsoHeight = (measurements.torsoLength / 30) * (canvas.height * 0.32)
    const legHeight = (measurements.legLength / 35) * (canvas.height * 0.45)
    const headSize = (measurements.headSize / 25) * (canvas.width * 0.06)
    const neckWidth = (measurements.neckWidth / 15) * (canvas.width * 0.04)

    // Brand color gradient
    const gradient = ctx.createLinearGradient(centerX - 100, 0, centerX + 100, 0)
    gradient.addColorStop(0, "#dc2626") // red-600
    gradient.addColorStop(0.5, "#f87171") // red-400
    gradient.addColorStop(1, "#fca5a5") // red-300

    ctx.fillStyle = gradient
    ctx.strokeStyle = "#b91c1c" // red-700
    ctx.lineWidth = 2

    // Outline
    ctx.beginPath()

    // Head
    ctx.arc(centerX, startY + 30, headSize, 0, Math.PI * 2)

    // Neck
    ctx.moveTo(centerX - neckWidth / 2, startY + 55)
    ctx.lineTo(centerX - neckWidth / 2, startY + 65)
    ctx.lineTo(centerX + neckWidth / 2, startY + 65)
    ctx.lineTo(centerX + neckWidth / 2, startY + 55)

    // Shoulders
    ctx.moveTo(centerX - shoulderWidth / 2, startY + 65)
    ctx.lineTo(centerX + shoulderWidth / 2, startY + 65)

    // Torso
    ctx.moveTo(centerX - shoulderWidth / 2, startY + 65)
    ctx.quadraticCurveTo(centerX - bustWidth / 2, startY + 100, centerX - waistWidth / 2, startY + torsoHeight)
    ctx.quadraticCurveTo(
      centerX - hipWidth / 2,
      startY + torsoHeight + 40,
      centerX - hipWidth / 2,
      startY + torsoHeight + 60,
    )

    // Legs
    ctx.lineTo(centerX - 15, startY + torsoHeight + legHeight)
    ctx.lineTo(centerX + 15, startY + torsoHeight + legHeight)
    ctx.lineTo(centerX + hipWidth / 2, startY + torsoHeight + 60)

    // Right side up
    ctx.quadraticCurveTo(
      centerX + hipWidth / 2,
      startY + torsoHeight + 40,
      centerX + waistWidth / 2,
      startY + torsoHeight,
    )
    ctx.quadraticCurveTo(centerX + bustWidth / 2, startY + 100, centerX + shoulderWidth / 2, startY + 65)

    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Measurement indicators
    if (showMeasurements) {
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])

      // Bust
      ctx.beginPath()
      ctx.moveTo(centerX - bustWidth / 2 - 10, startY + 100)
      ctx.lineTo(centerX + bustWidth / 2 + 10, startY + 100)
      ctx.stroke()

      // Waist
      ctx.beginPath()
      ctx.moveTo(centerX - waistWidth / 2 - 10, startY + torsoHeight)
      ctx.lineTo(centerX + waistWidth / 2 + 10, startY + torsoHeight)
      ctx.stroke()

      // Hips
      ctx.beginPath()
      ctx.moveTo(centerX - hipWidth / 2 - 10, startY + torsoHeight + 60)
      ctx.lineTo(centerX + hipWidth / 2 + 10, startY + torsoHeight + 60)
      ctx.stroke()

      ctx.setLineDash([])
    }
  }, [measurements, showMeasurements, isMobile])

  const handleMeasurementChange = (key: keyof Measurements, value: number) => {
    setMeasurements((prev) => ({ ...prev, [key]: value }))
    setSelectedPreset(null)
  }

  const applyPreset = (preset: BodyPreset) => {
    setMeasurements((prev) => ({
      ...prev,
      bust: preset.measurements.bust,
      waist: preset.measurements.waist,
      hips: preset.measurements.hips,
      shoulders: preset.measurements.shoulders,
      torsoLength: preset.measurements.torsoLength,
      legLength: preset.measurements.legLength,
      neckWidth: preset.measurements.neckWidth,
      armLength: preset.measurements.armLength,
    }))
    setSelectedPreset(preset.id)
    setBodyType(preset.name)
    setShowPresets(false)
  }

  const resetToAI = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      const heightFactor = (userResponses?.height || 66) / 66
      const weightFactor = (userResponses?.weight || 140) / 140

      setMeasurements({
        headSize: Math.round((21 + heightFactor * 2) * 10) / 10,
        faceWidth: Math.round((6 + weightFactor * 1) * 10) / 10,
        neckWidth: Math.round((12 + weightFactor * 2) * 10) / 10,
        neckHeight: Math.round((4 + heightFactor * 1) * 10) / 10,
        shoulders: Math.round((36 + heightFactor * 2) * 10) / 10,
        shoulderSlope: Math.round((1.5 + weightFactor * 0.5) * 10) / 10,
        bust: Math.round((32 + weightFactor * 6 + heightFactor * 2) * 10) / 10,
        waist: Math.round((26 + weightFactor * 4 + heightFactor * 1) * 10) / 10,
        torsoLength: Math.round((22 + heightFactor * 3) * 10) / 10,
        backCurve: Math.round((1 + weightFactor * 1) * 10) / 10,
        armLength: Math.round((22 + heightFactor * 3) * 10) / 10,
        bicepSize: Math.round((10 + weightFactor * 2) * 10) / 10,
        forearmSize: Math.round((9 + weightFactor * 1.5) * 10) / 10,
        hips: Math.round((34 + weightFactor * 6 + heightFactor * 2) * 10) / 10,
        legLength: Math.round((28 + heightFactor * 4) * 10) / 10,
        thighSize: Math.round((20 + weightFactor * 3) * 10) / 10,
        calfSize: Math.round((13 + weightFactor * 2) * 10) / 10,
      })
      setSelectedPreset(null)
    }, 600)
  }

  const getMeasurementConfig = (key: keyof Measurements) => {
    const configs: Record<keyof Measurements, { min: number; max: number; ticks: number }> = {
      headSize: { min: 18, max: 26, ticks: 9 },
      faceWidth: { min: 5, max: 8, ticks: 7 },
      neckWidth: { min: 10, max: 16, ticks: 7 },
      neckHeight: { min: 3, max: 6, ticks: 7 },
      shoulders: { min: 32, max: 44, ticks: 13 },
      shoulderSlope: { min: 0.5, max: 3.5, ticks: 7 },
      bust: { min: 28, max: 44, ticks: 17 },
      waist: { min: 22, max: 38, ticks: 17 },
      torsoLength: { min: 18, max: 30, ticks: 13 },
      backCurve: { min: 0.5, max: 3.5, ticks: 7 },
      armLength: { min: 18, max: 30, ticks: 13 },
      bicepSize: { min: 8, max: 16, ticks: 9 },
      forearmSize: { min: 7, max: 13, ticks: 7 },
      hips: { min: 30, max: 46, ticks: 17 },
      legLength: { min: 26, max: 38, ticks: 13 },
      thighSize: { min: 16, max: 28, ticks: 13 },
      calfSize: { min: 10, max: 18, ticks: 9 },
    }
    return configs[key]
  }

  const toggleSection = useCallback((sectionId: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }, [])

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Analyzing Your Body Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-gray-600">
              <p className="mb-4">Our AI is creating your personalized body model...</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Processing measurements</span>
                  <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Calculating proportions</span>
                  <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Drawing model</span>
                  <div className="w-6 h-6 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Mobile-optimized UI/UX with proper top bar handling
  if (isMobile) {
    // Calculate heights based on top bar visibility
    const topBarHeight = showTopBar ? "6rem" : "4rem" // Navigation height
    const viewerHeight = showTopBar ? "calc(100vh - 6rem - 200px)" : "calc(100vh - 4rem - 200px)" // Account for bottom buttons
    const controlsHeight = showTopBar ? "calc(100vh - 6rem - 42vh - 160px)" : "calc(100vh - 4rem - 42vh - 160px)"

    return (
      <div className="flex flex-col h-screen bg-gray-50" style={{ paddingTop: topBarHeight }}>
        {/* Top Viewer */}
        <div className="relative bg-gradient-to-b from-gray-100 to-gray-200" style={{ height: "42vh" }}>
          <canvas ref={canvasRef} className="w-full h-full block" style={{ touchAction: "none" }} />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
              {bodyType || "Body Type"}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 px-2 bg-white/90 text-gray-900 hover:bg-white"
              onClick={() => setShowMeasurements(!showMeasurements)}
              aria-label={showMeasurements ? "Hide measurements" : "Show measurements"}
            >
              {showMeasurements ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          {/* Quick key measurements overlay */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="px-2 py-1 rounded-full bg-white/90 text-xs shadow-sm">
              Bust {measurements.bust.toFixed(1)}"
            </div>
            <div className="px-2 py-1 rounded-full bg-white/90 text-xs shadow-sm">
              Waist {measurements.waist.toFixed(1)}"
            </div>
            <div className="px-2 py-1 rounded-full bg-white/90 text-xs shadow-sm">
              Hips {measurements.hips.toFixed(1)}"
            </div>
          </div>
        </div>

        {/* Controls container */}
        <div className="flex-1 flex flex-col bg-white border-t border-gray-200 overflow-hidden">
          {/* Compact Header */}
          <div className="bg-white border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetToAI}
                  className="h-8 w-8 p-0 text-gray-700"
                  title="AI Reset"
                  aria-label="AI Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPresets(true)}
                  className="h-8 w-8 p-0 text-gray-700"
                  title="Presets"
                  aria-label="Open presets"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Collapsible Body Sections - Fixed height to ensure buttons are visible */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ height: controlsHeight }}>
            {Object.entries(bodyPartGroups).map(([key, group]) => (
              <Collapsible key={key} open={openSections[key]} onOpenChange={() => toggleSection(key)}>
                <CollapsibleTrigger asChild>
                  <div
                    className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                      openSections[key] ? "bg-red-50 border border-red-200" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl" aria-hidden="true">
                        {group.icon}
                      </span>
                      <span className="font-medium text-gray-900">{group.label}</span>
                    </div>
                    {openSections[key] ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-2">
                  <div className="p-3 rounded-lg bg-white border border-gray-200 space-y-4">
                    {group.measurements.map((measurementKey) => {
                      const value = measurements[measurementKey]
                      const config = getMeasurementConfig(measurementKey)
                      const label = `${String(measurementKey)
                        .replace(/([A-Z])/g, " $1")
                        .trim()}`
                      return (
                        <div key={measurementKey} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label
                              className="text-sm font-medium text-gray-700 capitalize"
                              htmlFor={`slider-${measurementKey}`}
                            >
                              {label}
                            </label>
                            <Badge variant="outline" className="text-xs bg-red-50 text-red-600 border-red-200">
                              {value.toFixed(1)}"
                            </Badge>
                          </div>
                          <TickSlider
                            id={`slider-${measurementKey}`}
                            label={label}
                            value={value}
                            min={config.min}
                            max={config.max}
                            step={0.1}
                            ticks={config.ticks}
                            onChange={(newValue) => handleMeasurementChange(measurementKey, newValue)}
                            name={String(measurementKey)}
                          />
                        </div>
                      )
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {/* Fixed Bottom Actions - Always visible */}
          <div className="sticky bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 flex-shrink-0 shadow-lg z-50 mb-16">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={resetToAI}
                className="flex-1 h-12 bg-transparent border-red-200 text-red-600 hover:bg-red-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Body Rear
              </Button>
              <Button
                onClick={onComplete}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 h-12 text-white font-medium"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </div>
          </div>
        </div>

        {/* Presets Modal */}
        {showPresets && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="w-full sm:max-w-sm bg-white rounded-t-2xl sm:rounded-xl max-h-[85vh] overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between bg-white">
                <div>
                  <h3 className="font-semibold text-gray-900">Body Shape Presets</h3>
                  <p className="text-xs text-gray-500">Pick a base, then fine-tune measurements</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowPresets(false)} aria-label="Close presets">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-3 space-y-2 overflow-y-auto">
                {bodyPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors flex items-center gap-3 ${
                      selectedPreset === preset.id ? "bg-red-50 border-red-200" : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{preset.name}</div>
                      <div className="text-xs text-gray-500">{preset.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .slider-container {
            width: 100%;
            margin: 0.5rem 0;
            box-sizing: border-box;
          }
          .slider-track-container {
            position: relative;
            height: 1.5rem;
            margin: 0.3rem 0;
            padding: 0.3rem 0;
            box-sizing: border-box;
          }
          .slider-track {
            position: absolute;
            top: 50%;
            width: 100%;
            height: 0.15rem;
            background-color: #e5e7eb;
            border-radius: 0.1rem;
            transform: translateY(-50%);
          }
          .slider-filled-track {
            position: absolute;
            top: 50%;
            height: 0.15rem;
            background: linear-gradient(90deg, #dc2626, #f87171);
            border-radius: 0.1rem;
            transform: translateY(-50%);
            transition: width 0.2s ease;
          }
          .slider-start-circle {
            position: absolute;
            top: 50%;
            left: 0;
            width: 0.4rem;
            height: 0.4rem;
            background-color: #dc2626;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
          }
          .slider-ticks-container {
            position: absolute;
            top: 50%;
            width: 100%;
            height: 0.15rem;
            transform: translateY(-50%);
            pointer-events: none;
          }
          .slider-tick {
            position: absolute;
            top: 50%;
            width: 0.3rem;
            height: 0.3rem;
            background-color: #dc2626;
            border: 1px solid #b91c1c;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            pointer-events: all;
            transition: all 0.15s ease;
            z-index: 2;
          }
          .slider-tick:hover {
            background-color: #b91c1c;
            border-color: #991b1b;
            transform: translate(-50%, -50%) scale(1.15);
          }
          .slider-tick-active {
            background-color: #f87171;
            border-color: #f87171;
            transform: translate(-50%, -50%) scale(1.2);
            box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.3);
          }
          .slider-thumb {
            position: absolute;
            top: 50%;
            width: 0.9rem;
            height: 0.9rem;
            background: linear-gradient(135deg, #dc2626, #f87171);
            border: 0.15rem solid white;
            border-radius: 50%;
            box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.2);
            transform: translate(-50%, -50%);
            transition: all 0.15s ease;
            pointer-events: none;
            z-index: 4;
          }
          .slider-thumb-dragging {
            transform: translate(-50%, -50%) scale(1.12);
            box-shadow: 0 0.2rem 0.6rem rgba(220, 38, 38, 0.35);
          }
          .slider-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            margin: 0;
            z-index: 5;
            -webkit-appearance: none;
            appearance: none;
          }
          .slider-input:focus ~ .slider-thumb {
            box-shadow: 0 0 0 0.15rem rgba(220, 38, 38, 0.25);
          }
        `}</style>
      </div>
    )
  }

  // Desktop layout - Completely redesigned to work within the home page layout
  return (
    <div className="w-full h-full bg-gray-50">
      <div className="flex h-full">
        {/* Left Panel - Controls */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col h-full">
          {/* Header */}
          <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-red-600 to-red-500 text-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold">Body Modeler</h1>
                <p className="text-sm opacity-90">Fine-tune your 3D model</p>
              </div>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  onClick={() => setShowMeasurements(!showMeasurements)}
                  aria-label={showMeasurements ? "Hide measurements" : "Show measurements"}
                >
                  {showMeasurements ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex-shrink-0 leading-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{userResponses.name}</h3>
                  <p className="text-sm text-gray-600">
                    {bodyType} • {userResponses.age_range}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowPresets(!showPresets)}
                className="flex items-center gap-2 h-8 text-xs border-red-200 text-red-600 hover:bg-red-50"
              >
                <Zap className="w-3 h-3" />
                Presets
                {showPresets ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </Button>
            </div>
          </div>

          {/* Quick Presets - Collapsible */}
          {showPresets && (
            <div className="p-3 bg-red-50 border-b border-red-200 flex-shrink-0">
              <div className="space-y-2">
                <h4 className="font-medium text-red-600 text-sm">Quick Body Shape Presets</h4>
                <div className="grid grid-cols-2 gap-2">
                  {bodyPresets.slice(0, 4).map((preset) => (
                    <Button
                      key={preset.id}
                      size="sm"
                      variant={selectedPreset === preset.id ? "default" : "outline"}
                      onClick={() => applyPreset(preset)}
                      className={`h-8 text-xs p-2 ${
                        selectedPreset === preset.id
                          ? "bg-red-600 text-white"
                          : "border-red-200 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      {preset.name.split(" ")[0]}
                    </Button>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPresets(false)}
                  className="w-full h-6 text-xs text-red-600 hover:bg-red-100"
                >
                  <ChevronUp className="w-3 h-3 mr-1" />
                  Hide Presets
                </Button>
              </div>
            </div>
          )}

          {/* Body Part Tabs - Use remaining space */}
          <div className="flex-1 min-h-0 flex flex-col">
            <Tabs defaultValue="head" className="h-full flex flex-col leading-3">
              <TabsList className="grid w-full grid-cols-6 m-3 mb-0 h-12 gap-1 flex-shrink-0">
                {Object.entries(bodyPartGroups).map(([key, group]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex flex-col items-center gap-1 py-1 px-1 text-xs border-0 font-medium min-h-[44px] bg-gray-50 data-[state=active]:bg-red-100"
                  >
                    <span className="text-sm">{group.icon}</span>
                    <span className="text-[10px] leading-tight">{group.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Scrollable Content - Use remaining space minus button area */}
              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pb-20">
                {Object.entries(bodyPartGroups).map(([groupKey, group]) => (
                  <TabsContent key={groupKey} value={groupKey} className="p-3 space-y-4 m-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{group.icon}</span>
                        <h3 className="font-semibold text-gray-900">{group.label} Controls</h3>
                      </div>
                      <Button size="sm" variant="outline" onClick={resetToAI} className="h-8 text-xs bg-transparent">
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Reset
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {group.measurements.map((measurementKey) => {
                        const value = measurements[measurementKey]
                        const config = getMeasurementConfig(measurementKey)
                        const label = `${String(measurementKey)
                          .replace(/([A-Z])/g, " $1")
                          .trim()}`
                        return (
                          <div key={measurementKey} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <label
                                className="text-sm font-medium text-gray-700 capitalize"
                                htmlFor={`slider-${measurementKey}`}
                              >
                                {label}
                              </label>
                              <Badge variant="outline" className="text-xs bg-red-50 text-red-600 border-red-200">
                                {value.toFixed(1)}"
                              </Badge>
                            </div>
                            <TickSlider
                              id={`slider-${measurementKey}`}
                              label={label}
                              value={value}
                              min={config.min}
                              max={config.max}
                              step={0.1}
                              ticks={config.ticks}
                              onChange={(newValue) => handleMeasurementChange(measurementKey, newValue)}
                              name={String(measurementKey)}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>

          {/* Fixed Action Buttons at Bottom */}
          <div className="absolute bottom-0 left-0 w-1/3 border-t border-gray-200 bg-white flex-shrink-0 shadow-lg z-20 p-[45px] px-[5px]">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={resetToAI}
                className="flex-1 h-12 bg-transparent border-red-200 text-red-600 hover:bg-red-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Body Rear
              </Button>
              <Button
                onClick={onComplete}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 h-12 text-white font-medium"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Viewer */}
        <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center h-full">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your Body Model</h2>
              <Badge variant="secondary" className="bg-gradient-to-r from-red-100 to-red-100 text-red-600">
                {bodyType} Shape
              </Badge>
            </div>

            <div className="relative bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200">
              <canvas ref={canvasRef} className="w-full h-auto max-w-sm mx-auto" style={{ minHeight: "500px" }} />

              {showMeasurements && (
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Bust:</span>
                    <span className="font-medium">{measurements.bust.toFixed(1)}"</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waist:</span>
                    <span className="font-medium">{measurements.waist.toFixed(1)}"</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hips:</span>
                    <span className="font-medium">{measurements.hips.toFixed(1)}"</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-3">Adjust measurements on the left to fine-tune your model</p>
              <div className="flex justify-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowPresets(!showPresets)}
                  className="h-8 border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Presets
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetToAI}
                  className="h-8 bg-transparent border-red-200 text-red-600 hover:bg-red-50"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  AI Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
