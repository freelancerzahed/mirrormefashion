"use client"

import Image from "next/image"
import { Sparkles } from "lucide-react"
import EnhancedChatbot from "@/components/enhanced-chatbot"

interface ChatSectionProps {
  isMobile: boolean
  handleChatbotComplete: (responses: any) => void
  handleChatbotReset: () => void
}

export default function ChatSection({ isMobile, handleChatbotComplete, handleChatbotReset }: ChatSectionProps) {
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
                Our AI-powered virtual stylist guides you through an intelligent conversation to understand your unique
                body type and style preferences.
              </p>
            </div>

            {/* Native Chatbot Card */}
            <div className="p-4">
              <EnhancedChatbot onComplete={handleChatbotComplete} onReset={handleChatbotReset} isMobile={true} />
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
              Our AI-powered virtual stylist guides you through an intelligent conversation to understand your unique
              body type and style preferences.
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
                  <EnhancedChatbot onComplete={handleChatbotComplete} onReset={handleChatbotReset} isMobile={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
