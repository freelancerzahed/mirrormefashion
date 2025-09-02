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
            Revolutionary AI technology that understands your body, style preferences, and lifestyle to deliver
            personalized fashion recommendations with unprecedented accuracy.
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
              <CardTitle className="text-primary-600 text-lg font-black tracking-tight">Body Analysis</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-4 pb-6">
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Our advanced AI analyzes your measurements and proportions through an intelligent conversation,
                understanding your unique body type with scientific precision.
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
              <CardTitle className="text-purple-600 text-lg font-black tracking-tight">Style Preferences</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-4 pb-6">
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Share your lifestyle, color preferences, and fashion goals. Our AI learns your unique style through
                natural conversation and behavioral analysis.
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
              <CardTitle className="text-green-600 text-lg font-black tracking-tight">Smart Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 px-4 pb-6">
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Receive curated fashion recommendations that fit perfectly and enhance your natural beauty with AI
                precision and real-time trend analysis.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="px-8 py-3 text-lg font-bold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 group bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white relative overflow-hidden"
            onClick={() => {
              onSectionChange("chat")
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
  )
}
