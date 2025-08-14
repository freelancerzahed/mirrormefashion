"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  Star,
  TrendingUp,
  Award,
  CheckCircle,
  Globe,
  Shield,
  Rocket,
  Play,
  ChevronDown,
  Heart,
  ShoppingBag,
  Camera,
  Palette,
  Home,
  MessageCircle,
  Menu,
  Brain,
  Target,
  Lightbulb,
} from "lucide-react"
import Navbar from "@/components/navigation"
import EnhancedChatbot from "@/components/enhanced-chatbot"
import RegistrationForm from "@/components/registration-form"
import { products } from "@/data/products"
import { CustomHorizontalScrollbar } from "@/components/custom-horizontal-scrollbar"
import BodyViewer from "@/components/body-viewer"

// Mobile Bottom Navigation Component
function MobileBottomNav({
  currentSection,
  onSectionChange,
}: { currentSection: string; onSectionChange: (section: string) => void }) {
  const navItems = [
    {
      id: "hero",
      name: "Home",
      icon: Home,
      action: () => onSectionChange("hero"),
    },
    {
      id: "features",
      name: "Features",
      icon: Sparkles,
      action: () => onSectionChange("features"),
    },
    {
      id: "chat",
      name: "AI Stylist",
      icon: MessageCircle,
      action: () => onSectionChange("chat"),
    },
    {
      id: "shop",
      name: "Shop",
      icon: ShoppingBag,
      action: () => window.open("/shop", "_blank"),
    },
    {
      id: "menu",
      name: "Menu",
      icon: Menu,
      action: () => onSectionChange("beta"),
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-2xl md:hidden">
      <div className="safe-area-inset-bottom">
        <div className="grid grid-cols-5 py-0">
          {navItems.map((item) => {
            const isActive =
              currentSection === item.id ||
              (item.id === "hero" && currentSection === "hero") ||
              (item.id === "features" && currentSection === "features") ||
              (item.id === "chat" &&
                (currentSection === "chat" || currentSection === "bodyModeler" || currentSection === "registration")) ||
              (item.id === "menu" &&
                (currentSection === "beta" ||
                  currentSection === "professional" ||
                  currentSection === "retailer" ||
                  currentSection === "advertiser"))

            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`flex flex-col items-center justify-center py-2 px-1 relative transition-all duration-300 ${
                  isActive ? "text-primary-600 scale-110" : "text-gray-500 hover:text-primary-500 active:scale-95"
                }`}
              >
                <div className={`relative transition-all duration-300 ${isActive ? "transform -translate-y-1" : ""}`}>
                  <item.icon className={`h-6 w-6 transition-all duration-300 ${isActive ? "scale-110" : ""}`} />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full animate-pulse"></div>
                  )}
                </div>
                <span
                  className={`text-xs mt-1 font-medium transition-all duration-300 ${
                    isActive ? "text-primary-600 font-semibold" : "text-gray-500"
                  }`}
                >
                  {item.name}
                </span>
                {isActive && (
                  <div className="absolute inset-0 bg-primary-50 rounded-2xl -z-10 scale-75 opacity-50"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState("hero")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleSectionChange = (section: string) => {
    setCurrentSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const [userType, setUserType] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [userResponses, setUserResponses] = useState(null)
  const [showBodyModeler, setShowBodyModeler] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)
  const [isVisible, setIsVisible] = useState({})
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const featuredProducts = products.slice(0, 4)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || isMobile) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const scrollAmount = e.deltaY || e.deltaX
      container.scrollBy({
        left: scrollAmount * 2,
        behavior: "smooth",
      })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!container) return
      const sectionWidth = window.innerWidth
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          container.scrollBy({ left: -sectionWidth, behavior: "smooth" })
          break
        case "ArrowRight":
          e.preventDefault()
          container.scrollBy({ left: sectionWidth, behavior: "smooth" })
          break
      }
    }

    let startX = 0
    let startY = 0
    let isScrolling = false

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      isScrolling = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!startX || !startY) return
      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      const diffX = startX - currentX
      const diffY = startY - currentY

      if (!isScrolling) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
          isScrolling = true
          e.preventDefault()
        } else {
          return
        }
      }

      if (isScrolling) {
        e.preventDefault()
        container.scrollLeft += diffX * 0.5
        startX = currentX
      }
    }

    const handleTouchEnd = () => {
      startX = 0
      startY = 0
      isScrolling = false
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    document.addEventListener("keydown", handleKeyDown)
    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd)

    return () => {
      container.removeEventListener("wheel", handleWheel)
      document.removeEventListener("keydown", handleKeyDown)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isMobile])

  const scrollToSection = (sectionId: string) => {
    if (isMobile) {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      const section = document.getElementById(sectionId)
      if (section && scrollContainerRef.current) {
        const container = scrollContainerRef.current
        const sectionIndex = Array.from(container.children).indexOf(section)
        const scrollPosition = sectionIndex * window.innerWidth
        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        })
      }
    }
  }

  const handleUserTypeSelection = () => {
    if (!userType) {
      alert("Please select a user type")
      return
    }
    if (!agreed) {
      alert("Please agree that you are above 18 years old")
      return
    }

    switch (userType) {
      case "stylist":
      case "blogger":
      case "photographer":
      case "shopper":
      case "influencer":
        setCurrentSection("chat")
        setTimeout(() => scrollToSection("sopiaChatSection"), 500)
        break
      case "retailer":
        setCurrentSection("retailer")
        setTimeout(() => scrollToSection("retailerSection"), 500)
        break
      case "advertiser":
        setCurrentSection("advertiser")
        setTimeout(() => scrollToSection("advertiserSection"), 500)
        break
      default:
        setCurrentSection("professional")
    }
  }

  const handleChatbotComplete = (responses: any) => {
    setUserResponses(responses)
    setShowBodyModeler(true)
    setCurrentSection("bodyModeler")
    setTimeout(() => scrollToSection("bodyModelerSection"), 1000)
  }

  const handleChatbotReset = () => {
    // Reset all states when chatbot is reset
    setUserResponses(null)
    setShowBodyModeler(false)
    setShowRegistration(false)
    setCurrentSection("chat")
  }

  const handleBodyModelerComplete = () => {
    setShowRegistration(true)
    setCurrentSection("registration")
    setTimeout(() => scrollToSection("registrationSection"), 500)
  }

  const handleRegistrationSubmit = (formData: any) => {
    console.log("Registration submitted:", formData)
    alert("Welcome to Mirror Me Fashion! Your account has been created successfully! 🎉")
  }

  return (
    <div className="overflow-hidden h-screen">
      <Navbar />

      <div className="h-[calc(100vh)]">
        {/* Mobile-First Native App Design */}
        {isMobile ? (
          <>
            {/* Mobile sections with vertical scroll */}
            <div className="h-full overflow-y-auto pb-0.5 pt-1">
              {/* Modern Hero Section - Mobile */}
              <section
                id="heroSection"
                className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"
              >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* Floating Orbs */}
                  <div className="absolute top-20 right-8 w-32 h-32 bg-gradient-to-br from-primary-400/30 to-primary-300/20 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute top-40 left-6 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
                  <div className="absolute bottom-32 right-12 w-40 h-40 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>

                  {/* Geometric Shapes */}
                  <div className="absolute top-1/3 left-4 w-16 h-16 border-2 border-primary-300/30 rounded-3xl rotate-45 animate-spin-slow"></div>
                  <div className="absolute bottom-1/4 left-8 w-12 h-12 bg-gradient-to-br from-primary-400/20 to-primary-500/10 rounded-2xl rotate-12 animate-bounce-slow"></div>

                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="grid grid-cols-8 gap-4 h-full">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-white/10 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-6 safe-area-inset-top">
                  <div className="text-center text-white max-w-xs w-full">
                    {/* Status Badge */}
                    <div className="inline-flex items-center px-3 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-6 shadow-lg animate-fade-in">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs font-semibold tracking-wide">AI-Powered • Live Beta</span>
                    </div>

                    {/* Main Heading */}
                    <div className="mb-8 animate-slide-up">
                      <h1 className="text-3xl font-black mb-4 leading-tight tracking-tight">
                        Meet Your
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 animate-gradient-x">
                          AI Fashion
                        </span>
                        <span className="block">Stylist</span>
                      </h1>
                      <p className="text-base mb-3 font-light text-gray-100 leading-relaxed">
                        Discover fashion that fits your unique style
                      </p>
                      <p className="text-sm text-primary-200 opacity-90 font-medium">
                        Powered by advanced AI technology
                      </p>
                    </div>

                    {/* Interactive Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg group">
                        <div className="flex items-center justify-center mb-2">
                          <Star className="w-5 h-5 text-yellow-400 mr-1 group-hover:rotate-12 transition-transform" />
                          <span className="font-black text-lg">4.9</span>
                        </div>
                        <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider">Rating</p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg group">
                        <div className="flex items-center justify-center mb-2">
                          <Users className="w-5 h-5 text-primary-300 mr-1 group-hover:scale-110 transition-transform" />
                          <span className="font-black text-lg">50K+</span>
                        </div>
                        <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider">Users</p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg group">
                        <div className="flex items-center justify-center mb-2">
                          <Zap className="w-5 h-5 text-green-400 mr-1 group-hover:rotate-12 transition-transform" />
                          <span className="font-black text-lg">AI</span>
                        </div>
                        <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider">Powered</p>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-4 mb-8">
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3 text-lg font-bold rounded-2xl shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 group border-0 relative overflow-hidden"
                        onClick={() => handleSectionChange("features")}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Play className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Start Your Journey
                      </Button>

                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full border-2 border-white/30 text-white hover:bg-white hover:text-primary-600 py-3 text-lg font-bold rounded-2xl bg-white/10 backdrop-blur-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg group relative overflow-hidden"
                        onClick={() => handleSectionChange("features")}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Sparkles className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Explore Features
                      </Button>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="animate-bounce opacity-70">
                      <div className="flex flex-col items-center">
                        <p className="text-sm text-white/80 mb-2 font-medium">Swipe up to explore</p>
                        <ChevronDown className="w-5 h-5 text-white/60" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Modern How It Works Section - Mobile */}
              <section
                id="featuresSection"
                className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
              >
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-primary-100/60 to-primary-200/40 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-primary-200/40 to-primary-300/30 rounded-full blur-2xl"></div>

                  {/* Geometric Patterns */}
                  <div className="absolute top-1/4 right-8 w-24 h-24 border-2 border-primary-200/30 rounded-3xl rotate-45 animate-spin-slow"></div>
                  <div className="absolute bottom-1/3 left-8 w-16 h-16 bg-gradient-to-br from-primary-300/20 to-primary-400/10 rounded-2xl rotate-12 animate-bounce-slow"></div>
                </div>

                <div className="relative z-10 max-w-sm mx-auto safe-area-inset-top pt-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-50 rounded-full mb-4 shadow-sm border border-primary-200/50">
                      <Brain className="w-4 h-4 mr-2 text-primary-600" />
                      <span className="text-xs font-bold text-primary-700 uppercase tracking-wider">AI Technology</span>
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                      How Our
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400">
                        AI Fashion Advisor
                      </span>
                      <span className="block">Works</span>
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed font-medium">
                      Revolutionary AI technology that understands your unique style
                    </p>
                  </div>

                  {/* Feature Cards */}
                  <div className="space-y-4">
                    {/* Step 1 */}
                    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-xl transform hover:-translate-y-2 hover:scale-105 active:scale-95 relative overflow-hidden rounded-3xl shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 to-primary-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-sm">1</span>
                      </div>
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                            <Camera className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">Body Analysis</h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-medium">
                              Advanced AI analyzes your unique body type through intelligent conversation and visual
                              assessment with scientific precision.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Step 2 */}
                    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-xl transform hover:-translate-y-2 hover:scale-105 active:scale-95 relative overflow-hidden rounded-3xl shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-pink-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-sm">2</span>
                      </div>
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                            <Palette className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">Style Matching</h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-medium">
                              Discover your personal style through AI-powered preference learning and advanced trend
                              analysis algorithms.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Step 3 */}
                    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-xl transform hover:-translate-y-2 hover:scale-105 active:scale-95 relative overflow-hidden rounded-3xl shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-emerald-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-sm">3</span>
                      </div>
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                            <Target className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">
                              Smart Recommendations
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-medium">
                              Get personalized recommendations from global retailers that fit perfectly and enhance your
                              natural beauty.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center mt-8">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-8 py-4 text-lg font-bold rounded-3xl shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 group border-0 relative overflow-hidden"
                      onClick={() => handleSectionChange("chat")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <Lightbulb className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Try AI Stylist Now
                    </Button>
                  </div>
                </div>
              </section>

              {/* Native App Beta Section */}
              <section id="betaSection" className="min-h-screen relative overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src="/placeholder.svg?height=1080&width=1920"
                    alt="Fashion professionals"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/75 to-primary-900/85"></div>
                </div>

                <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12 safe-area-inset-top">
                  <div className="max-w-sm mx-auto text-white text-center w-full">
                    {/* Native Beta Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-xl rounded-full border border-yellow-400/30 mb-6 shadow-lg">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm font-semibold">Beta Launch Special</span>
                    </div>

                    <h1 className="text-2xl font-bold mb-4 leading-tight tracking-tight">
                      <span className="text-yellow-300 underline decoration-wavy decoration-2">Free</span> styling for{" "}
                      <span className="text-yellow-300 underline decoration-wavy decoration-2">everyone</span>
                    </h1>
                    <p className="text-lg mb-6 font-light text-gray-200">Welcome to Mirror Me Fashion Beta!</p>

                    {/* Native Feature List */}
                    <div className="space-y-3 mb-6">
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                        <div className="flex items-start">
                          <CheckCircle className="text-green-400 mr-3 w-4 h-4 flex-shrink-0 mt-1" />
                          <p className="text-sm text-left">
                            Get <span className="font-bold text-yellow-300">Free & Instant</span> fashion advice from
                            the World's <span className="font-bold text-yellow-300">First AI Stylist</span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                        <div className="flex items-start">
                          <CheckCircle className="text-green-400 mr-3 w-4 h-4 flex-shrink-0 mt-1" />
                          <p className="text-sm text-left">
                            Shop from global retailers with personalized recommendations
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                        <div className="flex items-start">
                          <CheckCircle className="text-green-400 mr-3 w-4 h-4 flex-shrink-0 mt-1" />
                          <p className="text-sm text-left">Join as a Fashion Professional to expand your business</p>
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                        <div className="flex items-start">
                          <CheckCircle className="text-green-400 mr-3 w-4 h-4 flex-shrink-0 mt-1" />
                          <p className="text-sm text-left">Grow followers & monetize your brand with AI insights</p>
                        </div>
                      </div>
                    </div>

                    {/* Native Action Buttons */}
                    <div className="space-y-3 mb-6">
                      <Button
                        size="lg"
                        className="w-full bg-white text-primary-600 hover:bg-gray-100 py-3 text-base font-semibold rounded-2xl shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 group border-0"
                        onClick={() => handleSectionChange("chat")}
                      >
                        <Heart className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                        I'm a Shopper
                      </Button>

                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full border-2 border-white/30 text-white hover:bg-white hover:text-primary-600 py-3 text-base font-semibold rounded-2xl bg-white/10 backdrop-blur-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                        onClick={() => {
                          setCurrentSection("professional")
                          setTimeout(() => scrollToSection("professionalSection"), 500)
                        }}
                      >
                        <Award className="mr-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                        I'm a Professional
                      </Button>
                    </div>

                    {/* Mobile Stats */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                        <div className="text-lg font-black text-yellow-400 mb-1 group-hover:scale-110 transition-transform">
                          50K+
                        </div>
                        <div className="text-xs font-semibold text-gray-200 uppercase tracking-wider">Users</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                        <div className="text-lg font-black text-primary-300 mb-1 group-hover:scale-110 transition-transform">
                          4.9★
                        </div>
                        <div className="text-xs font-semibold text-gray-200 uppercase tracking-wider">Rating</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                        <div className="text-lg font-black text-green-400 mb-1 group-hover:scale-110 transition-transform">
                          AI
                        </div>
                        <div className="text-xs font-semibold text-gray-200 uppercase tracking-wider">Powered</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Professional Section */}
              {currentSection === "professional" && (
                <section id="professionalSection" className="min-h-screen relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder.svg?height=1080&width=1920"
                      alt="Fashion business"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/75 to-primary-900/85"></div>
                  </div>

                  <div className="relative z-10 min-h-screen flex items-center justify-center p-6 safe-area-inset-top">
                    <div className="max-w-sm mx-auto">
                      <div className="text-white text-center mb-8">
                        <div className="inline-flex items-center px-4 py-2 bg-primary-800/50 backdrop-blur-xl rounded-full border border-primary-400/30 mb-6 shadow-lg">
                          <Rocket className="w-4 h-4 mr-2 text-primary-400" />
                          <span className="text-sm font-medium">Professional Portal</span>
                        </div>

                        <h1 className="text-3xl font-bold mb-4 tracking-tight">Mirror Me Fashion</h1>
                        <h3 className="text-xl mb-6 text-yellow-300 font-light">Discover Your Niche</h3>

                        {/* Native Feature Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                            <Zap className="text-yellow-400 mb-2 w-6 h-6 mx-auto group-hover:scale-110 transition-transform" />
                            <h4 className="font-bold text-sm mb-1">AI Power</h4>
                            <p className="text-xs text-gray-200">Advanced tech</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                            <TrendingUp className="text-yellow-400 mb-2 w-6 h-6 mx-auto group-hover:scale-110 transition-transform" />
                            <h4 className="font-bold text-sm mb-1">Growth</h4>
                            <p className="text-xs text-gray-200">Boost sales</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                            <Award className="text-yellow-400 mb-2 w-6 h-6 mx-auto group-hover:scale-110 transition-transform" />
                            <h4 className="font-bold text-sm mb-1">Premium</h4>
                            <p className="text-xs text-gray-200">Quality service</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                            <Users className="text-yellow-400 mb-2 w-6 h-6 mx-auto group-hover:scale-110 transition-transform" />
                            <h4 className="font-bold text-sm mb-1">Network</h4>
                            <p className="text-xs text-gray-200">Global reach</p>
                          </div>
                        </div>
                      </div>

                      <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-6">
                          <CardTitle className="text-xl font-bold text-center tracking-tight">Welcome!</CardTitle>
                          <p className="text-center text-sm opacity-90">What type of Fashion Professional are you?</p>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                          <Select value={userType} onValueChange={setUserType}>
                            <SelectTrigger className="h-12 text-base rounded-3xl border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm">
                              <SelectValue placeholder="Select user type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="retailer">I'm a Fashion Retailer</SelectItem>
                              <SelectItem value="influencer">I'm a Fashion Influencer</SelectItem>
                              <SelectItem value="advertiser">I'm a Fashion Advertiser</SelectItem>
                              <SelectItem value="stylist">I'm a Fashion Stylist</SelectItem>
                              <SelectItem value="blogger">I'm a Fashion Blogger</SelectItem>
                              <SelectItem value="photographer">I'm a Fashion Photographer</SelectItem>
                              <SelectItem value="other">Other Fashion Professional</SelectItem>
                            </SelectContent>
                          </Select>

                          <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-3xl">
                            <Checkbox id="agree" checked={agreed} onCheckedChange={(checked) => setAgreed(checked)} />
                            <label htmlFor="agree" className="text-gray-700 font-medium text-sm">
                              I agree that I am above 18 years old
                            </label>
                          </div>

                          <Button
                            onClick={handleUserTypeSelection}
                            className="w-full h-12 text-base font-semibold rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white border-0"
                          >
                            Complete Registration
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>
              )}

              {/* Retailer Section */}
              {currentSection === "retailer" && (
                <section id="retailerSection" className="min-h-screen relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder.svg?height=1080&width=1920"
                      alt="Fashion retail business"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/75 to-primary-900/85"></div>
                  </div>

                  <div className="relative z-10 min-h-screen flex items-center justify-center p-6 safe-area-inset-top">
                    <div className="max-w-sm mx-auto w-full">
                      <div className="text-white text-center mb-8">
                        <div className="inline-flex items-center px-4 py-2 bg-primary-800/50 backdrop-blur-xl rounded-full border border-primary-400/30 mb-6 shadow-lg">
                          <ShoppingBag className="w-4 h-4 mr-2 text-primary-400" />
                          <span className="text-sm font-medium">Retail Partnership</span>
                        </div>

                        <h1 className="text-3xl font-bold mb-4 tracking-tight">Fashion Retailer Portal</h1>
                        <p className="text-lg text-primary-100 mb-6 leading-relaxed">
                          Transform your retail business with AI-powered recommendations
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-8">
                          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                            <TrendingUp className="w-8 h-8 text-primary-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-sm">Sales Boost</h3>
                            <p className="text-xs text-primary-100">Up to 40%</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                            <Users className="w-8 h-8 text-primary-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-sm">Insights</h3>
                            <p className="text-xs text-primary-100">Deep analytics</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                            <Zap className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-sm">Integration</h3>
                            <p className="text-xs text-primary-100">Seamless API</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                            <Shield className="w-8 h-8 text-yellow-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-sm">Support</h3>
                            <p className="text-xs text-primary-100">24/7 dedicated</p>
                          </div>
                        </div>
                      </div>

                      <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-6">
                          <CardTitle className="text-xl font-bold text-center tracking-tight">
                            Join Our Network
                          </CardTitle>
                          <p className="text-center text-sm opacity-90">Start your partnership today</p>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                              placeholder="Your business name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                              placeholder="Your full name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Email</label>
                            <input
                              type="email"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                              placeholder="business@example.com"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type</label>
                            <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm">
                              <option>Select business type</option>
                              <option>Online Fashion Store</option>
                              <option>Physical Retail Store</option>
                              <option>Fashion Brand</option>
                              <option>Department Store</option>
                              <option>Boutique</option>
                            </select>
                          </div>

                          <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-3xl">
                            <Checkbox id="mobile-retailer-terms" />
                            <label htmlFor="mobile-retailer-terms" className="text-sm text-gray-700 font-medium">
                              I agree to the Terms and Privacy Policy
                            </label>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white py-3 text-base font-semibold rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-0">
                            Submit Application
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>
              )}

              {/* Advertiser Section */}
              {currentSection === "advertiser" && (
                <section id="advertiserSection" className="min-h-screen relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder.svg?height=1080&width=1920"
                      alt="Fashion advertising"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/75 to-primary-900/85"></div>
                  </div>

                  <div className="relative z-10 min-h-screen flex items-center justify-center p-6 safe-area-inset-top">
                    <div className="max-w-sm mx-auto w-full">
                      <div className="text-white text-center mb-8">
                        <div className="inline-flex items-center px-4 py-2 bg-primary-800/50 backdrop-blur-xl rounded-full border border-primary-400/30 mb-6 shadow-lg">
                          <Sparkles className="w-4 h-4 mr-2 text-primary-400" />
                          <span className="text-sm font-medium">Advertising Solutions</span>
                        </div>

                        <h1 className="text-3xl font-bold mb-4 tracking-tight">Fashion Advertiser Hub</h1>
                        <p className="text-lg text-primary-100 mb-6 leading-relaxed">
                          Reach your target audience with precision advertising
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                            <Users className="w-8 h-8 text-primary-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-sm">Targeting</h3>
                            <p className="text-xs text-primary-100">Precision reach</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                            <TrendingUp className="w-8 h-8 text-primary-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-sm">ROI</h3>
                            <p className="text-xs text-primary-100">60% better</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                            <Sparkles className="w-8 h-8 text-primary-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-sm">Creative</h3>
                            <p className="text-xs text-primary-100">Advanced tools</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                            <Award className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-sm">Analytics</h3>
                            <p className="text-xs text-primary-100">Real-time</p>
                          </div>
                        </div>

                        <div className="bg-primary-800/50 rounded-3xl p-4 border border-white/20 backdrop-blur-xl mb-8 shadow-lg">
                          <h3 className="font-bold text-lg mb-3 text-center">Performance</h3>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-primary-300 mb-1">2.5x</div>
                              <div className="text-xs text-primary-100">Higher CTR</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-primary-300 mb-1">60%</div>
                              <div className="text-xs text-primary-100">Better ROI</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-primary-300 mb-1">40%</div>
                              <div className="text-xs text-primary-100">Lower CPA</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-6">
                          <CardTitle className="text-xl font-bold text-center">Start Advertising</CardTitle>
                          <p className="text-center text-sm opacity-90">Launch your first campaign</p>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                              placeholder="Your company name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                              placeholder="Your full name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Email</label>
                            <input
                              type="email"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm"
                              placeholder="marketing@example.com"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                            <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm">
                              <option>Select your industry</option>
                              <option>Fashion Brand</option>
                              <option>Beauty & Cosmetics</option>
                              <option>Lifestyle Brand</option>
                              <option>Accessories</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Budget</label>
                            <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm">
                              <option>Select budget range</option>
                              <option>$1K - $5K</option>
                              <option>$5K - $10K</option>
                              <option>$10K - $25K</option>
                              <option>$25K+</option>
                            </select>
                          </div>

                          <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-3xl">
                            <Checkbox id="advertiser-terms" />
                            <label htmlFor="advertiser-terms" className="text-sm text-gray-700 font-medium">
                              I agree to the Advertising Terms and Privacy Policy
                            </label>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white py-3 text-base font-semibold rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-0">
                            Launch Campaign
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>
              )}

              {/* Enhanced Chat Section - Mobile */}
              {currentSection === "chat" && (
                <section
                  id="sopiaChatSection"
                  className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary-50 to-white"
                >
                  {/* Background decorations */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-25 translate-x-32 -translate-y-32 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-200 rounded-full blur-3xl opacity-25 -translate-x-32 translate-y-32 animate-pulse"></div>
                  </div>

                  <div className="relative z-10 min-h-screen flex items-center justify-center safe-area-inset-top py-1 px-2">
                    <div className="max-w-md w-full mx-auto">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-sm font-semibold text-primary-600 mb-4 shadow-sm">
                          <Sparkles className="w-4 h-4 mr-2 text-primary-600" />
                          AI-Powered Analysis
                        </div>

                        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2 tracking-tight">
                          ShapeMe®
                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                            Body Modeler
                          </span>
                        </h1>

                        <h2 className="text-lg text-gray-600 font-medium mb-4">by Mirror Me Fashion</h2>

                        <p className="text-sm text-gray-700 leading-relaxed">
                          Our AI-powered virtual stylist guides you through an intelligent conversation to understand
                          your unique body type and style preferences.
                        </p>
                      </div>

                      {/* Native Chatbot Card */}
                      <div className="p-4">
                        <EnhancedChatbot
                          onComplete={handleChatbotComplete}
                          onReset={handleChatbotReset}
                          isMobile={true}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Body Modeler Section - Mobile optimized with proper visibility */}
              {showBodyModeler && (
                <section id="bodyModelerSection" className="min-h-screen bg-gradient-to-br from-primary-100 to-white">
                  <div className="min-h-screen relative overflow-hidden">
                    {userResponses && (
                      <div className="relative z-10 min-h-screen">
                        <BodyViewer userResponses={userResponses} onComplete={handleBodyModelerComplete} />
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Registration Section */}
              {showRegistration && (
                <section id="registrationSection" className="min-h-screen bg-gradient-to-br from-primary-100 to-white">
                  <div className="min-h-screen relative overflow-hidden safe-area-inset-top">
                    {/* Background decorations */}
                    <div className="absolute inset-0">
                      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-primary-100 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-primary-200 rounded-full blur-2xl"></div>
                    </div>

                    {userResponses && (
                      <div className="relative z-10">
                        <RegistrationForm userResponses={userResponses} onSubmit={handleRegistrationSubmit} />
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>

            {/* Native Mobile Bottom Navigation */}
            <MobileBottomNav currentSection={currentSection} onSectionChange={handleSectionChange} />
          </>
        ) : (
          <>
            {/* Desktop sections with horizontal scroll */}
            <div ref={scrollContainerRef} className="flex overflow-x-hidden snap-x snap-mandatory h-full">
              {/* Modern Hero Section - Desktop */}
              <section id="heroSection" className="min-w-full h-full snap-center relative overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src="/placeholder.svg?height=1080&width=1920"
                    alt="Fashion model"
                    fill
                    className="object-cover scale-105 transition-transform duration-[20s] ease-linear hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-primary-900/60 to-primary-800/80"></div>

                  {/* Enhanced Background Elements */}
                  <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-primary-100/30 to-primary-200/20 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute bottom-32 right-32 w-56 h-56 bg-gradient-to-br from-primary-200/20 to-primary-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 rounded-full blur-xl animate-pulse delay-500"></div>

                  {/* Geometric Elements */}
                  <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-primary-300/20 rounded-3xl rotate-45 animate-spin-slow"></div>
                  <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-gradient-to-br from-primary-400/15 to-primary-500/10 rounded-2xl rotate-12 animate-bounce-slow"></div>
                </div>

                <div className="relative z-10 h-full flex items-center justify-center px-8">
                  <div className="text-center text-white max-w-5xl w-full">
                    <div className="mb-6 animate-fade-in">
                      <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-4 shadow-lg">
                        <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                        <span className="text-sm font-semibold tracking-wide">World's First AI Fashion Stylist</span>
                      </div>

                      <h1 className="text-3xl lg:text-6xl font-black mb-4 leading-tight tracking-tight">
                        Meet the Only Virtual
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-yellow-400 to-pink-400 animate-gradient-x">
                          Fashion Stylist
                        </span>
                        <span className="block text-xl lg:text-2xl font-light mt-2 text-gray-200">Powered by AI</span>
                      </h1>

                      <p className="text-lg lg:text-xl mb-8 font-light text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        Discover fashion that fits your unique body type and personal style with precision AI technology
                      </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 justify-center items-center mb-8">
                      <Button
                        size="lg"
                        className="px-8 py-4 text-lg font-bold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 group bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white relative overflow-hidden"
                        onClick={() => scrollToSection("howItWorksSection")}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        Start Your Style Journey
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>

                      <Link href="/shop">
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-2 border-white/30 text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-bold rounded-full bg-white/10 backdrop-blur-xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          Explore Collections
                          <Globe className="ml-2 w-5 h-5" />
                        </Button>
                      </Link>
                    </div>

                    <div className="flex justify-center items-center space-x-6 text-sm">
                      <div className="flex items-center bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-lg">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="font-semibold">4.9/5 Rating</span>
                      </div>
                      <div className="flex items-center bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-lg">
                        <Users className="w-4 h-4 text-primary-400 mr-2" />
                        <span className="font-semibold">50K+ Users</span>
                      </div>
                      <div className="flex items-center bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-lg">
                        <Award className="w-4 h-4 text-green-400 mr-2" />
                        <span className="font-semibold">AI Powered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Modern How It Works Section - Desktop */}
              <section
                id="howItWorksSection"
                className="min-w-full h-full snap-center relative overflow-hidden bg-gradient-to-br from-primary-50 to-white"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-100/50 to-primary-200/30 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-primary-300/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>

                  {/* Geometric Patterns */}
                  <div className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-primary-200/20 rounded-3xl rotate-45 animate-spin-slow"></div>
                  <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-primary-300/15 to-primary-400/10 rounded-2xl rotate-12 animate-bounce-slow"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 py-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center bg-gradient-to-r from-primary-100 to-primary-50 px-3 py-1.5 rounded-full mb-4 shadow-sm border border-primary-200/50">
                      <Brain className="w-4 h-4 mr-2 text-primary-600" />
                      <span className="text-xs font-bold text-primary-700 uppercase tracking-wider">
                        Revolutionary Technology
                      </span>
                    </div>

                    <h2 className="text-2xl lg:text-4xl font-black text-gray-900 mb-3 leading-tight tracking-tight">
                      How Our AI Fashion
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400">
                        Advisor Works
                      </span>
                    </h2>

                    <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                      Revolutionary AI technology that understands your body, style preferences, and lifestyle to
                      deliver personalized fashion recommendations with unprecedented accuracy.
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Step 1 */}
                    <Card className="group text-center hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-xl hover:bg-white transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden rounded-2xl shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 to-primary-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-sm">1</span>
                      </div>
                      <CardHeader className="pb-3 relative z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <Users className="w-6 h-6 text-primary-600" />
                        </div>
                        <CardTitle className="text-primary-600 text-lg font-black tracking-tight">
                          Body Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10 px-4 pb-6">
                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                          Our advanced AI analyzes your measurements and proportions through an intelligent
                          conversation, understanding your unique body type with scientific precision.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Step 2 */}
                    <Card className="group text-center hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-xl hover:bg-white transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden rounded-2xl shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-pink-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-sm">2</span>
                      </div>
                      <CardHeader className="pb-3 relative z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <Sparkles className="w-6 h-6 text-purple-600" />
                        </div>
                        <CardTitle className="text-purple-600 text-lg font-black tracking-tight">
                          Style Preferences
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10 px-4 pb-6">
                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                          Share your lifestyle, color preferences, and fashion goals. Our AI learns your unique style
                          through natural conversation and behavioral analysis.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Step 3 */}
                    <Card className="group text-center hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-xl hover:bg-white transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden rounded-2xl shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-emerald-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-sm">3</span>
                      </div>
                      <CardHeader className="pb-3 relative z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <Zap className="w-6 h-6 text-green-600" />
                        </div>
                        <CardTitle className="text-green-600 text-lg font-black tracking-tight">
                          Smart Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10 px-4 pb-6">
                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                          Receive curated fashion recommendations that fit perfectly and enhance your natural beauty
                          with AI precision and real-time trend analysis.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center">
                    <Button
                      size="lg"
                      className="px-8 py-3 text-lg font-bold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 group bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white relative overflow-hidden"
                      onClick={() => {
                        setCurrentSection("chat")
                        setTimeout(() => scrollToSection("sopiaChatSection"), 500)
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      Try Our AI Stylist Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </section>

              {/* Modern Beta Section - Desktop */}
              <section id="betaSection" className="min-w-full h-full snap-center relative overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src="/placeholder.svg?height=1080&width=1920"
                    alt="Fashion professionals"
                    fill
                    className="object-cover scale-105 transition-transform duration-[20s] ease-linear"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/75 to-primary-900/85"></div>

                  {/* Enhanced Background Elements */}
                  <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-yellow-500/15 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-primary-200/20 to-primary-300/15 rounded-full blur-2xl animate-pulse delay-1000"></div>

                  {/* Geometric Elements */}
                  <div className="absolute top-1/3 right-1/3 w-32 h-32 border-2 border-yellow-400/20 rounded-3xl rotate-45 animate-spin-slow"></div>
                  <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-primary-400/15 to-primary-500/10 rounded-2xl rotate-12 animate-bounce-slow"></div>
                </div>

                <div className="relative z-10 h-full flex items-center justify-center px-4 py-8">
                  <div className="max-w-6xl mx-auto text-white text-center h-full flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-xl rounded-full border border-yellow-400/30 mb-4 shadow-lg">
                        <Star className="w-4 h-4 mr-2 text-yellow-400" />
                        <span className="text-sm font-bold tracking-wide">Beta Launch Special</span>
                      </div>

                      <h1 className="text-3xl lg:text-5xl font-black mb-4 leading-tight tracking-tight">
                        <span className="text-yellow-300 underline decoration-wavy decoration-4">Free</span> styling
                        help for <span className="text-yellow-300 underline decoration-wavy decoration-4">all</span>{" "}
                        unique body types
                      </h1>

                      <p className="text-lg lg:text-xl mb-6 font-light text-gray-200 leading-relaxed">
                        Welcome to Mirror Me Fashion Beta!
                      </p>
                    </div>

                    {/* Enhanced Feature Grid */}
                    <div className="grid lg:grid-cols-2 gap-4 mb-8 text-left max-w-5xl mx-auto">
                      <div className="space-y-3">
                        <div className="flex items-start bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                            <CheckCircle className="text-white w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold mb-1 text-yellow-300">World's First AI Stylist</h3>
                            <p className="text-sm font-medium">
                              Get <span className="font-bold text-yellow-300">Free & Instant fashion</span> advice from
                              the World's <span className="font-bold text-yellow-300">First and Only</span> Virtual
                              Fashion Stylist
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-primary-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                            <Globe className="text-white w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold mb-1 text-primary-300">Global Shopping</h3>
                            <p className="text-sm">
                              Shop fashion retailers across the globe with personalized recommendations tailored to your
                              style
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                            <TrendingUp className="text-white w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold mb-1 text-purple-300">Business Growth</h3>
                            <p className="text-sm">
                              Join as a Fashion Professional to expand your fashion business reach and connect with new
                              customers
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                            <Rocket className="text-white w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold mb-1 text-orange-300">AI-Powered Insights</h3>
                            <p className="text-sm">
                              Grow followers & monetize your brand with AI-powered insights and advanced analytics
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced CTA Buttons */}
                    <div className="flex flex-col lg:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-6">
                      <Button
                        size="lg"
                        className="w-full lg:w-auto bg-gradient-to-r from-white to-gray-100 text-primary-600 hover:from-gray-100 hover:to-white px-6 py-3 text-lg font-bold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
                        onClick={() => {
                          setCurrentSection("chat")
                          setTimeout(() => scrollToSection("sopiaChatSection"), 500)
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-50/0 via-primary-50/50 to-primary-50/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Heart className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform text-red-500" />
                        I'm a Shopper
                      </Button>

                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full lg:w-auto border-2 border-white/40 text-white hover:bg-white hover:text-primary-600 px-6 py-3 text-lg font-bold rounded-full bg-white/10 backdrop-blur-xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden shadow-lg"
                        onClick={() => {
                          setCurrentSection("professional")
                          setTimeout(() => scrollToSection("professionalSection"), 500)
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Award className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform text-yellow-400" />
                        I'm a Fashion Professional
                      </Button>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                        <div className="text-2xl font-black text-yellow-400 mb-1 group-hover:scale-110 transition-transform">
                          50K+
                        </div>
                        <div className="text-xs font-semibold text-gray-200 uppercase tracking-wider">Active Users</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                        <div className="text-2xl font-black text-primary-300 mb-1 group-hover:scale-110 transition-transform">
                          4.9★
                        </div>
                        <div className="text-xs font-semibold text-gray-200 uppercase tracking-wider">User Rating</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg">
                        <div className="text-2xl font-black text-green-400 mb-1 group-hover:scale-110 transition-transform">
                          AI
                        </div>
                        <div className="text-xs font-semibold text-gray-200 uppercase tracking-wider">Powered</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Enhanced Professional Section */}
              {currentSection === "professional" && (
                <section id="professionalSection" className="min-w-full h-full snap-center relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder.svg?height=1080&width=1920"
                      alt="Fashion business"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-primary-900/80"></div>
                  </div>

                  <div className="relative z-10 h-full flex items-center justify-center px-8">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
                      <div className="text-white">
                        <div className="mb-6">
                          <h1 className="text-2xl lg:text-3xl font-bold mb-4">Mirror Me Fashion</h1>
                          <h3 className="text-lg mb-6 text-yellow-300 font-light">Discover Your Niche</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <Zap className="text-yellow-400 mb-2 w-6 h-6" />
                            <h4 className="font-bold text-base mb-1">Powerful AI</h4>
                            <p className="text-sm text-gray-200">Advanced technology</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <TrendingUp className="text-yellow-400 mb-2 w-6 h-6" />
                            <h4 className="font-bold text-base mb-1">Streamlined</h4>
                            <p className="text-sm text-gray-200">Efficient services</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <Award className="text-yellow-400 mb-2 w-6 h-6" />
                            <h4 className="font-bold text-base mb-1">Increase Sales</h4>
                            <p className="text-sm text-gray-200">Boost revenue</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <Users className="text-yellow-400 mb-2 w-6 h-6" />
                            <h4 className="font-bold text-base mb-1">Monetize</h4>
                            <p className="text-sm text-gray-200">Your following</p>
                          </div>
                        </div>
                      </div>

                      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-6">
                          <CardTitle className="text-xl font-bold text-center">Welcome!</CardTitle>
                          <p className="text-center text-base opacity-90">What type of Fashion Professional are you?</p>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                          <Select value={userType} onValueChange={setUserType}>
                            <SelectTrigger className="h-12 text-base rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                              <SelectValue placeholder="Select user type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="retailer">I'm a Fashion Retailer</SelectItem>
                              <SelectItem value="influencer">I'm a Fashion Influencer</SelectItem>
                              <SelectItem value="advertiser">I'm a Fashion Advertiser</SelectItem>
                              <SelectItem value="stylist">I'm a Fashion Stylist</SelectItem>
                              <SelectItem value="blogger">I'm a Fashion Blogger</SelectItem>
                              <SelectItem value="photographer">I'm a Fashion Photographer</SelectItem>
                              <SelectItem value="other">Other Fashion Professional</SelectItem>
                            </SelectContent>
                          </Select>

                          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-xl">
                            <Checkbox id="agree" checked={agreed} onCheckedChange={(checked) => setAgreed(checked)} />
                            <label htmlFor="agree" className="text-gray-700 font-medium text-sm">
                              I agree that I am above 18 years old
                            </label>
                          </div>

                          <Button
                            onClick={handleUserTypeSelection}
                            className="w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white"
                          >
                            Complete Registration
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>
              )}

              {/* Enhanced Retailer Section */}
              {currentSection === "retailer" && (
                <section id="retailerSection" className="min-w-full h-full snap-center relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder.svg?height=1080&width=1920"
                      alt="Fashion retail business"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-primary-900/80"></div>

                    {/* Floating elements */}
                    <div className="absolute top-20 right-20 w-40 h-40 bg-primary-200 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-20 left-20 w-32 h-32 bg-primary-100 rounded-full blur-xl animate-pulse delay-1000"></div>
                  </div>

                  <div className="relative z-10 h-full flex items-center justify-center px-8">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
                      <div className="text-white">
                        <div className="mb-6">
                          <div className="inline-flex items-center px-3 py-2 bg-primary-800/50 backdrop-blur-sm rounded-full border border-primary-400/30 mb-4">
                            <Rocket className="w-4 h-4 mr-2 text-primary-400" />
                            <span className="text-sm font-medium">Retail Partnership</span>
                          </div>

                          <h1 className="text-2xl lg:text-3xl font-bold mb-4">Fashion Retailer Portal</h1>
                          <p className="text-lg text-primary-100 mb-6 leading-relaxed">
                            Transform your retail business with AI-powered fashion recommendations and unlock
                            unprecedented growth
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                            <TrendingUp className="w-8 h-8 text-primary-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-base mb-1">Increase Sales</h3>
                            <p className="text-sm text-primary-100">Up to 40% boost in revenue</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                            <Users className="w-8 h-8 text-primary-300 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-base mb-1">Customer Insights</h3>
                            <p className="text-sm text-primary-100">Deep analytics & behavior</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                            <Zap className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-base mb-1">Easy Integration</h3>
                            <p className="text-sm text-primary-100">Seamless API connection</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                            <Shield className="w-8 h-8 text-yellow-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-base mb-1">Premium Support</h3>
                            <p className="text-sm text-primary-100">24/7 dedicated assistance</p>
                          </div>
                        </div>
                      </div>

                      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-6">
                          <CardTitle className="text-xl font-bold text-center">Join Our Network</CardTitle>
                          <p className="text-center text-base opacity-90">Start your partnership journey today</p>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                            <input
                              type="text"
                              className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                              placeholder="Your business name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person</label>
                            <input
                              type="text"
                              className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                              placeholder="Your full name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Email</label>
                            <input
                              type="email"
                              className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                              placeholder="business@example.com"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type</label>
                            <select className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200">
                              <option>Select business type</option>
                              <option>Online Fashion Store</option>
                              <option>Physical Retail Store</option>
                              <option>Fashion Brand</option>
                              <option>Department Store</option>
                              <option>Boutique</option>
                            </select>
                          </div>

                          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-xl">
                            <Checkbox id="desktop-retailer-terms" />
                            <label htmlFor="desktop-retailer-terms" className="text-sm text-gray-700 font-medium">
                              I agree to the Terms and Privacy Policy
                            </label>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            Submit Application
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>
              )}

              {/* Enhanced Advertiser Section */}
              {currentSection === "advertiser" && (
                <section id="advertiserSection" className="min-w-full h-full snap-center relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder.svg?height=1080&width=1920"
                      alt="Fashion advertising"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-primary-900/80"></div>
                  </div>

                  <div className="relative z-10 h-full flex items-center justify-center px-8">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
                      <div className="text-white">
                        <div className="mb-6">
                          <div className="inline-flex items-center px-3 py-2 bg-primary-800/50 backdrop-blur-sm rounded-full border border-primary-400/30 mb-4">
                            <Sparkles className="w-4 h-4 mr-2 text-primary-400" />
                            <span className="text-sm font-medium">Advertising Solutions</span>
                          </div>

                          <h1 className="text-2xl lg:text-3xl font-bold mb-4">Fashion Advertiser Hub</h1>
                          <p className="text-lg text-primary-100 mb-6 leading-relaxed">
                            Reach your target audience with precision-targeted fashion advertising and maximize your
                            campaign ROI
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                            <Users className="w-8 h-8 text-primary-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-base mb-1">Targeted Reach</h3>
                            <p className="text-sm text-primary-100">Precision audience targeting</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                            <TrendingUp className="w-8 h-8 text-primary-300 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-base mb-1">Higher ROI</h3>
                            <p className="text-sm text-primary-100">60% better performance</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                            <Sparkles className="w-8 h-8 text-primary-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-base mb-1">Creative Tools</h3>
                            <p className="text-sm text-primary-100">Advanced campaign builder</p>
                          </div>

                          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                            <Award className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-base mb-1">Real-time Analytics</h3>
                            <p className="text-sm text-primary-100">Live performance tracking</p>
                          </div>
                        </div>

                        <div className="bg-primary-800/50 rounded-2xl p-4 border border-white/20 backdrop-blur-sm">
                          <h3 className="font-bold text-lg mb-3 text-center">Campaign Performance</h3>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-primary-300 mb-1">2.5x</div>
                              <div className="text-sm text-primary-100">Higher CTR</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-primary-300 mb-1">60%</div>
                              <div className="text-sm text-primary-100">Better ROI</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-primary-300 mb-1">40%</div>
                              <div className="text-sm text-primary-100">Lower CPA</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-6">
                          <CardTitle className="text-xl font-bold text-center">Start Advertising</CardTitle>
                          <p className="text-center text-base opacity-90">Launch your first campaign</p>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                            <input
                              type="text"
                              className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                              placeholder="Your company name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person</label>
                            <input
                              type="text"
                              className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                              placeholder="Your full name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Email</label>
                            <input
                              type="email"
                              className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                              placeholder="marketing@example.com"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                            <select className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200">
                              <option>Select your industry</option>
                              <option>Fashion Brand</option>
                              <option>Beauty & Cosmetics</option>
                              <option>Lifestyle Brand</option>
                              <option>Accessories</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Budget</label>
                            <select className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200">
                              <option>Select budget range</option>
                              <option>$1K - $5K</option>
                              <option>$5K - $10K</option>
                              <option>$10K - $25K</option>
                              <option>$25K+</option>
                            </select>
                          </div>

                          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-xl">
                            <Checkbox id="advertiser-terms" />
                            <label htmlFor="advertiser-terms" className="text-sm text-gray-700 font-medium">
                              I agree to the Advertising Terms and Privacy Policy
                            </label>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            Launch Campaign
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>
              )}

              {/* Enhanced Chat Section - Fixed height issues for desktop */}
              {currentSection === "chat" && (
                <section
                  id="sopiaChatSection"
                  className="min-w-full h-full snap-center relative overflow-hidden bg-gradient-to-br from-primary-50 to-white"
                >
                  {/* Background decorations */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 translate-x-48 -translate-y-48"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-30 -translate-x-48 translate-y-48"></div>
                  </div>

                  {/* Fixed height container for desktop chat */}
                  <div className="relative z-10 h-full flex items-center justify-center px-6 py-8 min-h-0">
                    <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-[1fr_2fr] gap-6 items-center h-full min-h-0">
                      {/* Left: Compact Text Content */}
                      <div className="text-center lg:text-left space-y-4">
                        <div className="inline-flex items-center bg-primary-100 px-3 py-1 rounded-full text-xs font-semibold text-primary-600 mx-auto lg:mx-0">
                          <Sparkles className="w-3 h-3 mr-2 text-primary-600" />
                          AI-Powered Analysis
                        </div>

                        <h1 className="text-xl lg:text-2xl font-extrabold text-gray-900 leading-tight">
                          ShapeMe®
                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                            Body Modeler
                          </span>
                        </h1>

                        <h2 className="text-sm lg:text-base text-gray-600 font-medium">by Mirror Me Fashion</h2>

                        <p className="text-xs lg:text-sm text-gray-700 leading-relaxed max-w-md">
                          Our AI-powered virtual stylist guides you through an intelligent conversation to understand
                          your unique body type and style preferences.
                        </p>

                        <div className="hidden lg:block pt-2">
                          <div className="relative w-fit mx-auto lg:mx-0">
                            <Image
                              src="/placeholder.svg?height=200&width=150"
                              alt="3D body shapes"
                              width={150}
                              height={200}
                              className="rounded-xl shadow-lg"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: Full-height Chatbot with proper constraints */}
                      <div className="flex justify-center h-full min-h-0">
                        <div className="w-full max-w-2xl h-full flex flex-col min-h-0" style={{ maxHeight: "100vh" }}>
                          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-2xl h-full flex flex-col min-h-0">
                            <div className="p-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-center flex-shrink-0">
                              <h3 className="text-lg font-bold">Start Your Journey</h3>
                              <p className="text-sm opacity-90">Let's discover your perfect style together</p>
                            </div>
                            <div className="flex-1 min-h-0 overflow-hidden">
                              <EnhancedChatbot
                                onComplete={handleChatbotComplete}
                                onReset={handleChatbotReset}
                                isMobile={false}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Enhanced Body Modeler Section - Desktop 2-column layout */}
              {showBodyModeler && (
                <section
                  id="bodyModelerSection"
                  className="min-w-full h-full snap-center bg-gradient-to-br from-primary-100 to-white"
                >
                  <div className="h-full relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute inset-0">
                      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary-200 rounded-full blur-2xl"></div>
                    </div>

                    {userResponses && (
                      <div className="relative z-10 h-full">
                        <BodyViewer userResponses={userResponses} onComplete={handleBodyModelerComplete} />
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Enhanced Registration Section */}
              {showRegistration && (
                <section
                  id="registrationSection"
                  className="min-w-full h-full snap-center bg-gradient-to-br from-primary-100 to-white"
                >
                  <div className="h-full relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute inset-0">
                      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-primary-100 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-primary-200 rounded-full blur-2xl"></div>
                    </div>

                    {userResponses && (
                      <div className="relative z-10">
                        <RegistrationForm userResponses={userResponses} onSubmit={handleRegistrationSubmit} />
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
            <CustomHorizontalScrollbar scrollContainerRef={scrollContainerRef} />
          </>
        )}
      </div>
    </div>
  )
}
