"use client"

import { Sparkles, CheckCircle, Globe, TrendingUp, Rocket } from "lucide-react"
import EnhancedChatbot from "@/components/enhanced-chatbot"

interface ChatSectionProps {
  isMobile: boolean
  handleChatbotComplete: (responses: any) => void
  handleChatbotReset: () => void
}

export default function ChatSection({
  isMobile,
  handleChatbotComplete,
  handleChatbotReset,
}: ChatSectionProps) {
  if (isMobile) {
    return (
      <section
        id="sopiaChatSection"
        className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary-50 to-white"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-25 translate-x-32 -translate-y-32 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-200 rounded-full blur-3xl opacity-25 -translate-x-32 translate-y-32 animate-pulse"></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center safe-area-inset-top py-1 px-2 pb-24">
          <div className="max-w-md w-full mx-auto">
            {/* Centered Header */}
            <div className="text-center mb-6">
              <h2 className="text-primary-600 font-semibold text-lg mb-2">
                AI-Powered Analysis
              </h2>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                ShapeMe<sup>®</sup>
              </h1>
              <h2 className="text-2xl font-bold text-primary-600 mb-2">
                Body Modeler
              </h2>
              <p className="text-gray-700 font-medium">by Mirror Me Fashion</p>
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
    )
  }

  // Desktop version
  return (
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
          {/* Left: List View */}
          <div className="space-y-6">
            {/* Centered Header */}
            <div className="text-left">
              <h2 className="text-primary-600 font-semibold text-base mb-2">
                AI-Powered Analysis
              </h2>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                ShapeMe<sup>®</sup>
              </h1>
              <h2 className="text-xl font-bold text-primary-600 mb-2">
                Body Modeler
              </h2>
              <p className="text-gray-700 font-medium">by Mirror Me Fashion</p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              {/* Beta Launch */}
              <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 shadow-sm hover:shadow-md transition">
                <TrendingUp className="w-6 h-6 text-purple-500 mr-3" />
                <p className="text-sm font-medium">
                  <span className="font-bold text-purple-600">Beta Launch:</span>{" "}
                  Welcome to Mirror Me Fashion Beta! Join today to access free
                  styling help for your unique body type
                </p>
              </div>

              {/* World’s First AI Stylist */}
              <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 shadow-sm hover:shadow-md transition">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                <p className="text-sm font-medium">
                  <span className="font-bold text-green-600">
                    World’s First AI Stylist:
                  </span>{" "}
                  Get free & instant fashion advice from the world’s first and
                  only virtual fashion stylist
                </p>
              </div>

              {/* Global Shopping */}
              <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-primary-500/10 border border-blue-200 shadow-sm hover:shadow-md transition">
                <Globe className="w-6 h-6 text-blue-500 mr-3" />
                <p className="text-sm font-medium">
                  <span className="font-bold text-blue-600">
                    Global Shopping:
                  </span>{" "}
                  Shop fashion retailers across the globe with personalized
                  recommendations
                </p>
              </div>

              {/* AI-Powered Insights */}
              <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-200 shadow-sm hover:shadow-md transition">
                <Rocket className="w-6 h-6 text-orange-500 mr-3" />
                <p className="text-sm font-medium">
                  <span className="font-bold text-orange-600">
                    AI-Powered Insights:
                  </span>{" "}
                  Grow followers & monetize your brand with AI-powered insights
                  and advanced analytics
                </p>
              </div>
            </div>
          </div>

          {/* Right: Full-height Chatbot */}
          <div className="flex justify-center h-full min-h-0">
            <div
              className="w-full max-w-2xl h-full flex flex-col min-h-0"
              style={{ maxHeight: "100vh" }}
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-2xl h-full flex flex-col min-h-0">
                <div className="p-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-center flex-shrink-0">
                  <h3 className="text-lg font-bold">Start Your Journey</h3>
                  <p className="text-sm opacity-90">
                    Let's discover your perfect style together
                  </p>
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
  )
}
