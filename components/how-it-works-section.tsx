"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Brain, Users, Sparkles, Zap, ArrowRight } from "lucide-react"

interface HowItWorksSectionProps {
  onSectionChange: (section: string) => void
  scrollToSection: (sectionId: string) => void
}

export default function HowItWorksSection({ onSectionChange, scrollToSection }: HowItWorksSectionProps) {
  return (
    <section
      id="howItWorksSection"
      className="min-w-full snap-center relative overflow-hidden pt-5"
    >
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center blur-md"
        style={{ backgroundImage: "url('/img/bg-fashion.jpeg')" }}
      ></div>

      {/* Optional Overlay for Contrast */}
      <div className="absolute inset-0 z-0 bg-black/20"></div>

      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/10 to-white/30 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-white/30 to-white/10 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 pb-12 sm:pb-16 lg:pb-20">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center bg-white/80 px-3 py-1.5 rounded-full mb-4 shadow-sm border border-gray-200">
            <Brain className="w-4 h-4 mr-2 text-yellow-300" />
            <span className="text-xs font-bold text-yellow-200 uppercase tracking-wider">
              Revolutionary Technology
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-black text-yellow-100 mb-3 leading-tight tracking-tight">
            How the Mirror Me Fashion AI Fashion Advisor Works
            <span className="block text-purple-300">Revolutionary AI technology that learns your body type and style preferences to deliver free personalized fashion advice with unprecedented accuracy.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Step 1 */}
          <Card className="group text-center hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-md hover:bg-white/90 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden rounded-2xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/50 to-yellow-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 right-4 w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">1</span>
            </div>
            <CardHeader className="pb-3 relative z-10">
              <div className="w-12 h-12 bg-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle className="text-yellow-600 text-lg font-black tracking-tight">Body Analysis</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-4 pb-6">
              <p className="text-gray-800 text-sm leading-relaxed font-medium">
                Our advanced AI analyzes your measurements and style goals through conversation with the Virtual Fashion Stylist (Sophia) to understand your fashion needs with scientific precision.
              </p>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="group text-center hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-md hover:bg-white/90 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden rounded-2xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-purple-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 right-4 w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">2</span>
            </div>
            <CardHeader className="pb-3 relative z-10">
              <div className="w-12 h-12 bg-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-purple-600 text-lg font-black tracking-tight">Style Preferences</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-4 pb-6">
              <p className="text-gray-800 text-sm leading-relaxed font-medium">
                Share your style preferences and budget with Sophia within the chat to access free and accurate fashion advice using natural conversation.
              </p>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="group text-center hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-md hover:bg-white/90 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden rounded-2xl shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-red-800/50 to-red-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 right-4 w-10 h-10 bg-red-800 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">3</span>
            </div>
            <CardHeader className="pb-3 relative z-10">
              <div className="w-12 h-12 bg-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="w-6 h-6 text-red-700" />
              </div>
              <CardTitle className="text-red-700 text-lg font-black tracking-tight">Smart Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-4 pb-6">
              <p className="text-gray-800 text-sm leading-relaxed font-medium">
                Receive curated fashion recommendations that fit and enhance your body type. Access product suggestions from fashion sellers across the globe.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Buttons */}
        <div className="text-center flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4 pb-16 sm:pb-12 lg:pb-8">
          <Button
            size="lg"
            className="w-full sm:w-56 px-6 py-3 text-base sm:text-lg font-bold rounded-full shadow-2xl transition-all duration-300 group bg-red-500 hover:bg-red-600 text-white relative overflow-hidden"
            onClick={() => {
              onSectionChange("chat")
              setTimeout(() => scrollToSection("sopiaChatSection"), 500)
            }}
          >
            I’m a Shopper
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
       <Button
  size="lg"
  className="w-full sm:w-56 px-6 py-3 
             text-base sm:text-sm md:text-xs lg:text-sm 
             font-bold rounded-full shadow-2xl 
             transition-all duration-300 group 
             bg-purple-500 hover:bg-purple-600 
             text-white relative overflow-hidden"
  onClick={() => {
    onSectionChange("professional")
    setTimeout(() => scrollToSection("professionalSection"), 500)
  }}
>
  I'm a Fashion Professional
    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
</Button>

        </div>
      </div>
    </section>
  )
}