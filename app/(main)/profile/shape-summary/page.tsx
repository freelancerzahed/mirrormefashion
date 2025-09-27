"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import FriendSuggestions from "@/components/friend-suggestions"
import AiAssistant from "@/components/ai-assistant"
import {
  User,
  Ruler,
  Target,
  TrendingUp,
  RotateCcw,
  Info,
  Shirt,
  Crown,
  Footprints,
  Weight,
  Activity,
  EyeOff,
  Eye,
} from "lucide-react"

// Mock user data - in real app this would come from API/database
const mockUserData = {
  name: "Sarah Johnson",
  avatar: "/placeholder.svg?height=100&width=100",
  // Basic Information
  shapeClassification: "Hourglass",
  ageRange: "25-30",
  gender: "Female",
  bmi: 23.0,

  // Body Data
  height: 168,
  weight: 65,
  shoeSize: "8.5",
  bustSize: "36C",
  hatSize: "Medium",

  // Shape Summary
  shapeSummary:
    "Your hourglass body shape is characterized by balanced bust and hip measurements with a well-defined waist. This classic silhouette is considered one of the most proportionate body types, with curves that create an elegant, feminine outline. Your measurements show excellent symmetry between your upper and lower body, making you naturally suited for a wide variety of clothing styles.",

  // Closet Essentials
  closetEssentials: [
    {
      id: 1,
      name: "Wrap Dresses",
      description:
        "Perfect for accentuating your waist while flattering your curves. The wrap style creates a beautiful silhouette that enhances your natural proportions.",
      image: "/elegant-wrap-dress.jpg",
    },
    {
      id: 2,
      name: "High-Waisted Bottoms",
      description:
        "Emphasize your waistline with high-waisted jeans, trousers, and skirts. These pieces highlight your narrowest point and create an elongated leg line.",
      image: "/high-waisted-jeans.png",
    },
    {
      id: 3,
      name: "Fitted Blazers",
      description:
        "Structured blazers that nip in at the waist will complement your shape beautifully. Look for styles with defined shoulders and a tailored fit through the torso.",
      image: "/fitted-blazer.jpg",
    },
    {
      id: 4,
      name: "Belt Accessories",
      description:
        "Wide and medium-width belts are your best friends. Use them to cinch dresses, tops, and cardigans to showcase your waist and create definition.",
      image: "/leather-belt-accessories.jpg",
    },
  ],
}

console.log(" Shape Summary page is loading...")
 // Placeholder function for adding friends on the dashboard page
  const handleAddFriend = (userId: string) => {
    console.log(`Attempting to add friend with ID: ${userId} from Dashboard.`)
    // In a real application, you would dispatch an action or call an API here
    // For now, we'll just log it. The actual removal from suggestions happens in FriendSuggestions.
  }
const DummyBodyModel = ({ shapeType }: { shapeType: string }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="200" height="350" viewBox="0 0 200 350" className="text-gray-400" fill="currentColor">
        {/* Head */}
        <ellipse cx="100" cy="40" rx="25" ry="30" fill="#e5e7eb" />

        {/* Neck */}
        <rect x="90" y="65" width="20" height="15" fill="#e5e7eb" />

        {/* Torso - Hourglass shape */}
        <path
          d="M 70 80 Q 60 120 65 160 Q 70 200 80 240 L 120 240 Q 130 200 135 160 Q 140 120 130 80 Z"
          fill="#f3f4f6"
          stroke="#d1d5db"
          strokeWidth="2"
        />

        {/* Arms */}
        <ellipse cx="50" cy="130" rx="12" ry="40" fill="#e5e7eb" />
        <ellipse cx="150" cy="130" rx="12" ry="40" fill="#e5e7eb" />

        {/* Legs */}
        <rect x="80" y="240" width="15" height="80" fill="#e5e7eb" />
        <rect x="105" y="240" width="15" height="80" fill="#e5e7eb" />

        {/* Feet */}
        <ellipse cx="87" cy="330" rx="15" ry="8" fill="#d1d5db" />
        <ellipse cx="113" cy="330" rx="15" ry="8" fill="#d1d5db" />

        {/* Shape indicator text */}
        <text x="100" y="300" textAnchor="middle" className="text-xs fill-gray-600" fontSize="12">
          {shapeType}
        </text>
      </svg>
    </div>
  )
}

export default function ShapeSummaryPage() {
  console.log("[v0] ShapeSummaryPage component is rendering...")

  const [showMeasurements, setShowMeasurements] = useState(true)

  const handleResetBodyModel = () => {
    window.location.href = "/profile/body-model"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
    
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 lg:h-24 lg:w-24 border-4 border-white shadow-lg">
                <AvatarImage src={mockUserData.avatar || "/placeholder.svg"} alt={mockUserData.name} />
                <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white text-2xl font-bold">
                  {mockUserData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Your Summary</h1>
                <p className="text-gray-600 text-lg">Complete body shape profile and styling recommendations</p>
                <div className="flex items-center gap-3 mt-3">
                  <Badge variant="secondary" className="bg-red-100 text-red-700 px-3 py-1">
                    {mockUserData.shapeClassification} Shape
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-200 px-3 py-1">
                    Profile Complete
                  </Badge>
                </div>
              </div>
            </div>

            <Button onClick={handleResetBodyModel} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg">
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset Body Model
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
           <div className="lg:col-span-3">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg sticky top-8">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-red-600" />
                      Your Body Model
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
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 min-h-[400px] h-[600px] flex items-center justify-center">
                  <DummyBodyModel shapeType={mockUserData.shapeClassification} />
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Body Shape</div>
                    <div className="font-semibold text-gray-900">{mockUserData.shapeClassification}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-8">

              {/* AI Assistant */}
                    <AiAssistant />
            
                    {/* Friend Suggestions */}
                    <FriendSuggestions onAddFriend={handleAddFriend} />
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <User className="w-6 h-6 text-red-600" />
                  Basic Information
                </CardTitle>
                <CardDescription>Your fundamental body shape characteristics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Shape Classification</div>
                    <div className="text-lg font-semibold text-gray-900">{mockUserData.shapeClassification}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Age Range</div>
                    <div className="text-lg font-semibold text-gray-900">{mockUserData.ageRange}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Gender</div>
                    <div className="text-lg font-semibold text-gray-900">{mockUserData.gender}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">BMI</div>
                    <div className="text-lg font-semibold text-green-600">{mockUserData.bmi}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Ruler className="w-6 h-6 text-red-600" />
                  Body Data
                </CardTitle>
                <CardDescription>Your detailed measurements and sizing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-700">Height</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{mockUserData.height} cm</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Weight className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-700">Weight</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{mockUserData.weight} kg</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Footprints className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-700">Shoe Size</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{mockUserData.shoeSize}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shirt className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-700">Bust Size</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {mockUserData.gender === "Male" ? "N/A" : mockUserData.bustSize}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Crown className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-700">Hat Size</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {mockUserData.gender === "Male" ? "N/A" : mockUserData.hatSize}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Target className="w-6 h-6 text-red-600" />
                  Shape Summary
                </CardTitle>
                <CardDescription>Detailed analysis of your body shape and proportions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100">
                  <p className="text-gray-700 leading-relaxed text-lg">{mockUserData.shapeSummary}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-red-600" />
                      Closet Essentials
                    </CardTitle>
                    <CardDescription>Key pieces that will flatter your body shape perfectly</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  {mockUserData.closetEssentials.map((item) => (
                    <div key={item.id} className="group">
                      <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.name}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="px-8 py-3 bg-transparent" asChild>
            <Link href="/profile/body-model/edit">
              <Info className="w-5 h-5 mr-2" />
              Edit Profile
            </Link>
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3" asChild>
            <Link href="/shop">
              <Shirt className="w-5 h-5 mr-2" />
              Shop Recommendations
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
