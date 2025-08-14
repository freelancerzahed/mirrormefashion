"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star, Users, TrendingUp } from "lucide-react"

interface MobileBetaSectionProps {
  onSectionChange: (section: string) => void
}

export default function MobileBetaSection({ onSectionChange }: MobileBetaSectionProps) {
  return (
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
                  Get <span className="font-bold text-yellow-300">Free & Instant</span> fashion advice from the World's{" "}
                  <span className="font-bold text-yellow-300">First AI Stylist</span>
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
              <div className="flex items-start">
                <Star className="text-yellow-400 mr-3 w-4 h-4 flex-shrink-0 mt-1" />
                <p className="text-sm text-left">
                  <span className="font-bold text-yellow-300">Personalized recommendations</span> based on your body
                  type, style preferences, and budget
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
              <div className="flex items-start">
                <Users className="text-blue-400 mr-3 w-4 h-4 flex-shrink-0 mt-1" />
                <p className="text-sm text-left">
                  Join <span className="font-bold text-yellow-300">10,000+ beta users</span> already transforming their
                  style
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 text-center">
              <div className="text-lg font-bold text-yellow-300">10K+</div>
              <div className="text-xs text-gray-300">Beta Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 text-center">
              <div className="text-lg font-bold text-green-300">4.9★</div>
              <div className="text-xs text-gray-300">Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 text-center">
              <div className="text-lg font-bold text-blue-300">24/7</div>
              <div className="text-xs text-gray-300">Available</div>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={() => onSectionChange("chat")}
            size="lg"
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Join Beta Now - It's Free!
          </Button>
        </div>
      </div>
    </section>
  )
}
