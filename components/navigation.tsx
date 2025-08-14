"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ShoppingCart,
  Menu,
  User,
  Heart,
  Bell,
  Store,
  Home,
  MessageCircle,
  Users,
  Sparkles,
  BookOpen,
  Settings,
  Star,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  ImageIcon,
  BarChart3,
  Info,
  Mail,
  HelpCircle,
  MessageSquare,
  Shield,
  FileText,
  LogIn,
  UserPlus,
  Phone,
  X,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { LogoutButton } from "@/components/logout-button"

const navigationItems = [
  { href: "/shop", label: "Shop", icon: Store },
  { href: "/products", label: "Products", icon: ShoppingBag },
  { href: "/profiles", label: "Community", icon: Users },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
]

// Same sidebar data structure as mobile header
const sidebarData = {
  quickAccess: [
    { icon: Home, label: "Dashboard", href: "/dashboard", color: "text-blue-600" },
    { icon: Bell, label: "Notifications", href: "/notifications", badge: 5, color: "text-orange-600" },
    { icon: MessageCircle, label: "Messages", href: "/messages", badge: 3, color: "text-green-600" },
    { icon: ShoppingCart, label: "Cart", href: "/cart", color: "text-red-600" },
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

export default function Navigation() {
  const pathname = usePathname()
  const { state } = useCart()
  const { wishlist } = useWishlist()

  const cartItemCount = state.itemCount
  const wishlistItemCount = wishlist.length

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(["Social & Community", "Shopping"])
  const [showTopBar, setShowTopBar] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (userData) {
        try {
          setUser(JSON.parse(userData))
          setIsAuthenticated(true)
        } catch (error) {
          console.error("Failed to parse user data from localStorage:", error)
          localStorage.removeItem("user")
          setIsAuthenticated(false)
          setUser(null)
        }
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    }
  }, [])

  // Dispatch custom event when top bar visibility changes
  useEffect(() => {
    const event = new CustomEvent("topBarVisibilityChange", {
      detail: { visible: showTopBar },
    })
    window.dispatchEvent(event)
    console.log("Navigation dispatching top bar change:", showTopBar) // Debug log
  }, [showTopBar])

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle) ? prev.filter((s) => s !== sectionTitle) : [...prev, sectionTitle],
    )
  }

  return (
    <>
      {/* Top Bar */}
      {showTopBar && (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm">
          <div className="w-full px-4 md:px-6">
            <div className="flex items-center justify-between h-10">
              {/* Left - Contact Info */}
              <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-2 md:hidden lg:flex">
                  <Phone className="h-3 w-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span>support@mirrormefashion.com</span>
                </div>
              </div>

              {/* Center - Company Name */}
              <div className="flex-1 text-center md:flex-none">
                <span className="font-bold text-lg tracking-wide">
                  MIRRORME FASHION <sup className="text-xs font-normal">BETA</sup>
                </span>
              </div>

              {/* Right - Social Media & Close */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-xs mr-2">Follow us:</span>
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-200 transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-200 transition-colors"
                    title="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-200 transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-200 transition-colors"
                    title="YouTube"
                  >
                    <Youtube className="h-4 w-4" />
                  </Link>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowTopBar(false)}
                  className="h-6 w-6 hover:bg-red-500/20 text-white"
                  title="Close top bar"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header
        className={`fixed z-40 w-full border-b border-red-100 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300 ${showTopBar ? "top-10" : "top-0"}`}
      >
        <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
          {/* Left side - Mobile Menu Toggle + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 rounded-lg hover:bg-red-50">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0 overflow-hidden">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <SheetHeader className="flex-shrink-0 p-4 border-b border-gray-100">
                    <SheetTitle className="flex items-center gap-3 text-left">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex-shrink-0">
                        <ShoppingCart className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-lg font-bold text-gray-900">Mirror</span>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Contact Info Section */}
                  <div className="flex-shrink-0 p-4 border-b border-gray-100 bg-red-50">
                    <h4 className="text-sm font-semibold text-red-700 mb-3">Contact Information</h4>
                    <div className="space-y-2 text-sm text-red-600">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        <span>support@mirrormefashion.com</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Section */}
                  <div className="flex-shrink-0 p-4 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Follow Us</h4>
                    <div className="flex items-center gap-3">
                      <Link
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Facebook"
                      >
                        <Facebook className="h-4 w-4" />
                      </Link>
                      <Link
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                        title="Twitter"
                      >
                        <Twitter className="h-4 w-4" />
                      </Link>
                      <Link
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
                        title="Instagram"
                      >
                        <Instagram className="h-4 w-4" />
                      </Link>
                      <Link
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="YouTube"
                      >
                        <Youtube className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* User Profile Section */}
                  {isAuthenticated && user && (
                    <div className="flex-shrink-0 p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-red-100">
                          <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-red-100 text-red-700 text-sm font-medium">
                            {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm text-gray-900 truncate">
                            {user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User"}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            @{user?.username || user?.email?.split("@")[0] || "user"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Content */}
                  <ScrollArea className="flex-1 overflow-y-auto">
                    <div className="p-4 space-y-6">
                      {/* Quick Access */}
                      {isAuthenticated && (
                        <>
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Star className="h-4 w-4 text-red-600 flex-shrink-0" />
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Quick Access
                              </h4>
                            </div>
                            <div className="space-y-1">
                              {sidebarData.quickAccess.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                      isActive
                                        ? "bg-red-50 text-red-700 shadow-sm border-l-4 border-red-600"
                                        : "hover:bg-gray-50 hover:text-gray-900 text-gray-600"
                                    }`}
                                  >
                                    <div
                                      className={`p-1.5 rounded-md flex-shrink-0 ${
                                        isActive ? "bg-red-100" : "bg-gray-100"
                                      }`}
                                    >
                                      <item.icon className={`h-4 w-4 ${isActive ? item.color : "text-gray-600"}`} />
                                    </div>
                                    <div className="flex-1 flex items-center justify-between min-w-0">
                                      <span className="font-medium text-sm truncate">{item.label}</span>
                                      {item.badge && (
                                        <Badge className="bg-red-600 hover:bg-red-600 text-xs h-5 px-2 flex-shrink-0 ml-2">
                                          {item.badge}
                                        </Badge>
                                      )}
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>

                          <Separator />

                          {/* Main Sections */}
                          <div className="space-y-4">
                            {sidebarData.mainSections.map((section) => {
                              const isExpanded = expandedSections.includes(section.title)
                              return (
                                <div key={section.title}>
                                  <Collapsible open={isExpanded} onOpenChange={() => toggleSection(section.title)}>
                                    <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                      <div className="flex items-center gap-3 min-w-0">
                                        <div className={`p-1.5 rounded-md flex-shrink-0 ${section.bgColor}`}>
                                          <section.icon className={`h-4 w-4 ${section.color}`} />
                                        </div>
                                        <span className="font-semibold text-sm text-gray-700 truncate">
                                          {section.title}
                                        </span>
                                      </div>
                                      <ChevronRight
                                        className={`h-4 w-4 text-gray-400 transition-transform flex-shrink-0 ${
                                          isExpanded ? "rotate-90" : ""
                                        }`}
                                      />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="mt-2">
                                      <div className="space-y-1 ml-6">
                                        {section.items.map((item) => {
                                          const isActive = pathname === item.href
                                          return (
                                            <Link
                                              key={item.href}
                                              href={item.href}
                                              onClick={() => setIsMobileMenuOpen(false)}
                                              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                                isActive
                                                  ? "bg-red-50 text-red-700 font-medium"
                                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                              }`}
                                            >
                                              <item.icon className="h-4 w-4 flex-shrink-0" />
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

                          <Separator />

                          {/* Secondary Sections */}
                          <div className="space-y-4">
                            {sidebarData.secondarySections.map((section) => {
                              const isExpanded = expandedSections.includes(section.title)
                              return (
                                <div key={section.title}>
                                  <Collapsible open={isExpanded} onOpenChange={() => toggleSection(section.title)}>
                                    <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                      <div className="flex items-center gap-3 min-w-0">
                                        <div className="p-1.5 rounded-md bg-gray-100 flex-shrink-0">
                                          <section.icon className={`h-4 w-4 ${section.color}`} />
                                        </div>
                                        <span className="font-medium text-sm text-gray-600 truncate">
                                          {section.title}
                                        </span>
                                      </div>
                                      <ChevronRight
                                        className={`h-4 w-4 text-gray-400 transition-transform flex-shrink-0 ${
                                          isExpanded ? "rotate-90" : ""
                                        }`}
                                      />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="mt-2">
                                      <div className="space-y-1 ml-6">
                                        {section.items.map((item) => {
                                          const isActive = pathname === item.href
                                          return (
                                            <Link
                                              key={item.href}
                                              href={item.href}
                                              onClick={() => setIsMobileMenuOpen(false)}
                                              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                                isActive
                                                  ? "bg-red-50 text-red-700 font-medium"
                                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                              }`}
                                            >
                                              <item.icon className="h-4 w-4 flex-shrink-0" />
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

                          <Separator />

                          {/* Legal Links */}
                          <div>
                            <div className="space-y-1">
                              {sidebarData.legal.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors ${
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
                        </>
                      )}

                      {/* Public Navigation for non-authenticated users */}
                      {!isAuthenticated && (
                        <div className="space-y-2">
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-3">
                            Navigation
                          </h3>
                          {navigationItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors ${
                                  isActive ? "bg-red-50 text-red-600 font-medium" : "text-gray-700"
                                }`}
                              >
                                {item.icon && (
                                  <div className={`p-2 rounded-lg ${isActive ? "bg-red-100" : "bg-gray-100"}`}>
                                    <item.icon className={`w-4 h-4 ${isActive ? "text-red-600" : "text-gray-600"}`} />
                                  </div>
                                )}
                                <span className="flex-1">{item.label}</span>
                              </Link>
                            )
                          })}
                        </div>
                      )}

                      {/* Shopping Actions for all users */}
                      <Separator />
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-3">Shopping</h3>
                        <Link
                          href="/wishlist"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-red-50">
                            <Heart className="h-4 w-4 text-red-600" />
                          </div>
                          <span className="flex-1 font-medium">Wishlist</span>
                          {wishlistItemCount > 0 && (
                            <Badge className="bg-red-100 text-red-600 text-xs">{wishlistItemCount}</Badge>
                          )}
                        </Link>
                        <Link
                          href="/cart"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-red-50">
                            <ShoppingCart className="h-4 w-4 text-red-600" />
                          </div>
                          <span className="flex-1 font-medium">Shopping Cart</span>
                          {cartItemCount > 0 && (
                            <Badge className="bg-red-100 text-red-600 text-xs">{cartItemCount}</Badge>
                          )}
                        </Link>
                      </div>
                    </div>
                  </ScrollArea>

                  {/* Bottom Actions */}
                  <div className="flex-shrink-0 p-4 border-t border-gray-100">
                    {isAuthenticated ? (
                      <LogoutButton className="w-full justify-start gap-3 text-sm bg-red-600 hover:bg-red-700 text-white h-10" />
                    ) : (
                      <div className="space-y-3">
                        <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                          <Link href="/auth/register">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Get Started
                          </Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full bg-transparent">
                          <Link href="/auth/login">
                            <LogIn className="h-4 w-4 mr-2" />
                            Sign In
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 text-xl font-bold group" prefetch={false}>
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg group-hover:shadow-red-200 transition-all duration-300">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent hidden sm:inline">
                Mirror
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Now with more menu items */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1 flex-1 justify-center max-w-4xl mx-8">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "bg-red-50 text-red-700 shadow-sm"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50/50"
                  }`}
                  prefetch={false}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-600 hover:bg-red-600">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            )}

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
              asChild
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-600 hover:bg-red-600">
                    {wishlistItemCount}
                  </Badge>
                )}
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
              asChild
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-600 hover:bg-red-600">
                    {cartItemCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>

            {/* User Profile/Auth */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 px-3 rounded-lg hover:bg-red-50 transition-colors">
                    <Avatar className="h-7 w-7 mr-2">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name || "User"} />
                      <AvatarFallback className="bg-red-100 text-red-700 text-sm font-medium">
                        {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm font-medium text-gray-700">
                      {user.name?.split(" ")[0] || user.email?.split("@")[0] || "User"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${user.username || user.id}`} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <LogoutButton asDropdownItem />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild className="bg-red-600 hover:bg-red-700">
                  <Link href="/auth/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
