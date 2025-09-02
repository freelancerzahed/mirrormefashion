"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

 
import {
  User,
  Edit3,
  Ruler,
  Target,
  TrendingUp,
  Heart,
  Share2,
  Download,
  RotateCcw,
  Zap,
  Calendar,
  Activity,
  Info,
  Settings,
  Eye,
  EyeOff,
  ArrowLeft,
  Copy,
  Facebook,
  Twitter,
  Instagram,
  Mail,
} from "lucide-react"
import BodyViewer from "@/components/body-viewer"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock user data - in real app this would come from API/database
const mockUserData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  createdAt: "2024-01-15",
  lastUpdated: "2024-01-20",
  bodyType: "Hourglass",
  confidence: 92,
  measurements: {
    height: 168,
    weight: 65,
    bust: 36,
    waist: 26,
    hips: 36,
    shoulders: 38,
  },
  bmi: 23.0,
  bodyFat: 22,
  muscleMass: 45,
}

const mockUserResponses = {
  gender: "female" as const,
  name: "Sarah Johnson",
  age_range: "25-34",
  height: 168,
  weight: 65,
  bmi: "23.0",
  shoeSize: {
    size: 8,
    category: "US Women's",
  },
  braSize: {
    vol: "C",
    band: "34",
  },
}

export default function BodyShapePage() {
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [showMeasurements, setShowMeasurements] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [isFavorited, setIsFavorited] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)

  const handleEditComplete = () => {
    setIsEditing(false)
    toast({
      title: "Model Updated",
      description: "Your body model has been successfully updated.",
    })
  }

  const handleBackFromEdit = () => {
    setIsEditing(false)
  }

  const handleShare = () => {
    setShareDialogOpen(true)
  }

  const handleSharePlatform = async (platform: string) => {
    const url = window.location.href
    const text = `Check out my 3D body model on MirrorMe Fashion! ${mockUserData.bodyType} shape with ${mockUserData.confidence}% accuracy.`

    try {
      switch (platform) {
        case "copy":
          await navigator.clipboard.writeText(url)
          toast({
            title: "Link Copied",
            description: "The link has been copied to your clipboard.",
          })
          break
        case "facebook":
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
          break
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            "_blank",
          )
          break
        case "instagram":
          // Instagram doesn't support direct URL sharing, so we copy the text
          await navigator.clipboard.writeText(text)
          toast({
            title: "Text Copied",
            description: "Share text copied! You can paste it in your Instagram post.",
          })
          break
        case "email":
          window.location.href = `mailto:?subject=My 3D Body Model&body=${encodeURIComponent(text + "\n\n" + url)}`
          break
        default:
          break
      }
      setShareDialogOpen(false)
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Unable to share. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDownload = async () => {
    try {
      // Simulate downloading body model data
      const modelData = {
        user: mockUserData.name,
        bodyType: mockUserData.bodyType,
        measurements: mockUserData.measurements,
        confidence: mockUserData.confidence,
        createdAt: mockUserData.createdAt,
        lastUpdated: mockUserData.lastUpdated,
        bmi: mockUserData.bmi,
        bodyFat: mockUserData.bodyFat,
        muscleMass: mockUserData.muscleMass,
      }

      const dataStr = JSON.stringify(modelData, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)

      const link = document.createElement("a")
      link.href = url
      link.download = `${mockUserData.name.replace(/\s+/g, "_")}_body_model.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Export Successful",
        description: "Your body model data has been downloaded.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to export data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSaveToFavorites = () => {
    setIsFavorited(!isFavorited)
    toast({
      title: isFavorited ? "Removed from Favorites" : "Added to Favorites",
      description: isFavorited
        ? "Your body model has been removed from favorites."
        : "Your body model has been saved to favorites.",
    })
  }

  const handleResetToAI = () => {
    toast({
      title: "Model Reset",
      description: "Your body model has been reset to AI analysis.",
    })
  }

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 relative">
        {/* Back Button Header */}
        <div className="fixed top-10 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-3 flex items-center gap-3 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackFromEdit}
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

        {/* Body Viewer with top padding for header */}
        <div className="pt-0 md:pt-10">
          <BodyViewer userResponses={mockUserResponses} onComplete={handleEditComplete} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 lg:h-20 lg:w-20">
                <AvatarImage src={mockUserData.avatar || "/placeholder.svg"} alt={mockUserData.name} />
                <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white text-xl font-bold">
                  {mockUserData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Your 3D Body Model</h1>
                <p className="text-gray-600 mt-1">Created on {new Date(mockUserData.createdAt).toLocaleDateString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-red-100 text-red-700">
                    {mockUserData.bodyType} Shape
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {mockUserData.confidence}% Accuracy
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setIsEditing(true)} className="bg-red-600 hover:bg-red-700 text-white">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Model
              </Button>

              <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share Your Body Model</DialogTitle>
                    <DialogDescription>Share your 3D body model with friends and family</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleSharePlatform("copy")}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSharePlatform("facebook")}
                      className="flex items-center gap-2"
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSharePlatform("twitter")}
                      className="flex items-center gap-2"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSharePlatform("instagram")}
                      className="flex items-center gap-2"
                    >
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSharePlatform("email")}
                      className="flex items-center gap-2 col-span-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D Model Viewer */}
          <div className="lg:col-span-2">
            <Card className="h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-red-600" />
                      3D Body Model
                    </CardTitle>
                    <CardDescription>Interactive visualization of your body measurements</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowMeasurements(!showMeasurements)}>
                    {showMeasurements ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 min-h-[500px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-12 h-12 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">3D Model Preview</h3>
                    <p className="text-gray-600 mb-4">Your personalized 3D body model based on AI analysis</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-white rounded-lg p-3">
                        <div className="font-semibold text-red-600">{mockUserData.measurements.bust}"</div>
                        <div className="text-gray-500">Bust</div>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="font-semibold text-red-600">{mockUserData.measurements.waist}"</div>
                        <div className="text-gray-500">Waist</div>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="font-semibold text-red-600">{mockUserData.measurements.hips}"</div>
                        <div className="text-gray-500">Hips</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="w-5 h-5 text-red-600" />
                  Body Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{mockUserData.measurements.height}cm</div>
                    <div className="text-sm text-gray-600">Height</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{mockUserData.measurements.weight}kg</div>
                    <div className="text-sm text-gray-600">Weight</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">BMI</span>
                    <span className="text-sm font-bold text-green-600">{mockUserData.bmi}</span>
                  </div>
                  <Progress value={75} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Body Fat</span>
                    <span className="text-sm font-bold text-blue-600">{mockUserData.bodyFat}%</span>
                  </div>
                  <Progress value={mockUserData.bodyFat * 2} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Muscle Mass</span>
                    <span className="text-sm font-bold text-purple-600">{mockUserData.muscleMass}%</span>
                  </div>
                  <Progress value={mockUserData.muscleMass * 2} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Info className="w-5 h-5 text-red-600" />
                  Detailed Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="measurements" className="text-xs">
                      Measurements
                    </TabsTrigger>
                    <TabsTrigger value="analysis" className="text-xs">
                      Analysis
                    </TabsTrigger>
                    <TabsTrigger value="history" className="text-xs">
                      History
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="measurements" className="mt-4 space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Bust</span>
                        <span className="font-medium">{mockUserData.measurements.bust}"</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Waist</span>
                        <span className="font-medium">{mockUserData.measurements.waist}"</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Hips</span>
                        <span className="font-medium">{mockUserData.measurements.hips}"</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Shoulders</span>
                        <span className="font-medium">{mockUserData.measurements.shoulders}"</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="analysis" className="mt-4 space-y-3">
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-red-600" />
                          <span className="font-medium text-red-900">Body Type Analysis</span>
                        </div>
                        <p className="text-sm text-red-700">
                          You have an {mockUserData.bodyType.toLowerCase()} body shape with balanced proportions. This
                          shape is characterized by similar bust and hip measurements with a defined waist.
                        </p>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-900">Recommendations</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Based on your body type, we recommend clothing that emphasizes your waist and creates balanced
                          silhouettes.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="mt-4 space-y-3">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">Model Created</div>
                          <div className="text-xs text-gray-600">
                            {new Date(mockUserData.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Edit3 className="w-4 h-4 text-gray-600" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">Last Updated</div>
                          <div className="text-xs text-gray-600">
                            {new Date(mockUserData.lastUpdated).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Zap className="w-4 h-4 text-gray-600" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">AI Analysis</div>
                          <div className="text-xs text-gray-600">{mockUserData.confidence}% confidence score</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="w-5 h-5 text-red-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Measurements
                </Button>

                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleResetToAI}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset to AI Analysis
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={handleSaveToFavorites}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                  {isFavorited ? "Remove from Favorites" : "Save to Favorites"}
                </Button>

                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Model
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-red-600" />
                Understanding Your Body Model
              </CardTitle>
              <CardDescription>
                Learn more about how your 3D body model was created and how to use it effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Your model was created using advanced AI algorithms that analyze your measurements and proportions.
                  </p>
                </div>

                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Personalized Recommendations</h3>
                  <p className="text-sm text-gray-600">
                    Use your model to get personalized fashion recommendations that fit your unique body type.
                  </p>
                </div>

                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Continuous Improvement</h3>
                  <p className="text-sm text-gray-600">
                    Your model learns and improves over time as you provide feedback and update measurements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
