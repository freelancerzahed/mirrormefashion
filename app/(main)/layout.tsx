"use client"

import type React from "react"
import { Suspense, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Navigation from "@/components/navigation"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { CartCounter } from "@/components/cart-counter"
import GlobalSofiaAssistant from "@/components/global-sofia-assistant"
import { Toaster } from "@/components/ui/toaster"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  User,
  Bell,
  MessageCircle,
  ImageIcon,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  MessageSquare,
  Home,
  ShoppingBag,
  Heart,
  CreditCard,
  Store,
  BookOpen,
  Info,
  Mail,
  Shield,
  FileText,
  Star,
  ChevronRight,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
} from "lucide-react"
import Link from "next/link"

// Organized sidebar data with better structure
const sidebarData = {
  quickAccess: [
    { icon: Home, label: "Dashboard", href: "/dashboard", color: "text-blue-600" },
    { icon: Bell, label: "Notifications", href: "/notifications", badge: 5, color: "text-orange-600" },
    { icon: MessageCircle, label: "Messages", href: "/messages", badge: 3, color: "text-green-600" },
  ],
  mainSections: [
    {
      title: "Social & Community",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      items: [
        { icon: User, label: "My Profile", href: "/profile" },
        { icon: Users, label: "All Profiles", href: "/profiles" },
        { icon: Users, label: "Friends", href: "/friends" },
      ],
    },
    {
      title: "Shopping",
      icon: Store,
      color: "text-red-600",
      bgColor: "bg-red-50",
      items: [
        { icon: Store, label: "Shop", href: "/shop" },
        { icon: ShoppingBag, label: "Products", href: "/products" },
        { icon: Heart, label: "Wishlist", href: "/wishlist" },
        { icon: CreditCard, label: "Checkout", href: "/checkout" },
      ],
    },
    {
      title: "Personal Tools",
      icon: Sparkles,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      items: [
        { icon: ImageIcon, label: "Media", href: "/media" },
        { icon: BarChart3, label: "Body Shape", href: "/body-shape" },
        { icon: BarChart3, label: "Recommendations", href: "/recommendations" },
      ],
    },
  ],
  secondarySections: [
    {
      title: "Information",
      icon: BookOpen,
      color: "text-gray-600",
      items: [
        { icon: BookOpen, label: "Blog", href: "/blog" },
        { icon: Info, label: "About", href: "/about" },
        { icon: Mail, label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Support & Settings",
      icon: Settings,
      color: "text-gray-600",
      items: [
        { icon: Settings, label: "Settings", href: "/settings" },
        { icon: HelpCircle, label: "Help & Support", href: "/help" },
        { icon: MessageSquare, label: "Send Feedback", href: "/feedback" },
      ],
    },
  ],
  legal: [
    { icon: Shield, label: "Privacy Policy", href: "/privacy" },
    { icon: FileText, label: "Terms of Service", href: "/terms" },
  ],
}

const CartQuickAccessItem = ({
  href,
  isActive,
  sidebarCollapsed,
}: { href: string; isActive: boolean; sidebarCollapsed: boolean }) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-200 group ${
        isActive
          ? "bg-red-50 text-red-700 shadow-sm border-l-3 border-red-600"
          : "hover:bg-gray-50 hover:text-gray-900 text-gray-600"
      }`}
      title={sidebarCollapsed ? "Cart" : undefined}
    >
      <div
        className={`p-1 rounded-md flex-shrink-0 ${isActive ? "bg-red-100" : "bg-gray-100 group-hover:bg-gray-200"}`}
      >
        <CartCounter className="text-red-600" showIcon={true} />
      </div>
      {!sidebarCollapsed && (
        <div className="flex-1 flex items-center justify-between min-w-0">
          <span className="font-medium text-sm truncate">Cart</span>
        </div>
      )}
    </Link>
  )
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [showTopBar, setShowTopBar] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Set initial sidebar state based on screen size
    const checkScreenSize = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches
      const isLgScreen = window.matchMedia("(min-width: 1024px)").matches

      if (isMobile) return
      setSidebarCollapsed(!isLgScreen)
    }

    checkScreenSize()

    const mediaQueryLg = window.matchMedia("(min-width: 1024px)")
    const handleMediaChange = () => checkScreenSize()

    if (mediaQueryLg.addEventListener) {
      mediaQueryLg.addEventListener("change", handleMediaChange)
    } else {
      mediaQueryLg.addListener(handleMediaChange)
    }

    return () => {
      if (mediaQueryLg.removeEventListener) {
        mediaQueryLg.removeEventListener("change", handleMediaChange)
      } else {
        mediaQueryLg.removeListener(handleMediaChange)
      }
    }
  }, [])

  // Listen for top bar visibility changes from Navigation component
  useEffect(() => {
    const handleTopBarChange = (event: CustomEvent) => {
      setShowTopBar(event.detail.visible)
    }

    window.addEventListener("topBarVisibilityChange", handleTopBarChange as EventListener)

    return () => {
      window.removeEventListener("topBarVisibilityChange", handleTopBarChange as EventListener)
    }
  }, [])

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } else {
        if (!pathname.startsWith("/auth")) {
          router.push("/auth/login")
          return
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
      localStorage.removeItem("user")
      if (!pathname.startsWith("/auth")) {
        router.push("/auth/login")
        return
      }
    } finally {
      setLoading(false)
    }
  }, [router, pathname])

  const toggleSection = (sectionTitle: string) => {
    setExpandedSection((prev) => (prev === sectionTitle ? null : sectionTitle))
  }

  // Calculate the top offset and heights based on whether top bar is visible
  const navigationHeight = showTopBar ? "6rem" : "4rem" // 6.5rem = 2.5rem (top bar) + 4rem (main header), 4rem = main header only
  const sidebarTop = showTopBar ? "6rem" : "4rem"
  const sidebarHeight = showTopBar ? "calc(100vh - 6rem)" : "calc(100vh - 4rem)"
  const mainContentTop = showTopBar ? "6rem" : "4rem"
  const mainLeftMargin = sidebarCollapsed ? "ml-16" : "ml-72"

  // Show loading screen while checking authentication
  if (loading && !pathname.startsWith("/auth")) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // For auth pages, render without dashboard layout
  if (pathname.startsWith("/auth")) {
    return (
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen bg-gray-50">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </div>
        </WishlistProvider>
        <GlobalSofiaAssistant />
        <Toaster />
      </CartProvider>
    )
  }

  // If no user and not on auth page, don't render anything
  if (!user) {
    return null
  }

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Mobile Layout */}
          <div className="md:hidden">
            <Navigation />
            <main
              className="pb-16 transition-all duration-300 ease-in-out"
              style={{
                paddingTop: navigationHeight,
              }}
            >
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </main>
            <MobileBottomNav />
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            <Navigation />

            {/* Fixed Left Sidebar */}
            <div
              className={`${
                sidebarCollapsed ? "w-16" : "w-72"
              } fixed left-0 z-40 transition-all duration-300 ease-in-out bg-white border-r border-gray-200 shadow-sm overflow-hidden`}
              style={{
                top: sidebarTop,
                height: sidebarHeight,
              }}
            >
              <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="flex-shrink-0 p-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    {!sidebarCollapsed && (
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-red-100">
                          <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-red-100 text-red-700 text-xs font-medium">
                            {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-sm text-gray-900 truncate">
                            {user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User"}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            @{user?.username || user?.email?.split("@")[0] || "user"}
                          </p>
                        </div>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      className="h-7 w-7 flex-shrink-0 hover:bg-red-50 hover:text-red-600"
                    >
                      {sidebarCollapsed ? (
                        <PanelLeftOpen className="h-3.5 w-3.5" />
                      ) : (
                        <PanelLeftClose className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                  {/* Quick Access */}
                  <div className="px-3 mb-4">
                    {!sidebarCollapsed && (
                      <div className="flex items-center gap-1.5 mb-2">
                        <Star className="h-3 w-3 text-red-600 flex-shrink-0" />
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quick Access</h4>
                      </div>
                    )}
                    <div className="space-y-1">
                      {sidebarData.quickAccess.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-200 group ${
                              isActive
                                ? "bg-red-50 text-red-700 shadow-sm border-l-3 border-red-600"
                                : "hover:bg-gray-50 hover:text-gray-900 text-gray-600"
                            }`}
                            title={sidebarCollapsed ? item.label : undefined}
                          >
                            <div
                              className={`p-1 rounded-md flex-shrink-0 ${
                                isActive ? "bg-red-100" : "bg-gray-100 group-hover:bg-gray-200"
                              }`}
                            >
                              <item.icon className={`h-3.5 w-3.5 ${isActive ? item.color : "text-gray-600"}`} />
                            </div>
                            {!sidebarCollapsed && (
                              <div className="flex-1 flex items-center justify-between min-w-0">
                                <span className="font-medium text-sm truncate">{item.label}</span>
                                {item.badge && (
                                  <Badge className="bg-red-600 hover:bg-red-600 text-xs h-4 px-1.5 flex-shrink-0 ml-2">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </Link>
                        )
                      })}
                      <CartQuickAccessItem
                        href="/cart"
                        isActive={pathname === "/cart"}
                        sidebarCollapsed={sidebarCollapsed}
                      />
                    </div>
                  </div>

                  <Separator className="mx-3 mb-3" />

                  {/* Main Sections */}
                  <div className="px-3 space-y-3">
                    {sidebarData.mainSections.map((section) => {
                      const isExpanded = expandedSection === section.title
                      return (
                        <div key={section.title}>
                          <Collapsible open={isExpanded} onOpenChange={() => toggleSection(section.title)}>
                            <CollapsibleTrigger
                              className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors ${
                                sidebarCollapsed ? "justify-center" : ""
                              }`}
                              title={sidebarCollapsed ? section.title : undefined}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`p-1 rounded-md flex-shrink-0 ${section.bgColor}`}>
                                  <section.icon className={`h-3.5 w-3.5 ${section.color}`} />
                                </div>
                                {!sidebarCollapsed && (
                                  <span className="font-medium text-sm text-gray-700 truncate">{section.title}</span>
                                )}
                              </div>
                              {!sidebarCollapsed && (
                                <ChevronRight
                                  className={`h-3.5 w-3.5 text-gray-400 transition-transform flex-shrink-0 ${
                                    isExpanded ? "rotate-90" : ""
                                  }`}
                                />
                              )}
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-1">
                              <div className="space-y-0.5 ml-5">
                                {section.items.map((item) => {
                                  const isActive = pathname === item.href
                                  return (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                                        isActive
                                          ? "bg-red-50 text-red-700 font-medium"
                                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                      }`}
                                    >
                                      <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                      <span className="truncate">{item.label}</span>
                                    </Link>
                                  )
                                })}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      )
                    })}
                  </div>

                  <Separator className="mx-3 my-3" />

                  {/* Secondary Sections */}
                  <div className="px-3 space-y-3">
                    {sidebarData.secondarySections.map((section) => {
                      const isExpanded = expandedSection === section.title
                      return (
                        <div key={section.title}>
                          <Collapsible open={isExpanded} onOpenChange={() => toggleSection(section.title)}>
                            <CollapsibleTrigger
                              className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors ${
                                sidebarCollapsed ? "justify-center" : ""
                              }`}
                              title={sidebarCollapsed ? section.title : undefined}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="p-1 rounded-md bg-gray-100 flex-shrink-0">
                                  <section.icon className={`h-3.5 w-3.5 ${section.color}`} />
                                </div>
                                {!sidebarCollapsed && (
                                  <span className="font-medium text-sm text-gray-600 truncate">{section.title}</span>
                                )}
                              </div>
                              {!sidebarCollapsed && (
                                <ChevronRight
                                  className={`h-3.5 w-3.5 text-gray-400 transition-transform flex-shrink-0 ${
                                    isExpanded ? "rotate-90" : ""
                                  }`}
                                />
                              )}
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-1">
                              <div className="space-y-0.5 ml-5">
                                {section.items.map((item) => {
                                  const isActive = pathname === item.href
                                  return (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                                        isActive
                                          ? "bg-red-50 text-red-700 font-medium"
                                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                      }`}
                                    >
                                      <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                      <span className="truncate">{item.label}</span>
                                    </Link>
                                  )
                                })}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      )
                    })}
                  </div>

                  {/* Legal Links */}
                  {!sidebarCollapsed && (
                    <div className="px-3 mt-4">
                      <div className="space-y-0.5">
                        {sidebarData.legal.map((item) => {
                          const isActive = pathname === item.href
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                                isActive
                                  ? "bg-red-50 text-red-700"
                                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                              }`}
                            >
                              <item.icon className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{item.label}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar Footer */}
                <div className="flex-shrink-0 p-3 border-t border-gray-100">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      localStorage.removeItem("user")
                      router.push("/auth/login")
                    }}
                    className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start gap-2 px-4"}`}
                  >
                    <LogOut className="h-4 w-4" />
                    {!sidebarCollapsed && <span>Sign Out</span>}
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content with dynamic positioning */}
            <div
              className={`${mainLeftMargin} transition-all duration-300 ease-in-out`}
              style={{
                paddingTop: mainContentTop,
              }}
            >
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
  )
}
