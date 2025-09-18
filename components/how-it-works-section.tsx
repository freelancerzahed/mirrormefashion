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
      className="min-w-full relative overflow-hidden bg-gradient-to-br from-primary-50 to-white bg-[url('/img/bg-fashion.jpeg')] bg-cover bg-center"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-100/50 to-primary-200/30 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-primary-300/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>

        {/* Geometric Patterns */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-primary-200/20 rounded-3xl rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-primary-300/15 to-primary-400/10 rounded-2xl rotate-12 animate-bounce-slow"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 pb-6 sm:pb-16 lg:pb-20">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-primary-100 to-primary-50 px-3 py-1.5 rounded-full mb-4 shadow-sm border border-primary-200/50">
            <Brain className="w-4 h-4 mr-2 text-primary-600" />
            <span className="text-xs font-bold text-primary-700 uppercase tracking-wider">
              Revolutionary Technology
            </span>
          </div>

          {/* Title (Purple) */}
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-black text-purple-700 mb-3 leading-tight tracking-tight">
            How the Mirror Me Fashion
            <span className="block text-purple-500">AI Fashion Advisor Works</span>
          </h2>

          {/* Updated Description */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium px-2">
            Revolutionary AI technology that learns your body type and style preferences to deliver free personalized
            fashion advice with unprecedented accuracy.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
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
              <CardTitle className="text-primary-600 text-lg font-black tracking-tight">Body Analysis</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-4 pb-6">
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Our advanced AI analyzes your measurements and style goals through conversation with the Virtual Fashion
                Stylist (Sophia) to understand your fashion needs with scientific precision.
              </p>
            </CardContent>
          </Card>

          {/* Step 2 (Purple) */}
          <Card className="group text-center hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-xl hover:bg-white transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden rounded-2xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-pink-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">2</span>
            </div>
            <CardHeader className="pb-3 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-purple-600 text-lg font-black tracking-tight">Style Preferences</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-4 pb-6">
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Share your style preferences and budget with Sophia within the chat to access free and accurate fashion
                advice using natural conversation.
              </p>
            </CardContent>
          </Card>

          {/* Step 3 (Burgundy like div1) */}
          <Card className="group text-center hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-xl hover:bg-white transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden rounded-2xl shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/80 to-rose-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-rose-700 to-rose-800 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">3</span>
            </div>
            <CardHeader className="pb-3 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="w-6 h-6 text-rose-700" />
              </div>
              <CardTitle className="text-rose-700 text-lg font-black tracking-tight">Smart Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-4 pb-6">
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Receive curated fashion recommendations that fit and enhance your body type. Access product suggestions
                from fashion sellers across the globe.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Buttons */}
        <div className="text-center flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4 pb-16 sm:pb-12 lg:pb-8">
          <Button
            size="lg"
            className="w-full sm:w-56 px-6 py-3 text-base sm:text-lg font-bold rounded-full shadow-2xl transition-all duration-300 group bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white relative overflow-hidden"
            onClick={() => {
              onSectionChange("chat")
              setTimeout(() => scrollToSection("sopiaChatSection"), 500)
            }}
          >
            I'm a Shopper
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-56 px-6 py-3 text-base sm:text-lg font-bold rounded-full shadow-2xl transition-all duration-300 group bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white relative overflow-hidden"
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
