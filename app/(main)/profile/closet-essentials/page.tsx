"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shirt, Search, Star, Bell } from "lucide-react"

export default function ClosetEssentialsPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">Closet Essentials</h1>
        <p className="text-gray-600">Organize and manage your wardrobe essentials</p>
      </div>

      <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 p-4 bg-primary-100 rounded-full w-fit">
            <Shirt className="h-12 w-12 text-primary-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">Coming Soon</CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-md mx-auto">
            We're building an amazing closet management system to help you organize your wardrobe
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center space-y-8">
          {/* Feature Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-primary-100 rounded-full">
                <Search className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-medium text-gray-900">Smart Search</h3>
              <p className="text-sm text-gray-600 text-center">Find items by color, brand, or occasion</p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-primary-100 rounded-full">
                <Shirt className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-medium text-gray-900">Digital Wardrobe</h3>
              <p className="text-sm text-gray-600 text-center">Catalog all your clothing items</p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-primary-100 rounded-full">
                <Star className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-medium text-gray-900">Style Analytics</h3>
              <p className="text-sm text-gray-600 text-center">Track your most worn pieces</p>
            </div>
          </div>

          {/* Notification Signup */}
          <div className="max-w-md mx-auto space-y-4">
            <p className="text-gray-700 font-medium">Get notified when it's ready</p>
              <Button className="bg-primary-600 hover:bg-primary-700 text-white">
            <Bell className="h-4 w-4 mr-2" />
            Notify Me When Ready
          </Button>
            <p className="text-xs text-gray-500">We'll send you an email when Closet Essentials is available</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
