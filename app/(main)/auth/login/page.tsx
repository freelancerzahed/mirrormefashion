"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Store, Mail, Lock, User, Shield } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Store user data
      localStorage.setItem("user", JSON.stringify(data.user))

      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user.name}!`,
      })

      // Redirect based on role
      if (data.user.role === "admin" || data.user.role === "manager") {
        router.push("/admin/dashboard")
      } else if (data.user.role === "advertiser") {
        router.push("/advertiser/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error: any) {
      setError(error.message)
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      })

      // Clear form fields on invalid credentials
      if (error.message.includes("Invalid email or password")) {
        setPassword("")
        // Focus back to email field for retry
        setTimeout(() => {
          const emailInput = document.getElementById("email")
          emailInput?.focus()
        }, 100)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const demoAccounts = [
    {
      email: "admin@fashion.com",
      password: "password",
      role: "Admin",
      description: "Full access to admin panel",
      icon: Shield,
      color: "text-red-600 bg-red-50",
    },
    {
      email: "manager@fashion.com",
      password: "password",
      role: "Manager",
      description: "Store management access",
      icon: User,
      color: "text-blue-600 bg-blue-50",
    },
    {
      email: "advertiser@fashion.com",
      password: "password",
      role: "Advertiser",
      description: "Campaign & ads management",
      icon: Store,
      color: "text-purple-600 bg-purple-50",
    },
    {
      email: "user@fashion.com",
      password: "password",
      role: "Customer",
      description: "Customer portal access",
      icon: User,
      color: "text-green-600 bg-green-50",
    },
  ]

  const fillDemoCredentials = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Fashion Retailer Portal</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Link href="/auth/register" className="text-sm text-blue-600 hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-center">Demo Accounts</CardTitle>
            <CardDescription className="text-center">Click to auto-fill credentials for testing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => fillDemoCredentials(account.email, account.password)}
                className="w-full p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${account.color}`}>
                    <account.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{account.role}</h3>
                      <span className="text-xs text-gray-500 font-mono">{account.email}</span>
                    </div>
                    <p className="text-sm text-gray-600">{account.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 Fashion Retailer Portal. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
