"use client"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

interface MobileHeroSectionProps {
  onSectionChange: (section: string) => void
}

export default function MobileHeroSection({ onSectionChange }: MobileHeroSectionProps) {
  return (
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
            <p className="text-lg mb-8 font-light text-gray-200 leading-relaxed">
              Get instant, personalized fashion advice powered by advanced AI technology
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 animate-slide-up delay-200">
            <Button
              onClick={() => onSectionChange("chat")}
              size="lg"
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Styling Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              onClick={() => onSectionChange("features")}
              variant="outline"
              size="lg"
              className="w-full bg-white/10 backdrop-blur-xl border-white/30 text-white hover:bg-white/20 font-medium py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Learn How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 animate-fade-in delay-500">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-300">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>Free Beta</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                <span>Instant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
