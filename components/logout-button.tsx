"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Loader2 } from 'lucide-react'
import { toast } from "@/hooks/use-toast"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

interface LogoutButtonProps {
  className?: string
  asDropdownItem?: boolean
}

export function LogoutButton({ className, asDropdownItem = false }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)
    
    try {
      // Call logout API
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Logout failed")
      }

      // Clear user data from localStorage
      localStorage.removeItem("user")
      
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account.",
      })

      // Redirect to login page
      router.push("/auth/login")
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Logout failed",
        description: "An error occurred while signing out. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (asDropdownItem) {
    return (
      <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LogOut className="mr-2 h-4 w-4" />
        )}
        {isLoading ? "Signing out..." : "Sign out"}
      </DropdownMenuItem>
    )
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="ghost"
      className={`hover:bg-brand-primary-10 hover:text-brand-primary ${className}`}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      {isLoading ? "Signing out..." : "Sign out"}
    </Button>
  )
}
