"use client"

import type React from "react"
import { Suspense, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Navigation from "@/components/navigation"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import GlobalSofiaAssistant from "@/components/global-sofia-assistant"
import { Toaster } from "@/components/ui/toaster"
import Sidebar from "@/components/main-sidebar" // <-- NEW
import { UserProvider } from '@/contexts/UserContext';
// ...your existing imports and code remain

export default function MainLayout({ children }: { children: React.ReactNode }) {
  // existing state
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [showTopBar, setShowTopBar] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // existing effects (screen size, top bar visibility, auth) stay the same

  useEffect(() => {
    const onSignOut = () => {
      router.push("/auth/login")
    }
    window.addEventListener("sidebar:signout", onSignOut)
    return () => window.removeEventListener("sidebar:signout", onSignOut)
  }, [router])

  const toggleSection = (title: string) => {
    setExpandedSection((prev) => (prev === title ? null : title))
  }

  const navigationHeight = showTopBar ? "4rem" : "4rem"
  const sidebarTop = showTopBar ? "6rem" : "4rem"
  const sidebarHeight = showTopBar ? "calc(100vh - 6rem)" : "calc(100vh - 4rem)"
  const mainContentTop = showTopBar ? "5rem" : "4rem"
  const mainLeftMargin = sidebarCollapsed ? "ml-16" : "ml-72"

  // ...loading + auth page logic unchanged

  return (

    <UserProvider>
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Mobile */}
          <div className="md:hidden">
            <Navigation />
            <main className="pb-16 transition-all duration-300 ease-in-out" style={{ paddingTop: navigationHeight }}>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </main>
            <MobileBottomNav />
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <Navigation />

            {/* Sidebar (moved into component; UI identical) */}
            <Sidebar
              user={user}
              pathname={pathname}
              sidebarCollapsed={sidebarCollapsed}
              setSidebarCollapsed={setSidebarCollapsed}
              expandedSection={expandedSection}
              toggleSection={toggleSection}
              style={{ top: sidebarTop, height: sidebarHeight }}
            />

            {/* Main Content */}
            <div className={`${mainLeftMargin} transition-all duration-300 ease-in-out`} style={{ paddingTop: mainContentTop }}>
              <div className="p-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[calc(100vh-8rem)]">
                  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WishlistProvider>
      <GlobalSofiaAssistant />
      <Toaster />
    </CartProvider>
    </UserProvider>
  )
}
