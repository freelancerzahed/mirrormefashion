"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Camera, Palette, Target, Lightbulb } from "lucide-react"

interface MobileFeaturesSectionProps {
  onSectionChange: (section: string) => void
}

export default function MobileFeaturesSection({ onSectionChange }: MobileFeaturesSectionProps) {
  return (
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
                    Advanced AI analyzes your unique body type through intelligent conversation and visual assessment
                    with scientific precision.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-xl transform hover:-translate-y-2 hover:scale-105 active:scale-95 relative overflow-hidden rounded-3xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-pink-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm text-white">2</span>
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">Style Matching</h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">
                    Discover your personal style through AI-powered preference learning and advanced trend analysis
                    algorithms.
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
                  <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">Smart Recommendations</h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">
                    Get personalized recommendations from global retailers that fit perfectly and enhance your natural
                    beauty.
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
            onClick={() => onSectionChange("chat")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Lightbulb className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
            Try AI Stylist Now
          </Button>
        </div>
      </div>
    </section>
  )
}
